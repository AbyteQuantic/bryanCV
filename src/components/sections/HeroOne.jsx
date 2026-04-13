import { useState, useEffect } from 'react';
import { useSafeTranslation } from './../../../TranslationWrapper';

const TypeWriter = ({ text, speed = 90, delay = 800, holdTime = 15000, eraseSpeed = 40 }) => {
    const [displayed, setDisplayed] = useState('');
    const [cursorVisible, setCursorVisible] = useState(true);
    const [phase, setPhase] = useState('waiting'); // waiting | typing | holding | erasing

    // Phase: waiting -> typing
    useEffect(() => {
        if (phase !== 'waiting') return;
        const timer = setTimeout(() => setPhase('typing'), delay);
        return () => clearTimeout(timer);
    }, [phase, delay]);

    // Phase: typing (add letters)
    useEffect(() => {
        if (phase !== 'typing' || !text) return;
        if (displayed.length >= text.length) {
            setPhase('holding');
            return;
        }
        const timer = setTimeout(() => {
            setDisplayed(text.slice(0, displayed.length + 1));
        }, speed);
        return () => clearTimeout(timer);
    }, [phase, displayed, text, speed]);

    // Phase: holding (stay visible)
    useEffect(() => {
        if (phase !== 'holding') return;
        const timer = setTimeout(() => setPhase('erasing'), holdTime);
        return () => clearTimeout(timer);
    }, [phase, holdTime]);

    // Phase: erasing (remove letters)
    useEffect(() => {
        if (phase !== 'erasing') return;
        if (displayed.length === 0) {
            setPhase('waiting');
            return;
        }
        const timer = setTimeout(() => {
            setDisplayed(displayed.slice(0, -1));
        }, eraseSpeed);
        return () => clearTimeout(timer);
    }, [phase, displayed, eraseSpeed]);

    // Cursor blink
    useEffect(() => {
        const blink = setInterval(() => {
            setCursorVisible(v => !v);
        }, 530);
        return () => clearInterval(blink);
    }, []);

    return (
        <span>
            {displayed}
            <span style={{
                display: 'inline-block',
                width: '3px',
                height: '0.85em',
                backgroundColor: 'currentColor',
                marginLeft: '4px',
                verticalAlign: 'baseline',
                opacity: cursorVisible ? 1 : 0,
            }} />
        </span>
    );
};

const HeroOne = () => {
    const { t, isReady } = useSafeTranslation();
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    return (
        <>
            {/* banner */}
            <section className="mil-side-banner mil-center">
                <div className="mil-banner-top mil-up"></div>
                <div className="mil-banner-title">
                    <div className="mil-upper mil-dark mil-up mil-mb-30">{isReady ? t('HeroOneSection.FirstGreeting') : ''}</div>
                    <h1 className="mil-up mil-mb-30" style={{minHeight: '1.2em'}}>
                        {mounted ? <TypeWriter text="Brayan Murcia" speed={90} delay={800} /> : <span style={{opacity: 0}}>Brayan Murcia</span>}
                    </h1>
                    <p className="mil-upper mil-dark mil-up">{isReady ? t('HeroOneSection.CarreerDescription') : ''}</p>
                </div>
                <div className="mil-up mil-oval-frame">
                    <div className="mil-circle-text">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 300 300" enableBackground="new 0 0 300 300" xmlSpace="preserve" className="mil-ct-svg mil-rotate" data-value="360">
                            <defs>
                                <path id="circlePath" d="M 150, 150 m -60, 0 a 60,60 0 0,1 120,0 a 60,60 0 0,1 -120,0 " />
                            </defs>
                            <circle cx="150" cy="100" r="75" fill="none" />
                            <g>
                                <use xlinkHref="#circlePath" fill="none" />
                                <text style={{"letterSpacing": "6.5px"}}>
                                    <textPath xlinkHref="#circlePath">{isReady ? t('HeroOneSection.ScrollDown') : ''}</textPath>
                                </text>
                            </g>
                        </svg>
                        <a href="#about" className="mil-button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-down">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <polyline points="19 12 12 19 5 12"></polyline>
                            </svg>
                        </a>
                    </div>
                </div>
            </section>
            {/* banner end */}
        </>
    );
}
export default HeroOne;

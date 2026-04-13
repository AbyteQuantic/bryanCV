import { useState, useEffect } from 'react';

const allIcons = [
    '/img/degrees/docker.png',
    '/img/degrees/react.png',
    '/img/degrees/node.png',
    '/img/degrees/js.png',
    '/img/degrees/piezas-landing-fundamentos-python.png',
    '/img/degrees/AI_fundamental.png',
    '/img/degrees/linux_server.png',
    '/img/degrees/mongo.png',
    '/img/degrees/mysql.png',
    '/img/degrees/data_ingineering.png',
];

function getRandomIcons() {
    const shuffled = [...allIcons].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
}

const RightPanelModule = ( { background, img } ) => {
    const [icons, setIcons] = useState([allIcons[0], allIcons[1], allIcons[2]]);

    useEffect(() => {
        setIcons(getRandomIcons());
    }, []);

    return (
        <>
        <div className="mil-right-banner" id="scene">
            <div className="mil-progress-track">
                <div className="mil-progress" />
            </div>
            <div className="mil-banner-wrapper" data-depth="1">
                <div id="swupBg" className="mil-banner-frame">
                    <img src={background} alt="background" className={img ? "mil-banner-bg mil-blur" : "mil-banner-bg"} />
                </div>
            </div>
            <div className="mil-banner-wrapper" data-depth="0.2">
                {img != undefined &&
                <div id="swupPerson" className="mil-banner-frame">
                    <img src={img} alt="person" className="mil-banner-person" />
                </div>
                }
            </div>
            <div className="mil-flying-skills" data-depth="0.1">
                {img != undefined &&
                <div id="swupSkills" className="mil-skills-frame">
                    <div className="mil-item" style={{"top": "30%", "left": "10%"}}>
                        <img src={icons[0]} alt="skill" />
                    </div>
                    <div className="mil-item" style={{"bottom": "15%", "left": "20%"}}>
                        <img src={icons[1]} alt="skill" />
                    </div>
                    <div className="mil-item" style={{"bottom": "45%", "right": "15%"}}>
                        <img src={icons[2]} alt="skill" />
                    </div>

                    <div className="mil-el mil-addition-el-1">+</div>
                    <div className="mil-el mil-addition-el-2">+</div>
                    <div className="mil-el mil-addition-el-3" />
                    <div className="mil-el mil-addition-el-4" />
                </div>
                }
            </div>
        </div>
        </>
    );
};
export default RightPanelModule;

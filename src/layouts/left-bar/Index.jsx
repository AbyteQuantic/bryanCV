import appData from "@data/app.json";
import { useLocale } from "@library/useLocale";

const LeftPanelModule = () => {
    const locale = useLocale();
    const isEs = locale === 'es';

    return (
        <>
        {/* left bar */}
        <div className="mil-left-panel">

            <div className="mil-page-name mil-upper mil-dark">{isEs ? 'Inicio' : 'Homepage'}</div>

            <ul className="mil-social-icons">
                {appData.social.map((item, key) => (
                <li key={`lp-social-item-${key}`}><a href={item.link} target="_blank" className="social-icon"><i className={item.icon} /></a></li>
                ))}
            </ul>

        </div>
        {/* left bar end */}
        </>
    );
};
export default LeftPanelModule;

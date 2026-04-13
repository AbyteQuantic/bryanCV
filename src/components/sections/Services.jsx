import Data from "@data/sections/services.json";
import Link from "next/link";
import { useSafeTranslation } from './../../../TranslationWrapper';

const ServicesSection = () => {
    const { t } = useSafeTranslation();
    const TranslatedItems = Data.items.map((item, key) => ({
        ...item,
        title: t(`ServicesSection.Title${key}`),
        text: t(`ServicesSection.text${key}`)
    }));

    return (
        <>
            <div className="mil-section-title mil-up">
                <div className="mil-divider"></div>
                <h3>{t('ServicesSection.title')}</h3>
            </div>

            {/* services */}
            <section className="mil-p-90-30">
                <div className="row justify-content-center">
                    {TranslatedItems.map((item, key) => (
                        <div key={`services-item-${key}`} className="col-lg-6 col-xl-4">
                            <div className="mil-icon-box mil-mb-60" style={{textAlign: 'left', padding: '0 12px'}}>
                                <div className="mil-service-icon mil-up" style={{textAlign: 'center'}}>
                                    <img src={item.icon} alt={item.title} className="mil-mb-30" />
                                </div>
                                <h5 className="mil-up mil-mb-20" style={{textAlign: 'center'}}>{item.title}</h5>
                                <p className="mil-up mil-mb-30" style={{lineHeight: '1.7'}}>{item.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            {/* services end */}
        </>
    );
};

export default ServicesSection;

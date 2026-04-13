import Data from "@data/sections/skills-2.json";
import { useSafeTranslation } from './../../../TranslationWrapper';
import { useLocale } from "@library/useLocale";

const SkillsTwo = () => {
    const { t } = useSafeTranslation();
    const locale = useLocale();
    const isEs = locale === 'es';

  return (
    <>
        <div className="mil-section-title mil-up">
            <div className="mil-divider" />
            <h3>{t('TestingLeadershipSkill.title')}</h3>
        </div>

        {/* hard skills */}
        <section className="mil-p-90-60">
            <div className="row justify-content-between align-items-center">
                {Data.items.map((item, key) => (
                <div className="col-lg-6" key={`skills2-item-${key}`}>
                    <div className="mil-lang-skills-item mil-mb-30">
                        <h6 className="mil-up mil-mb-30">{isEs && item.labelEs ? item.labelEs : item.label}</h6>
                        <div className="mil-line-progress mil-up">
                            <div className="mil-bar" data-value={`${item.value}%`} />
                        </div>
                    </div>
                </div>
                ))}
            </div>

        </section>
        {/* hard skills end */}
    </>
  );
};

export default SkillsTwo;

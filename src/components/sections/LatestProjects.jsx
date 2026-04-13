import Link from "next/link";
import { useLocale } from "@library/useLocale";

const LatestProjectsSection = ({ projects }) => {
    const locale = useLocale();
    const isEs = locale === 'es';

    return (
        <>
            <div className="mil-section-title mil-up">
                <div className="mil-divider" />
                <h3>{isEs ? 'Proyectos Destacados' : 'Featured Projects'}</h3>
            </div>

            {/* projects */}
            <section className="mil-p-90-30">
                <div className="row justify-content-between align-items-center">
                    {projects.slice(0, 4).map((item, key) => {
                        const isExternal = !!item.externalUrl;
                        const href = isExternal ? item.externalUrl : `/projects/${item.id}`;
                        const title = (!isEs && item.titleEn) ? item.titleEn : item.title;
                        const short = (!isEs && item.shortEn) ? item.shortEn : item.short;

                        const cardContent = (
                            <>
                                <div className="mil-cover mil-up">
                                    <img src={item.image} alt={title} />
                                    <div className="mil-link mil-icon-link">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-right">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </div>
                                </div>
                                <div className="mil-descr">
                                    <div className="mil-upper mil-accent mil-up mil-mb-15">{item.category}</div>
                                    <h4 className="mil-up mil-mb-15">{title}</h4>
                                    <p className="mil-up" style={{lineHeight: '1.6'}}>{short}</p>
                                </div>
                            </>
                        );

                        return (
                            <div className="col-lg-6" key={`project-preview-${key}`}>
                                {isExternal ? (
                                    <a href={href} target="_blank" rel="noopener noreferrer" className="mil-blog-card mil-mb-60">
                                        {cardContent}
                                    </a>
                                ) : (
                                    <Link href={href} className="mil-blog-card mil-mb-60">
                                        {cardContent}
                                    </Link>
                                )}
                            </div>
                        );
                    })}
                </div>
            </section>
            {/* projects end */}
        </>
    );
};

export default LatestProjectsSection;

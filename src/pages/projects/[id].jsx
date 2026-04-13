import Layouts from "@layouts/Layouts";
import Link from "next/link";
import { getAllProjectsIds, getProjectData, getRelatedProjects } from "@library/projects";
import { useLocale } from "@library/useLocale";
import RelatedProjectsSection from "@components/sections/RelatedProjects";

const ProjectDetail = ( props ) => {
  const locale = useLocale();
  const isEs = locale === 'es';
  const d = props.data;

  // Helper: pick translated field
  const pick = (obj, field) => {
    if (!isEs && obj[field + 'En']) return obj[field + 'En'];
    return obj[field];
  };

  const title = pick(d, 'title');
  const descContent = d.description?.enabled == 1 ? pick(d.description, 'content') : null;
  const desc2Heading = d.description2?.enabled == 1 ? pick(d.description2, 'heading') : null;
  const desc2Content = d.description2?.enabled == 1 ? pick(d.description2, 'content') : null;

  return (
    <Layouts
      fullWidth={d.fullWidth}
      rightPanelBackground={"/img/person/bg-1.jpg"}
      rightPanelImg={"/img/person/1.png"}
    >

      {/* banner */}
      <section className="mil-banner-sm mil-center">
          <div className="mil-banner-top mil-up" />
          <div className="mil-banner-title">
              <ul className="mil-puplication-details mil-up mil-mb-60">
                  {d.details.map((item, key) => (
                  <li key={`project-details-item-${key}`}>
                    {item.label != "$category" &&
                    <>
                      <span className="mil-upper mil-dark">{pick(item, 'label')} </span>
                      &nbsp;&nbsp;
                      <span className="mil-upper">{pick(item, 'value')}</span>
                    </>
                    }
                    {item.label == "$category" &&
                    <>
                      <span className="mil-upper mil-accent">{d.category}</span>
                    </>
                    }
                  </li>
                  ))}
              </ul>
              <h1 className="mil-h1-sm mil-up mil-mb-60">{title}</h1>
              <ul className="mil-breadcrumbs mil-up">
                  <li><Link href="/">{isEs ? 'Inicio' : 'Home'}</Link></li>
                  <li><Link href="/projects">{isEs ? 'Proyectos' : 'Projects'}</Link></li>
                  <li>{isEs ? 'Proyecto' : 'Project'}</li>
              </ul>
          </div>
      </section>
      {/* banner end */}

      {/* project */}
      <section className="mil-p-0-30">

          <div className="row justify-content-center">
              {descContent &&
              <div className="col-lg-10">
                <div className="mil-text-xl mil-dark mil-up mil-mb-90" style={{textAlign: 'justify', lineHeight: '1.8'}} dangerouslySetInnerHTML={{__html : descContent}} />
              </div>
              }

              {desc2Heading &&
              <>
                <div className="col-lg-10">
                    <h3 className="mil-up mil-mb-30">{desc2Heading}</h3>
                    <div className="mil-up mil-mb-30" style={{textAlign: 'justify', lineHeight: '1.8'}} dangerouslySetInnerHTML={{__html : desc2Content}} />

                    {d.description2.button != undefined &&
                    <a href={d.description2.button.link} target={d.description2.button.target} className="mil-link mil-up mil-mb-60">
                        <span>{pick(d.description2.button, 'label')}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-right">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                        </svg>
                    </a>
                    }

                    {d.description2.buttons != undefined &&
                    <div className="mil-up mil-mb-60" style={{display: 'flex', gap: '30px', flexWrap: 'wrap'}}>
                        {d.description2.buttons.map((btn, idx) => (
                        <a key={`btn-${idx}`} href={btn.link} target={btn.target} className="mil-link">
                            <span>{pick(btn, 'label')}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-right">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </a>
                        ))}
                    </div>
                    }
                </div>
              </>
              }
          </div>

      </section>
      {/* project end */}

      <RelatedProjectsSection items={props.related} />

    </Layouts>
  );
};
export default ProjectDetail;

export async function getStaticPaths({ locales }) {
    const ids = getAllProjectsIds()
    const paths = []
    for (const locale of locales) {
      for (const entry of ids) {
        paths.push({ params: entry.params, locale })
      }
    }

    return {
      paths,
      fallback: false
    }
}

export async function getStaticProps({ params }) {
    const postData = await getProjectData(params.id)
    const relatedPosts = await getRelatedProjects(params.id)

    return {
      props: {
        data: postData,
        related: relatedPosts
      }
    }
}

import Layouts from "@layouts/Layouts";
import PageBanner from "@components/PageBanner";
import CallToActionSection from "@components/sections/CallToAction";
import { useLocale } from "@library/useLocale";
import { education, experience } from "@data/career";

const TimelineItem = ({ item }) => (
  <li className="mil-up">
    <div className="mil-item-head mil-mb-5">
      <h4>{item.title}</h4>
      <div className="mil-text-sm">{item.period}</div>
    </div>
    <p className="mil-text-sm mil-mb-15">{item.role}</p>
    <p>{item.desc}</p>
    {item.projects && item.projects.length > 0 && (
      <div style={s.projects}>
        <p style={s.projectsLabel}>
          {'▸'} Key Projects:
        </p>
        {item.projects.map((proj, idx) => (
          <div key={idx} style={s.projectChip}>
            <span style={s.projectName}>{proj.name}</span>
            <span style={s.projectDetail}> — {proj.detail}</span>
          </div>
        ))}
      </div>
    )}
  </li>
);

const Story = () => {
  const locale = useLocale();
  const isEs = locale === 'es';
  const edu = isEs ? education.es : education.en;
  const exp = isEs ? experience.es : experience.en;

  return (
    <Layouts
      rightPanelBackground={"/img/person/bg-1.jpg"}
      rightPanelImg={"/img/person/1.png"}
    >
      <PageBanner pageTitle={isEs ? "Mi Trayectoria" : "My Story"} />

      <section>
        <div className="row">
          {/* Education */}
          <div className="col-xl-6">
            <div className="mil-section-title mil-up mil-left mil-mb-90">
              <div className="mil-divider" />
              <h3>{isEs ? 'Educación:' : 'Education:'}</h3>
            </div>
            <div className="mil-timeline mil-mb-90">
              <div className="mil-timeline-track" />
              <ul>
                {edu.map((item, i) => (
                  <TimelineItem key={i} item={item} />
                ))}
              </ul>
            </div>
          </div>

          {/* Experience */}
          <div className="col-xl-6">
            <div className="mil-section-title mil-up mil-left mil-mb-90">
              <div className="mil-divider" />
              <h3>{isEs ? 'Experiencia:' : 'Experience:'}</h3>
            </div>
            <div className="mil-timeline mil-mb-90">
              <div className="mil-timeline-track" />
              <ul>
                {exp.map((item, i) => (
                  <TimelineItem key={i} item={item} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CallToActionSection />
    </Layouts>
  );
};

const s = {
  projects: {
    marginTop: '12px',
    paddingTop: '10px',
    borderTop: '1px solid #eee',
  },
  projectsLabel: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#4CAF50',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    margin: '0 0 8px',
  },
  projectChip: {
    fontSize: '13px',
    lineHeight: 1.5,
    marginBottom: '4px',
    color: '#555',
  },
  projectName: {
    fontWeight: 600,
    color: '#202124',
  },
  projectDetail: {
    fontWeight: 400,
  },
};

export default Story;

export async function getStaticProps() {
  return { props: {} };
}

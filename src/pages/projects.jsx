import Layouts from "@layouts/Layouts";
import PageBanner from "@components/PageBanner";
import ProjectsGrid from "@components/ProjectsGrid";
import CallToActionSection from "@components/sections/CallToAction";
import { getSortedProjectsData } from "@library/projects";
import { useLocale } from "@library/useLocale";

const Projects = (props) => {
  const locale = useLocale();
  const isEs = locale === 'es';

  return (
    <Layouts
      rightPanelBackground={"/img/person/bg-1.jpg"}
      rightPanelImg={"/img/person/1.png"}
    >
      <PageBanner pageTitle={isEs ? "Proyectos <br>Destacados" : "Featured <br>Projects"} breadTitle={isEs ? "Portafolio" : "Portfolio"} align={"center"} />

      <ProjectsGrid projects={props.projects} columns={1} />

      <CallToActionSection />

    </Layouts>
  );
};
export default Projects;

export async function getStaticProps() {
  const allProjects = getSortedProjectsData();

  return {
    props: {
      projects: allProjects
    }
  }
}

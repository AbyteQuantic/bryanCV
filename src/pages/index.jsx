import React from "react";
import Layouts from "@layouts/Layouts";
import dynamic from "next/dynamic";

import { getSortedProjectsData } from "@library/projects";

import HeroOneSection from "@components/sections/HeroOne"
import AboutSection from "@components/sections/About";
import ServicesSection from "@components/sections/Services";
import SeniorSkillsGrid from "@components/sections/SeniorSkillsGrid";
import ImpactBentoGrid from "@components/sections/ImpactBentoGrid";
import DownloadCVButton from "@components/sections/DownloadCVButton";
import LatestProjectsSection from "@components/sections/LatestProjects";
import CallToActionSection from "@components/sections/CallToAction";

const TestimonialSlider = dynamic( () => import("@components/sliders/Testimonial"), { ssr: false } );
const GitHubHeatmap = dynamic( () => import("@components/sections/GitHubHeatmap"), { ssr: false } );

const Home1 = (props) => {
  return (
    <Layouts
      rightPanelBackground={"/img/person/bg-1.jpg"}
      rightPanelImg={"/img/person/1.png"}
    >
      <HeroOneSection />
      <AboutSection />
      <ServicesSection />
      <SeniorSkillsGrid />
      <GitHubHeatmap />
      <ImpactBentoGrid />
      <DownloadCVButton />
      <TestimonialSlider />
      <LatestProjectsSection projects={props.projects} />
      <CallToActionSection />
    </Layouts>
  );
};
export default Home1;

export async function getStaticProps() {
  const allProjects = getSortedProjectsData();

  return {
    props: {
      projects: allProjects
    }
  }
}

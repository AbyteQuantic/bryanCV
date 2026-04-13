import { useEffect, useMemo } from "react";
import { scrollAnimation } from "../common/scrollAnims";
import { preloaderAnimation } from "../common/preloader";
import { countersAnimation } from "../common/counters";
import { parallaxAnimation } from "../common/parallax";
import { anchorSscroll } from "../common/utilits";
import Footer from "./footers/Index";
import Header from "./headers/Index";
import Preloader from "./preloader/Index";
import LeftPanel from "./left-bar/Index";
import RightPanel from "./right-bar/Index";
import BackToTop from "./back-to-top/Index";
import dynamic from "next/dynamic";

const FloatingAIChat = dynamic(() => import("@components/FloatingAIChat"), { ssr: false });

const Layouts = ({
  children,
  header,
  footer,
  noHeader,
  noFooter,
  fullWidth,
  rightPanelBackground,
  rightPanelImg,
  fullWidth100,
  extraClass,
}) => {
  // Memoizar los cálculos (solo cambian cuando cambian las props)
  const { bodyClass, containerClass } = useMemo(() => {
    let bodyClass = false;
    let containerClass = false;

    if (fullWidth && fullWidth100) {
      bodyClass = ['mil-fw-page', 'mil-100-page'];
      containerClass = 'mil-container-100';
    } else if (fullWidth) {
      bodyClass = 'mil-fw-page';
      containerClass = 'mil-container-fw';
    } else {
      bodyClass = false;
      containerClass = false;
    }

    return { bodyClass, containerClass };
  }, [fullWidth, fullWidth100]); // Solo recalcular cuando cambien estas props

  // EFECTO 1: Inicializaciones
  useEffect(() => {
    //preloaderAnimation();
    scrollAnimation();
    countersAnimation();
    parallaxAnimation();
    anchorSscroll();
  }, []);

  // EFECTO 2: Clases del body
  useEffect(() => {
    // Limpiar clases anteriores
    document.body.classList.remove('mil-fw-page', 'mil-100-page');
    
    // Aplicar nuevas clases
    if (document !== undefined && bodyClass) {
      if (Array.isArray(bodyClass)) {
        document.body.classList.add(...bodyClass);
      } else {
        document.body.classList.add(bodyClass);
      }
    }
    
    return () => {
      document.body.classList.remove('mil-fw-page', 'mil-100-page');
    };
  }, [bodyClass]); // ✅ bodyClass es estable gracias a useMemo

  return (
    <div className="mil-wrapper" id="top">
      {/* <Preloader /> */}
      
      <div className="mil-frame">
        {!noHeader && (
          <Header
            layout={1}
            extraclassName={extraClass}
          />
        )}
        
        <LeftPanel />
        <BackToTop />
      </div>

      <div className="mil-content">
        <div className="mil-scroll-wrapper transition-fade" id="swupMain">
          <div className={containerClass ? containerClass : "mil-container"}>
            {children}
            
            {!noFooter && <Footer layout={footer} />}
          </div>
        </div>
        
        {!fullWidth &&
          <RightPanel background={rightPanelBackground} img={rightPanelImg} />
        }
      </div>
      <FloatingAIChat />
    </div>
  );
};

export default Layouts;

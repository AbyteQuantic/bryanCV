import Link from "next/link";
import { useState, useEffect } from "react";
import appData from "@data/app.json";
import { useRouter } from 'next/router';
import LanguageSwitcher from "@components/LanguageSwitcher";
import { useSafeTranslation } from './../../../TranslationWrapper';

const DefaultHeader = ({ extraClass }) => {
  const { t } = useSafeTranslation();
  const [toggle, setToggle] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const { asPath, locale } = useRouter();
  const currentLocale = mounted ? locale : 'en';

  const navItems = appData.header.menu.map((item) => {
    let s_class1 = 'mil-has-children';
    if ((asPath.indexOf(item.link) !== -1 && item.link !== '/') || asPath === item.link) {
      s_class1 += ' mil-active';
    }

    return {
      ...item,
      label: t(item.label),
      children: Array.isArray(item.children) ? item.children.map(child => ({
        ...child,
        label: t(child.label)
      })) : [],
      classes: s_class1
    };
  });

  return (
    <>
      <div className="mil-top-panel">
        <Link href={appData.header.logo.link} className="mil-logo">
          <LanguageSwitcher />
        </Link>

        <div className={`mil-navigation ${toggle ? "mil-active" : ""}`}>
            <nav id="swupMenu" className="mil-menu-transition">
                <ul>
                    {navItems.map((item, key) => (
                    <li className={item.classes} key={`header-menu-item-${key}`}>
                        <Link href={item.link}>{item.label}</Link>
                        {item.children.length > 0 &&
                        <ul>
                            {item.children.map((subitem, key2) => (
                            <li key={`header-submenu${key}-item-${key2}`}>
                                <Link href={subitem.link}>{subitem.label}</Link>
                            </li>
                            ))}
                        </ul>
                        }
                    </li>
                    ))}
                </ul>
            </nav>
        </div>

        <div className="mil-top-panel-btns">
            <button
              onClick={() => {
                import('@library/generateCV').then(({ generateCV }) => generateCV(currentLocale || 'en'));
              }}
              className="mil-cv-download"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                <span className="mil-cv-text">{currentLocale === 'es' ? 'Descargar CV' : 'Download CV'}</span>
            </button>

            <div className={`mil-menu-btn ${toggle ? "mil-active" : ""}`} onClick={() => setToggle(!toggle)}>
                <span />
            </div>
        </div>
      </div>
    </>
  );
};

export default DefaultHeader;

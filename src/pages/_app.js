import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import appData from "@data/app.json";
import i18n from '../../i18n';
import { useTracking } from "@library/useTracking";

import '../styles/scss/style-dark.scss';
import '../styles/scss/style-light.scss';
import 'react-github-calendar/tooltips.css';
import '../styles/contact.css';

import { register } from "swiper/element/bundle";
register();

function MyApp({ Component, pageProps }) {
  const { locale, pathname } = useRouter();
  const isAdmin = pathname.startsWith('/admin');
  const tracking = useTracking();

  useEffect(() => {
    if (locale && i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale]);

  return (
    <>
      <Head>
          <title>{appData.settings.siteName}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} tracking={isAdmin ? null : tracking} />
    </>
  );
}

export default MyApp;

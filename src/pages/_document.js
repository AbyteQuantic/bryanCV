import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* meta begin */}
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
          {/* meta end */}

          {/* public assets begin */}
          <link rel="stylesheet" href="/css/plugins/bootstrap-grid.css" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.0/css/all.min.css" />
          <link rel="stylesheet" href="/css/plugins/swiper.min.css" />  
          {/* public assets end */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

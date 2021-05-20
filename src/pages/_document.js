import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

import theme from 'theme'
import { ServerStyleSheets } from '@material-ui/core/styles'



class BaseDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link rel="icon" type="image/x-icon" href="/images/favicon.ico" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
          {process.env.NODE_ENV === 'Production' && process.env.APP_ENV === "Production" && (
            // PUT ANY HEADER CODE HERE SUCH AS WEB ANALYTICS OR OTHER SCRIPTS TO BE LOADED IN PRODUCTION
            "Decredex"
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

BaseDocument.getInitialProps = async (ctx) => {

  // Make sure that Material UI library is available with SSR
  // https://github.com/mui-org/material-ui/tree/master/examples/nextjs
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;
  ctx.renderPage = () => originalRenderPage({
    enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
  });

  const initialProps = await Document.getInitialProps(ctx);
  return {
    ...initialProps,
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
  };
};

export default BaseDocument

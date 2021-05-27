import React from 'react'
import App from 'next/app'
import Head from 'next/head'

import { SnackbarProvider } from 'notistack'

import theme from 'theme'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'

import { AppProvider } from 'context'
import { appWithTranslation } from 'i18n'



const BaseApp = (props) => {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    jssStyles ? jssStyles.parentElement.removeChild(jssStyles) : null
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Decredex</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <AppProvider>
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
              <CssBaseline />
              <Component {...pageProps} />
          </SnackbarProvider>
        </ThemeProvider>
      </AppProvider>
    </React.Fragment>
  );
}

export default appWithTranslation(BaseApp)

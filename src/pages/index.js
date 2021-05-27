import React from 'react'

import Router from 'next/router'

import { useTranslation } from 'i18n'
import { useAppContext } from 'context'
import { useSnackbar } from 'notistack'

import MinimalLayout from 'layouts/minimal'

import { makeStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'

import HeaderIcon from '@material-ui/icons/Code'



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },

  body: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(4),
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
    }
  },

  contentTitle: {
    paddingBottom: theme.spacing(8)
  },
  contentHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: theme.spacing(6),
  },
  contentHeaderAvatar: {
    backgroundColor: theme.palette.primary.main
  },
  contentHeaderText: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: theme.spacing(2)
  },
  contentBody: {
    display: 'flex',
    flexDirection: 'row'
  },
  contentFormLoginButtonGroup: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column'
  },
  contentFormLoginButton: {
    margin: theme.spacing(1)
  },

  footer: {
    height: 84,
    padding: theme.spacing(3, 2),
    backgroundColor: theme.palette.white
  }
}))

const Index = (props) => {
  const classes = useStyles()
  const {enqueueSnackbar} = useSnackbar()
  const [context, dispatch] = useAppContext()
  const [t, i18n] = useTranslation(['common'])



  const handleLogin = (id, event) => {
    event.preventDefault()

    switch (id) {
      case 1:
        enqueueSnackbar(t("common:logged-in-as")+" 'Institution A'", { variant: 'success' })
        dispatch({
          type: "CHANGE_ACCOUNT",
          value: {name: 'Institution A', id: 1}
        })
        Router.push('/institution')
        break

      case 2:
        enqueueSnackbar(t("common:logged-in-as")+" 'Government A'", { variant: 'success' })
        dispatch({
          type: "CHANGE_ACCOUNT",
          value: {name: 'Government A', id: 2}
        })
        Router.push('/lookup')
        break

      case 3:
        enqueueSnackbar(t("common:logged-in-as")+" 'Workplace A'", { variant: 'success' })
        dispatch({
          type: "CHANGE_ACCOUNT",
          value: {name: 'Workplace A', id: 3}
        })
        Router.push('/lookup')
        break

      case 4:
        enqueueSnackbar(t("common:logged-in-as")+" 'Student 1'", { variant: 'success' })
        dispatch({
          type: "CHANGE_ACCOUNT",
          value: {name: 'Student 1', id: 4}
        })
        Router.push('/student')
        break

      case 5:
        enqueueSnackbar(t("common:logged-in-as")+" 'Student 2'", { variant: 'success' })
        dispatch({
          type: "CHANGE_ACCOUNT",
          value: {name: 'Student 2', id: 5}
        })
        Router.push('/student')
        break

      case 6:
        enqueueSnackbar(t("common:logged-in-as")+" 'Student 3'", { variant: 'success' })
        dispatch({
          type: "CHANGE_ACCOUNT",
          value: {name: 'Student 3', id: 6}
        })
        Router.push('/student')
        break

      default:
        enqueueSnackbar(t("common:failed-login"), { variant: 'error' })
    }
  }


  return (
    <MinimalLayout>
      <div className={classes.root}>
        <div className={classes.body}>

          <div className={classes.contentTitle}>
            <Typography variant="h3">
              {t('common:title')}
            </Typography>
          </div> {/* classes.contentTitle */}

          <div className={classes.contentHeader}>
            <Avatar className={classes.contentHeaderAvatar}>
              <HeaderIcon />
            </Avatar>
            <div className={classes.contentHeaderText}>
              <Typography variant="h5">
                {t('common:message')}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                {t('common:made-by')}: <a href="https://www.torestenbock.com">Tore Stenbock</a>
              </Typography>
            </div> {/* classes.contentHeaderText */}
          </div> {/* classes.contentHeader */}

          <div className={classes.contentBody}>
            <div className={classes.contentFormLoginButtonGroup}>
              <Button
                className={classes.contentFormLoginButton}
                fullWidth variant="contained"
                color="primary" size="large"
                onClick={(e) => handleLogin(1, e)}>
                  {t('common:login-as')} Institution A
              </Button>
            </div> {/* classes.contentFormLoginButtonGroup */}
            <div className={classes.contentFormLoginButtonGroup}>
              <Button
                className={classes.contentFormLoginButton}
                fullWidth variant="contained"
                color="primary" size="large"
                onClick={(e) => handleLogin(4, e)}>
                  {t('common:login-as')} Student 1
              </Button>
              <Button
                className={classes.contentFormLoginButton}
                fullWidth variant="contained"
                color="primary" size="large"
                onClick={(e) => handleLogin(5, e)}>
                  {t('common:login-as')} Student 2
              </Button>
              <Button
                className={classes.contentFormLoginButton}
                fullWidth variant="contained"
                color="primary" size="large"
                onClick={(e) => handleLogin(6, e)}>
                  {t('common:login-as')} Student 3
              </Button>
            </div> {/* classes.contentFormLoginButtonGroup */}

            <div style={{width: "124px"}} />

            <div className={classes.contentFormLoginButtonGroup}>
              <Button
                className={classes.contentFormLoginButton}
                fullWidth variant="contained"
                color="primary" size="large"
                onClick={(e) => handleLogin(2, e)}>
                  {t('common:login-as')} Government A
              </Button>
            </div> {/* classes.contentFormLoginButtonGroup */}
            <div className={classes.contentFormLoginButtonGroup}>
              <Button
                className={classes.contentFormLoginButton}
                fullWidth variant="contained"
                color="primary" size="large"
                onClick={(e) => handleLogin(3, e)}>
                  {t('common:login-as')} Workplace A
              </Button>
            </div> {/* classes.contentFormLoginButtonGroup */}
          </div> {/* classes.contentBody */}

        </div> {/* classes.body */}

        <div className={classes.footer}>
        </div>

      </div> {/* classes.root */}
    </MinimalLayout>
  )
}

export const getServerSideProps = async (context) => {
  // Put server-side logic here
  return {props: {}}
}

export default Index

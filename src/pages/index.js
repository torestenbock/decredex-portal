import React from 'react'

import { useTranslation } from 'i18n'
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

  footer: {
    height: 84,
    padding: theme.spacing(3, 2),
    backgroundColor: theme.palette.white
  }
}))

const Index = (props) => {
  const classes = useStyles()
  const {enqueueSnackbar} = useSnackbar()
  const [t, i18n] = useTranslation(['common'])


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
            </div>
          </div> {/* classes.contentHeader */}

          <div className={classes.contentBody}>
          <Button
            fullWidth variant="contained"
            className={classes.contentFormLoginButton}
            color="primary" size="large"
            onClick={() => enqueueSnackbar(t("common:toast-demo-message"), { variant: 'success' })}>
              {t('common:toast-demo')}
          </Button>
          </div> {/* classes.contentBody */}

        </div>
        <div className={classes.footer}>
        </div>
      </div>
    </MinimalLayout>
  )
}

export const getServerSideProps = async (context) => {
  // Put server-side logic here
  return {props: {}}
}

export default Index

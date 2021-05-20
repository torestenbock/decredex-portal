import React from 'react'

import { useTranslation } from 'i18n'

import { makeStyles } from '@material-ui/core/styles'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'



const useStyles = makeStyles({
  root: {
    boxShadow: 'none'
  },
  toolbar: {},
  logo: {
    height: '24px'
  }
})

const Topbar = (props) => {
  const classes = useStyles()
  const [t, i18n] = useTranslation(['topbar'])

  return (
    <AppBar color='primary' position='fixed'>
      <Toolbar className={classes.toolbar}>

    <Typography variant="h6">
      {t('topbar:title')}
    </Typography>

      </Toolbar>
    </AppBar>
  )
}

export default Topbar

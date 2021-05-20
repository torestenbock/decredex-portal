import React from 'react'
import Link from 'next/link'
import Router from 'next/router'

import { useSnackbar } from 'notistack'
import { useTranslation } from 'i18n'

import { makeStyles } from '@material-ui/core/styles'

import Badge from '@material-ui/core/Badge'
import AppBar from '@material-ui/core/AppBar'
import Hidden from '@material-ui/core/Hidden'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AccountIcon from '@material-ui/icons/AccountCircle'
import ProfileMenuIcon from '@material-ui/icons/ArrowDropDown'
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined'


const useStyles = makeStyles((theme) => ({
  appbar: {
    boxShadow: 'none'
  },
  toolbar: {},
  logo: {
    height: '24px'
  },
  flexGrow: {
    flexGrow: 1
  },
  profile: {
    marginLeft: theme.spacing(2),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    cursor: 'pointer'
  },
  menuItem: {
    paddingRight: theme.spacing(2)
  }
}))

const Topbar = (props) => {
  const classes = useStyles()
  const {changeOpenSidebar} = props
  const {enqueueSnackbar} = useSnackbar()
  const [t, i18n] = useTranslation(['common', 'topbar'])



  return (
    <AppBar className={classes.appbar} color='primary' position='fixed'>
      <Toolbar className={classes.toolbar}>

        {/* FOR WHEN THE SCREEN IS SMALL */}
        <Hidden mdUp>
          <IconButton
            color="inherit"
            onClick={() => changeOpenSidebar(true)}>
            <MenuIcon />
          </IconButton>
        </Hidden>

        <Typography variant="h6">
          {t('topbar:title')}
        </Typography>

        <div className={classes.flexGrow} />

        <IconButton color='inherit'>
          <Badge badgeContent={0} color='secondary'>
            <NotificationsIcon />
          </Badge>
        </IconButton>

        <div
          className={classes.profile}
          onClick={(event) => console.log("Hellow World")}>
          <Typography color="inherit">
            PROFILE
          </Typography>
          <ProfileMenuIcon color='inherit' />
        </div>

      </Toolbar>
    </AppBar>
  )
}

export default Topbar

import React from 'react'
import { useRouter } from 'next/router'

import { useTranslation } from 'i18n'

import { makeStyles } from '@material-ui/core/styles'

import Drawer from '@material-ui/core/Drawer'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import BackIcon from '@material-ui/icons/ArrowBack'
import DashboardIcon from '@material-ui/icons/Dashboard'
import SupportIcon from '@material-ui/icons/Help'



const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240
  },
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  flexGrow: {
    flexGrow: 1
  },
  nav: {
    flex: 1,
    width: '100%',
    padding: 0
  },
  listItem: {
    display: 'flex',
    padding: theme.spacing(1),
    color: theme.palette.text.primary,
    width: '100%',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  footer: {
    width: '100%',
    padding: 0
  }
}))

const Sidebar = (props) => {
  const router = useRouter()
  const classes = useStyles()
  const [t, i18n] = useTranslation(['sidebar'])
  const { changeOpenSidebar, persistOpenSidebar, variant } = props

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={() => changeOpenSidebar(false)}
      open={persistOpenSidebar}
      variant={variant}>
      <Toolbar>
        <IconButton color="inherit" onClick={() => changeOpenSidebar(false)}>
          <BackIcon />
        </IconButton>
      </Toolbar>

      <div className={classes.root}>
        {/* TOP ELEMENTS */}
        <List className={classes.nav}>
          <ListItem button
            className={classes.listItem}
            onClick={() => router.push('/')}
            selected={router.pathname.includes('/')}>
            <ListItemIcon> <DashboardIcon /> </ListItemIcon>
            <ListItemText primary={t("sidebar:navigation.dashboard")} />
          </ListItem>

          {/* ADD MORE LIST ITEMS HERE */}

        </List>

        {/* BOTTOM ELEMENTS */}
        <List className={classes.footer}>

          <ListItem button
            className={classes.listItem}
            selected={router.pathname.includes('/support')}>
            <ListItemIcon> <SupportIcon /> </ListItemIcon>
            <ListItemText primary={t("sidebar:navigation.support")} />
          </ListItem>

        </List>

      </div>

    </Drawer>
  )
}

export default Sidebar

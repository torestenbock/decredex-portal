import React from 'react'

import { useMediaQuery } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'

import Topbar from 'layouts/main/topbar'
import Sidebar from 'layouts/main/sidebar'



const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 56,
    height: '100vh',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64
    },
    [theme.breakpoints.up('md')]: {
      paddingLeft: 240
    }
  },
  content: {
    height: '100%'
  }
}))

const MainLayout = (props) => {
  const theme = useTheme()
  const classes = useStyles()
  const [openSidebar, changeOpenSidebar] = React.useState(false)

  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), {defaultMatches: true})
  const persistOpenSidebar = isDesktop ? true : openSidebar



  return (
    <div className={classes.root}>

      <Topbar
        changeOpenSidebar={changeOpenSidebar}
      />

      <Sidebar
        changeOpenSidebar={changeOpenSidebar}
        persistOpenSidebar={persistOpenSidebar}
        variant={isDesktop ? 'persistent' : 'temporary'}
      />

      <main className={classes.content}>
        {props.children}
      </main>

    </div>
  )
}

export default MainLayout

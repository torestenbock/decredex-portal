import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import Topbar from 'layouts/minimal/topbar'



const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 64,
    height: '100vh'
  },
  content: {
    height: '100%'
  }
}))

const MinimalLayout = (props) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
    <Topbar />
      <main className={classes.content}>
        {props.children}
      </main>
    </div>
  )
}

export default MinimalLayout

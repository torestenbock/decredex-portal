import React from 'react'
import { ethers } from 'ethers'

import Router from 'next/router'

import { useTranslation } from 'i18n'
import { useAppContext } from 'context'
import { useSnackbar } from 'notistack'

import MainLayout from 'layouts/main'

import { makeStyles } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'

import HeaderIcon from '@material-ui/icons/Code'



const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },

  content: {
    flex: 1,
    width: '100%',
    maxWidth: '1200px',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(4)
  },
  contentHeader: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(4),
  },

  contentCourses: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(4),
  },
  contentCoursesTitle: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: theme.spacing(2)
  },
  contentCoursesList: {
    display: 'flex',
    marginBottom: theme.spacing(4)
  },
  contentCoursesListItem: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2)
  },

  footer: {

  }
}))

const Student = (props) => {
  const classes = useStyles()
  const {enqueueSnackbar} = useSnackbar()
  const [t, i18n] = useTranslation(['common'])
  const [context, dispatch] = useAppContext()
  const [address, setAddress] = React.useState(null)
  const signer = context.provider.getSigner(context.account?.id)
  const contract = new ethers.Contract(context.decredex.networks["920717"].address, context.decredex.abi, signer)
  const [b4d, setB4d] = React.useState(null)
  const [tkn101, setTkn101] = React.useState(null)
  const [student, setStudent] = React.useState(null)

  React.useEffect(() => {
    signer.getAddress(context.account?.id).then((result) => {
      setAddress(result)

      contract.queryStudent(result).then((result) => {
        setStudent({
          name: result[1],
          enrollments: result[2],
          completions: result[3]
        })
      })
    })

    contract.queryCourse("B4D").then((result) => {
      setB4d({
        code: result[0],
        name: result[1],
        credits: result[3],
        enrolledStudents: result[4],
        completions: result[5]
      })
    })
    contract.queryCourse("TKN101").then((result) => {
      setTkn101({
        code: result[0],
        name: result[1],
        credits: result[3],
        enrolledStudents: result[4],
        completions: result[5]
      })
    })

  }, [])



  return (
    <MainLayout>
      <div className={classes.root}>
        <div className={classes.content}>

          <div className={classes.contentHeader}>
            <Typography variant="h6">
              {t("common:logged-in-as")} {context.account?.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {address}
            </Typography>
            <Typography variant="caption">
              <a href={"http://localhost:3000/lookup/"+address} target="_blank">Share Link</a>
            </Typography>
          </div> {/* classes.contentHeader */}

          <div className={classes.contentCourses}>
            <div className={classes.contentCoursesTitle}>
              <Typography variant="h5" style={{flex: 1}}>
                {t("common:my-enrollments")}
              </Typography>
            </div> {/* classes.contentCoursesTitle */}
            <div className={classes.contentCoursesList}>
              <Grid container spacing={2}>
                {student?.enrollments.map((course, index) => (
                  (() => {
                    if (course === "B4D") {
                      return (
                        <Grid key={index} item xs={4}>
                          <Paper className={classes.contentCoursesListItem}>
                            <Typography variant="h6">
                              {b4d?.name}
                            </Typography>
                            <Typography variant="body1" style={{flex: 1}}>
                              {b4d?.code}
                            </Typography>
                            <Typography variant="overline">
                              Credits: {b4d?.credits/100.0}
                            </Typography>
                          </Paper>
                        </Grid>
                      )
                    }
                    if (course === "TKN101") {
                      return (
                        <Grid key={index} item xs={4}>
                          <Paper className={classes.contentCoursesListItem}>
                            <Typography variant="h6">
                              {tkn101?.name}
                            </Typography>
                            <Typography variant="body1" style={{flex: 1}}>
                              {tkn101?.code}
                            </Typography>
                            <Typography variant="overline">
                              Credits: {tkn101?.credits/100.0}
                            </Typography>
                          </Paper>
                        </Grid>
                      )
                    }
                  })()
                ))}
              </Grid>
            </div> {/* classes.contentCoursesList */}
          </div> {/* classes.contentCourses */}

          <div className={classes.contentCourses}>
            <div className={classes.contentCoursesTitle}>
              <Typography variant="h5" style={{flex: 1}}>
                {t("common:my-completions")}
              </Typography>
            </div> {/* classes.contentCoursesTitle */}
            <div className={classes.contentCoursesList}>
              <Grid container spacing={2}>
                {student?.completions.map((course, index) => (
                  (() => {
                    if (course === "B4D") {
                      return (
                        <Grid key={index} item xs={4}>
                          <Paper className={classes.contentCoursesListItem}>
                            <Typography variant="h6">
                              {b4d?.name}
                            </Typography>
                            <Typography variant="body1" style={{flex: 1}}>
                              {b4d?.code}
                            </Typography>
                            <Typography variant="overline">
                              Credits: {b4d?.credits/100.0}
                            </Typography>
                            <Tooltip title="0x916B6ec3a7a9D926374dE1206bfca14BDD59F1A1" placement="bottom-end">
                              <Typography variant="caption">
                                Verified by: Institution A
                              </Typography>
                            </Tooltip>
                          </Paper>
                        </Grid>
                      )
                    }
                    if (course === "TKN101") {
                      return (
                        <Grid key={index} item xs={4}>
                          <Paper className={classes.contentCoursesListItem}>
                            <Typography variant="h6">
                              {tkn101?.name}
                            </Typography>
                            <Typography variant="body1" style={{flex: 1}}>
                              {tkn101?.code}
                            </Typography>
                            <Typography variant="overline">
                              Credits: {tkn101?.credits/100.0}
                            </Typography>
                            <Tooltip title="0x916B6ec3a7a9D926374dE1206bfca14BDD59F1A1" placement="bottom-end">
                              <Typography variant="caption">
                                Verified by: Institution A
                              </Typography>
                            </Tooltip>
                          </Paper>
                        </Grid>
                      )
                    }
                  })()
                ))}
              </Grid>
            </div> {/* classes.contentCoursesList */}

          </div> {/* classes.contentCourses */}

        </div> {/* classes.content */}

        <div className={classes.footer}>
        </div>

      </div> {/* classes.root */}
    </MainLayout>
  )
}

export const getServerSideProps = async (context) => {
  // Put server-side logic here
  return {props: {}}
}

export default Student

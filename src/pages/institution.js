import React from 'react'
import {ethers} from 'ethers'
import Router from 'next/router'

import { useTranslation } from 'i18n'
import { useAppContext } from 'context'
import { useSnackbar } from 'notistack'

import MainLayout from 'layouts/main'

import { makeStyles } from '@material-ui/core/styles'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'

import Grid from '@material-ui/core/Grid'
import Chip from '@material-ui/core/Chip'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import LinearProgress from '@material-ui/core/LinearProgress'

import DoneIcon from '@material-ui/icons/Done'
import HeaderIcon from '@material-ui/icons/Code'
import PersonIcon from '@material-ui/icons/Person'


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
  contentCoursesStudentList: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2)
  },
  contentCoursesStudentListItem: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: theme.spacing(1)
  },

  footer: {

  }
}))

const Institution = (props) => {
  const classes = useStyles()
  const {enqueueSnackbar} = useSnackbar()
  const [t, i18n] = useTranslation(['common'])
  const [context, dispatch] = useAppContext()
  const [address, setAddress] = React.useState(null)
  const [b4d, setB4d] = React.useState(null)
  const [b4dLoading, setB4dLoading] = React.useState(false)
  const [tkn101, setTkn101] = React.useState(null)
  const [tkn101Loading, setTkn101Loading] = React.useState(false)
  const signer = context.provider.getSigner(context.account?.id)
  const contract = new ethers.Contract(context.decredex.networks["920717"].address, context.decredex.abi, signer)
  const [openEnrollStudentB4dDialog, changeOpenEnrollStudentB4dDialog] = React.useState(false)
  const [openEnrollStudentTkn101Dialog, changeOpenEnrollStudentTkn101Dialog] = React.useState(false)

  React.useEffect(() => {
    signer.getAddress(context.account?.id).then((result) => {
      setAddress(result)
    })

    contract.on("DECREDEX_STUDENT_ENROLLED", (code, student) => {
      // enqueueSnackbar("Enrolled student " + student, { variant: 'success' })
      contract.queryCourse("B4D").then((result) => {
        setB4dLoading(false)
        setB4d({
          code: result[0],
          name: result[1],
          credits: result[3],
          enrolledStudents: result[4],
          completions: result[5]
        })
      })
      contract.queryCourse("TKN101").then((result) => {
        setTkn101Loading(false)
        setTkn101({
          code: result[0],
          name: result[1],
          credits: result[3],
          enrolledStudents: result[4],
          completions: result[5]
        })
      })
    })

    contract.on("DECREDEX_STUDENT_COMPLETED", (code, student) => {
      // enqueueSnackbar("Student marked as Graduated [" + student + "]", { variant: 'success' })
      contract.queryCourse("B4D").then((result) => {
        setB4dLoading(false)
        setB4d({
          code: result[0],
          name: result[1],
          credits: result[3],
          enrolledStudents: result[4],
          completions: result[5]
        })
      })
      contract.queryCourse("TKN101").then((result) => {
        setTkn101Loading(false)
        setTkn101({
          code: result[0],
          name: result[1],
          credits: result[3],
          enrolledStudents: result[4],
          completions: result[5]
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



  const handleRegisterCourse = (event) => {
    event.preventDefault()
  }

  const handleEnrollStudentB4D = (student, event) => {
    event.preventDefault()
    setB4dLoading(true)
    changeOpenEnrollStudentB4dDialog(false)

    // Enroll the student
    enqueueSnackbar("Enrolling student [B4D]", { variant: 'info' })
    contract.enrollStudent(student, "B4D")
  }

  const handleEnrollStudentTKN101 = (student, event) => {
    event.preventDefault()
    setTkn101Loading(true)
    changeOpenEnrollStudentTkn101Dialog(false)

    // Enroll the student
    enqueueSnackbar("Enrolling student [TKN101]", { variant: 'info' })
    contract.enrollStudent(student, "TKN101")
  }

  const handleCompleteStudentB4D = (student, event) => {
    event.preventDefault()
    setB4dLoading(true)

    // Complete the student
    enqueueSnackbar("Completing studies for student [B4D]", { variant: 'info' })
    contract.completeStudent(student, "B4D")
  }

  const handleCompleteStudentTKN101 = (student, event) => {
    event.preventDefault()
    setTkn101Loading(true)

    // Complete the student
    enqueueSnackbar("Completing studies for student [TKN101]", { variant: 'info' })
    contract.completeStudent(student, "TKN101")
  }

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
          </div> {/* classes.contentHeader */}

          <div className={classes.contentCourses}>
            <div className={classes.contentCoursesTitle}>
              <Typography variant="h5" style={{flex: 1}}>
                {t("common:courses")}
              </Typography>
              <Button
                color="primary"
                variant="contained"
                onClick={(event) => handleRegisterCourse(event)}>
                {t('common:register-class')}
              </Button>
            </div> {/* classes.contentCoursesTitle */}
            <div className={classes.contentCoursesList}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
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
                    <br></br>
                    <Divider />
                    <br></br>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => changeOpenEnrollStudentB4dDialog(true)}>
                      {t('common:enroll-student')}
                    </Button>
                    <div className={classes.contentCoursesStudentList}>
                      {b4d?.enrolledStudents.length === 0 ? (
                        <Typography>
                          {t('common:no-enrolled-students')}
                        </Typography>
                      ) : (
                        b4d?.enrolledStudents.map((student, index) => (
                          context.accounts.students.map((s) => (
                            (student === s[1]) && (
                              <div key={index} className={classes.contentCoursesStudentListItem}>
                                <Typography style={{flex: 1}}>
                                  {s[0]}
                                </Typography>
                                <Chip
                                  label="Graduate" clickable
                                  onClick={(event) => handleCompleteStudentB4D(student, event)}
                                  deleteIcon={<DoneIcon />} />
                              </div>
                            )
                          ))
                        ))
                      )}
                      {b4dLoading && (
                        <LinearProgress style={{marginBottom: '4px'}} />
                      )}
                      {b4d?.completions.map((student, index) => (
                        context.accounts.students.map((s) => (
                          (student === s[1]) && (
                            <div key={index} className={classes.contentCoursesStudentListItem}>
                              <Typography style={{flex: 1}}>
                                {s[0]}
                              </Typography>
                              <Chip label="Graduated" color="primary" />
                            </div>
                          )
                        ))
                      ))}
                    </div> {/* classes.contentCoursesStudentList} */}
                  </Paper>
                </Grid>
                <Grid item xs={4}>
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
                    <br></br>
                    <Divider />
                    <br></br>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => changeOpenEnrollStudentTkn101Dialog(true)}>
                      {t('common:enroll-student')}
                    </Button>
                    <div className={classes.contentCoursesStudentList}>
                      {tkn101?.enrolledStudents.length === 0 ? (
                        <Typography className={classes.contentCoursesStudentListItem}>
                          {t('common:no-enrolled-students')}
                        </Typography>
                      ) : (
                        tkn101?.enrolledStudents.map((student, index) => (
                          context.accounts.students.map((s) => (
                            (student === s[1]) && (
                              <div key={index} className={classes.contentCoursesStudentListItem}>
                                <Typography style={{flex: 1}}>
                                  {s[0]}
                                </Typography>
                                <Chip
                                  label="Graduate" clickable
                                  onClick={(event) => handleCompleteStudentTKN101(student, event)}
                                  deleteIcon={<DoneIcon />} />
                              </div>
                            )
                          ))
                        ))
                      )}
                      {tkn101Loading && (
                        <LinearProgress style={{marginBottom: '4px'}}/>
                      )}
                      {tkn101?.completions.map((student, index) => (
                        context.accounts.students.map((s) => (
                          (student === s[1]) && (
                            <div key={index} className={classes.contentCoursesStudentListItem}>
                              <Typography style={{flex: 1}}>
                                {s[0]}
                              </Typography>
                              <Chip label="Graduated" color="primary" />
                            </div>
                          )
                        ))
                      ))}
                    </div> {/* classes.contentCoursesStudentList} */}
                  </Paper>
                </Grid>
              </Grid>
            </div>  {/* classes.contentCoursesList */}

          </div> {/* classes.contentCourses */}

        </div> {/* classes.content */}

        <div className={classes.footer}>
        </div>

        <Dialog open={openEnrollStudentB4dDialog} fullWidth maxWidth='sm'>
          <DialogTitle id="enroll-student-dialog-title">
            {t("common:enroll-student")}
          </DialogTitle>
          <List>
            {context.accounts.students.map((student, index) => (
              <ListItem key={index} autoFocus button onClick={(event) => handleEnrollStudentB4D(student[1], event)}>
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={student[0]} secondary={student[1]} />
              </ListItem>
            ))}
          </List>
          <DialogActions>
            <Button onClick={() => changeOpenEnrollStudentB4dDialog(false)} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openEnrollStudentTkn101Dialog} fullWidth maxWidth='sm'>
          <DialogTitle id="enroll-student-dialog-title">
            {t("common:enroll-student")}
          </DialogTitle>
          <List>
            {context.accounts.students.map((student, index) => (
              <ListItem key={index} autoFocus button onClick={(event) => handleEnrollStudentTKN101(student[1], event)}>
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={student[0]} secondary={student[1]} />
              </ListItem>
            ))}
          </List>
          <DialogActions>
            <Button onClick={() => changeOpenEnrollStudentTkn101Dialog(false)} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

      </div> {/* classes.root */}
    </MainLayout>
  )
}

export const getServerSideProps = async (context) => {
  // Put server-side logic here
  return {props: {}}
}

export default Institution

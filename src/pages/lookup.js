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
import TextField from '@material-ui/core/TextField'
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

  contentBody: {
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
  contentBodyTextInput: {
    display: 'flex',
    flexDirection: 'row'
  },

  footer: {

  }
}))

const Lookup = (props) => {
  const classes = useStyles()
  const [t, i18n] = useTranslation(['common'])
  const [context, dispatch] = useAppContext()
  const [address, setAddress] = React.useState(null)
  const [search, setSearch] = React.useState("")

  React.useEffect(() => {
    // signer.getAddress(context.account?.id).then((result) => {
    //   setAddress(result)
    // })
  }, [])



  const handleSearch = (event) => {
    event.preventDefault()
    if(search.length === 42) {
      Router.push("/lookup/"+search)
    }
  }

  return (
    <MainLayout>
      <div className={classes.root}>
        <div className={classes.content}>

          <div className={classes.contentBody}>
            <Typography variant="h6">
              {t("common:search-student")}
            </Typography>
            <div className={classes.contentBodyTextInput}>
              <TextField
                style={{width: '64ch', marginRight: '16px'}}
                id="outlined-basic"
                label="0x..."
                variant="outlined"
                onChange={(event) => setSearch(event.target.value)}/>
              <Button
                color="primary"
                variant="contained"
                onClick={(event) => handleSearch(event)}>
                {t('common:search')}
              </Button>
            </div> {/* classes.contentHeader */}
          </div> {/* classes.contentHeader */}

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

export default Lookup

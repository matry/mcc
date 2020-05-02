import React from 'react'
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Menu, Settings } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },
  toolBar: {
    flexGrow: 1,
  },
  toolBarMenuButton: {
    marginRight: theme.spacing(2),
  },
  toolBarTitle: {
    flexGrow: 1,
  },
}))

const AppHeader = ({ onToggleNav, onToggleGrid }) => {
  const classes = useStyles()

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          className={classes.toolBarMenuButton}
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onToggleNav}
        >
          <Menu />
        </IconButton>
        <Typography className={classes.toolBarTitle} variant="h6">
          Matry | mcc
        </Typography>
        <IconButton edge="end" color="inherit" aria-label="menu" onClick={onToggleGrid}>
          <Settings />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default AppHeader

import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  AppBar,
  CssBaseline,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  Divider,
} from '@material-ui/core'
import { Menu, Settings } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },
  root: {
    backgroundColor: '#fafafa',
    height: '100%',
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
  leftDrawer: {
    minWidth: '230px',
  },
  list: {
    marginBottom: '32px',
  },
}))

const Home = () => {
  const [navOpen, setNavOpen] = useState(false)
  const [gridOptionsOpen, setGridOptionsOpen] = useState(false)
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            className={classes.toolBarMenuButton}
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setNavOpen(!navOpen)}
          >
            <Menu />
          </IconButton>
          <Typography className={classes.toolBarTitle} variant="h6">
            Matry | mcc
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={() => setGridOptionsOpen(!gridOptionsOpen)}
          >
            <Settings />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={navOpen} onClose={() => setNavOpen(false)}>
        <div className={classes.leftDrawer}>
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Tokens
              </ListSubheader>
            }
            className={classes.list}
          >
            <ListItem button>
              <ListItemText primary="Branding" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Typography" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Grid" />
            </ListItem>
          </List>
          <Divider />
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Components
              </ListSubheader>
            }
            className={classes.list}
          >
            <ListItem button>
              <ListItemText primary="Button" />
            </ListItem>
            <ListItem button selected>
              <ListItemText primary="TextInput" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="NumberInput" />
            </ListItem>
          </List>
        </div>
      </Drawer>
      <Drawer anchor="right" open={gridOptionsOpen} onClose={() => setGridOptionsOpen(false)}>
        <ul>
          <li>four</li>
          <li>five</li>
          <li>six</li>
        </ul>
      </Drawer>
    </div>
  )
}

export default Home

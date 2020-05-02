import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import AppHeader from './AppHeader'
import AppNav from './AppNav'
import GridOptions from './GridOptions'

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
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [isGridOptionsOpen, setIsGridOptionsOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState('Button')
  const navItems = {
    Tokens: ['Branding', 'Typography', 'Grid'],
    Components: ['Button', 'TextInput', 'NumberInput', 'Dropdown'],
  }
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppHeader
        onToggleNav={() => setIsNavOpen(!isNavOpen)}
        onToggleGrid={() => setIsGridOptionsOpen(!isGridOptionsOpen)}
      />
      <AppNav
        selectedItem={selectedItem}
        navItems={navItems}
        onSelect={setSelectedItem}
        isOpen={isNavOpen}
        onClose={() => setIsNavOpen(false)}
      />
      <GridOptions isOpen={isGridOptionsOpen} onClose={() => setIsGridOptionsOpen(false)} />
    </div>
  )
}

export default Home

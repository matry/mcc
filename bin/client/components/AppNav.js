import React from 'react'
import { Drawer, List, ListSubheader, ListItem, ListItemText, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  leftDrawer: {
    minWidth: '230px',
  },
  list: {
    marginBottom: '32px',
  },
}))

const AppNav = ({ navItems, isOpen, onClose, selectedItem, onSelect }) => {
  const classes = useStyles()
  const navKeys = Object.keys(navItems)

  return (
    <Drawer anchor="left" open={isOpen} onClose={onClose}>
      <div className={classes.leftDrawer}>
        {navKeys.map((key, i) => {
          const items = navItems[key]
          const isLast = i === navKeys.length - 1

          return (
            <React.Fragment key={key}>
              <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={<ListSubheader component="div">{key}</ListSubheader>}
                className={classes.list}
              >
                {items.map((item) => (
                  <ListItem
                    selected={item === selectedItem}
                    key={`${key}_${item}`}
                    button
                    onClick={() => {
                      onSelect(item)
                      onClose()
                    }}
                  >
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
              {isLast ? null : <Divider />}
            </React.Fragment>
          )
        })}
      </div>
    </Drawer>
  )
}

export default AppNav

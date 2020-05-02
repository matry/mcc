import React from 'react'
import { Drawer } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({}))

const GridOptions = ({ isOpen, onClose }) => {
  const classes = useStyles()

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <ul>
        <li>four</li>
        <li>five</li>
        <li>six</li>
      </ul>
    </Drawer>
  )
}

export default GridOptions

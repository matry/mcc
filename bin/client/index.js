import React from 'react'
import { render } from 'react-dom'
import 'typeface-roboto'
import App from './components/App'
import './index.css'
import bundle from './bundle.json'

class Table {
  constructor(bundle) {
    console.log('bundle')
    console.log(bundle)
  }
}

const table = new Table(bundle)

const rootElement = document.getElementById('app')
render(<App bundle={bundle} />, rootElement)

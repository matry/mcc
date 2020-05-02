import React from 'react'
import { render } from 'react-dom'
import 'typeface-roboto'
import App from './components/App'
import './index.css'

const rootElement = document.getElementById('app')

render(<App />, rootElement)

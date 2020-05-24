import React from 'react'
import { render } from 'react-dom'
import 'typeface-roboto'
import App from './components/App'
import './index.css'
import bundle from './bundle.json'

const rootElement = document.getElementById('app')
render(<App bundle={bundle} />, rootElement)

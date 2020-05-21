import React from 'react'
import { render } from 'react-dom'
import 'typeface-roboto'
import App from './components/App'
import './index.css'
import bundle from './bundle.json'
import Renderer from './services/webrender/Renderer'

const renderer = new Renderer(bundle)

const rootElement = document.getElementById('app')

render(<App renderer={renderer} bundle={bundle} />, rootElement)

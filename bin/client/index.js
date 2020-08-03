import React from 'react'
import { render } from 'react-dom'
import 'typeface-roboto'
import App from './components/App'
import './index.css'
import bundle from './bundle.mock.json'

class DataFrame {
  constructor(bundle) {
    this.data = bundle
  }

  getById(entity, id) {
    return this.data[entity][id]
  }

  denormalize(entity) {
    return this.data[entity].list.map((id) => this.data[entity].map[id])
  }

  groupBy(entity, ref) {
    const refEntity = Object.values(this.data).find((value) => {
      return value.ref === ref
    })

    // console.log(refEntity)

    return refEntity.list.map((refId) => {
      const refRecord = refEntity.map[refId]
      // console.log(refRecord)
      refRecord[entity] = this.denormalize(entity).filter((record) => {
        console.log(record)
        console.log(ref)
        console.log(refId)
        return record[ref] === refId
      })

      return refRecord
    })
  }
}

const dataFrame = new DataFrame(bundle)

const rootElement = document.getElementById('app')
render(<App dataFrame={dataFrame} />, rootElement)

/*

global space
  - global token expressions
  - global parameters expressions
  - environment (canvas width, canvas height)

component space
  - 

render:
  - load environment
  - load token expressions
  - calculate token values




*/

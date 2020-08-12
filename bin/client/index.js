import React from 'react'
import { render } from 'react-dom'
import 'typeface-roboto'
import App from './components/App'
import bundle from './bundle.mock.json'
import './index.css'

class Bundle {
  constructor(data) {
    this.data = data
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
        return record[ref] === refId
      })

      return refRecord
    })
  }
}

window.bundle = new Bundle(bundle)

const rootElement = document.getElementById('app')
render(<App />, rootElement)

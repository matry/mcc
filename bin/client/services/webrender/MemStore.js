class MemStore {
  addTable(id) {
    this[id] = this[id] || {
      map: {},
      list: [],
    }
  }

  removeTable(id) {
    delete this[id]
  }

  batchIngest(bundle) {
    Object.keys(bundle).forEach((bundleId) => {
      this.addTable(bundleId)
      this.ingest(bundleId, bundle[bundleId])
    })
  }

  ingest(id, { map, list }) {
    if (!this.hasOwnProperty(id)) {
      throw new Error(`Unable to ingest data into missing table ${id}`)
    }

    this[id] = {
      map: {
        ...this[id].map,
        ...map,
      },
      list: [...this[id].list, ...list],
    }
  }

  getById(tableId, rowId) {
    if (!tableId || !this.hasOwnProperty(tableId)) {
      return null
    }

    return this[tableId].map[rowId]
  }

  getFirst(tableId) {
    return this[tableId].map[this[tableId].list[0]]
  }

  aggregateByContextKey(tableIds, contextKey) {
    const results = {}

    tableIds.forEach((tableId) => {
      results[tableId] = []

      this[tableId].list.forEach((id) => {
        const keys = id.split('.')

        if (keys[0] === contextKey) {
          results[tableId].push({
            ...this[tableId].map[id],
          })
        }
      })
    })

    return results
  }

  aggregateByKey(tableId, key, value) {
    const results = []

    this[tableId].list.forEach((id) => {
      const entity = this[tableId].map[id]

      if (entity[key] === value) {
        results.push(entity)
      }
    })

    return results
  }

  mapByKey(tableId, queryObj) {
    const results = {}

    this[tableId].list.forEach((id) => {
      const entity = this[tableId].map[id]

      let match = true
      Object.entries(queryObj).forEach(([key, value]) => {
        if (entity[key] !== value) {
          match = false
        }
      })

      if (match) {
        results[entity.property] = entity.value
      }
    })

    return results
  }

  countEntries(tableId) {
    if (!this.hasOwnProperty(tableId) || !this[tableId].map) {
      throw new Error(`Unable to count entries for invalid table ${tableId}`)
    }

    return this[tableId].list.length
  }
}

export default MemStore

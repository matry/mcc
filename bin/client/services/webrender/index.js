import { getBoundary } from './boundary'
import { resolveConstraints } from './constraints'

/*

PHASES

1. LOAD_PHASE
  - load root space keys
  - load component space keys
  - load child space keys

2. INGEST_PHASE
  - load root space assignments
  - load component space assignments
  - load child space assignments

3. CALCULATE_PHASE
  - calculate root space values
  - calculate component space values
  - calculate child space assignments

4. RENDER_PHASE
  - retrieve render nodes
  - render

*/

const load = (table, width, height, mock_id) => {}

export default {
  load,
}

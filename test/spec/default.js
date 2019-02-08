import { equal, ok } from 'zoroaster/assert'
import Context from '../context'
import bundle from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof bundle, 'function')
  },
  async 'calls package without error'() {
    await bundle()
  },
  async 'gets a link to the fixture'({ FIXTURE }) {
    const res = await bundle({
      text: FIXTURE,
    })
    ok(res, FIXTURE)
  },
}

export default T
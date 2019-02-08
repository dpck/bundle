import { equal, ok } from 'zoroaster/assert'
import Context from '../context'
import bundle from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof bundle, 'function')
  },
}

export default T
import { makeTestSuite } from 'zoroaster'
import Context from '../context'
import bundle from '../../src'

const ts = makeTestSuite('test/result', {
  async getResults(input) {
    const res = await bundle({
      text: input,
    })
    return res
  },
  context: Context,
})

// export default ts

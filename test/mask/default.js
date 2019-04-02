import { deepEqual } from 'zoroaster'
import makeTestSuite from '@zoroaster/mask'
import BundleTransform from '../../src/lib/BundleTransform'
import generateTemp from '../../src'
import TempContext from 'temp-context'

export const bundleTransform = makeTestSuite('test/result/BundleTransform.jsx', {
  getTransform() {
    const bt = new BundleTransform('test/fixture/bundle.js', 'temp-test')
    return bt
  },
})

export const GenerateTemp = makeTestSuite('test/result/generate-temp.jsx', {
  context: TempContext,
  /**
   * @param {string} input
   * @param {TempContext} tc
   */
  async getResults(input, { TEMP, snapshot }) {
    const list = await generateTemp(input, {
      tempDir: TEMP,
    })
    const s = await snapshot()
    return { list, snapshot: s }
  },
  mapActual({ snapshot }) { return snapshot },
  assertResults({ list }, { expectedList }) {
    deepEqual(list, expectedList)
  },
  jsonProps: ['expectedList'],
})
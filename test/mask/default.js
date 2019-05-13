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
   * @param {TempContext} tc
   */
  async getResults({ TEMP, snapshot }) {
    await generateTemp(this.input, {
      tempDir: TEMP,
    })
    return await snapshot()
  },
})
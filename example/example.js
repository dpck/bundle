/* yarn example/ */
import bundle from '../src'

(async () => {
  const res = await bundle({
    text: 'example',
  })
  console.log(res)
})()
// generates a temp file
test/fixture/index.jsx

/* expected */
# test/fixture/index.jsx

import { render } from '../../../../node_modules/preact/dist/preact.mjs'
const App = ({ test }) =>  h('div',{},test)
render(h(App,{test:"OK"}), document.body)
/**/

/* expectedList */
[
  "test/temp/test/fixture/index.jsx",
  "node_modules/preact/dist/preact.mjs"
]
/**/

// transpiles the node_module with JSX
test/fixture/dep.jsx

/* expected */
# test/fixture/dep.jsx

import { render } from '../../../../node_modules/preact/dist/preact.mjs'
import { Test } from '../../../../node_modules/@idio/preact-fixture/src/index.js'
const App = ({ test }) => h('div',{},`
  `,h(Test,{},test),`
`)
render(h(App,{test:"OK"}), document.body)
/**/

/* expectedList */
[
  "test/temp/test/fixture/dep.jsx",
  "node_modules/preact/dist/preact.mjs",
  "node_modules/@idio/preact-fixture/src/index.js",
  "node_modules/@idio/preact-fixture/src/Test.js"
]
/**/
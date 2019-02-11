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

// works with the scoped node_module
test/fixture/dep.jsx

/* expected */
# test/fixture/dep.jsx

import { render } from '../../../../node_modules/preact/dist/preact.mjs'
import { Test } from '../../../../node_modules/@idio/preact-fixture/src/index.js'
const App = ({ test }) =>   h('div',{},
  h(Test,{},test),
)
render(h(App,{test:"OK"}), document.body)
/**/

/* expectedList */
[
  "test/temp/test/fixture/dep.jsx",
  "node_modules/preact/dist/preact.mjs",
  "node_modules/@idio/preact-fixture/src/index.js",
  "node_modules/preact/package.json",
  "node_modules/@idio/preact-fixture/src/Test.jsx"
]
/**/

// detects all dependencies in node_modules
test/fixture/nested.jsx

/* expected */
# test/fixture/nested.jsx

import { render } from '../../../../node_modules/preact/dist/preact.mjs'
import { Test } from '../../../../node_modules/@idio/preact-fixture/src/index.js'
import Fixture, { Component3 } from '../../../../node_modules/@depack/fixture/build/index.js'
const App = ({ test }) =>          h('div',{},
  h(Component3,{},
    h(Test,{},test),
    h(Fixture),
  ),
)
render(h(App,{test:"OK"}), document.body)
/**/

/* expectedList */
[
  "test/temp/test/fixture/nested.jsx",
  "node_modules/preact/dist/preact.mjs",
  "node_modules/@idio/preact-fixture/src/index.js",
  "node_modules/@depack/fixture/build/index.js",
  "node_modules/preact/package.json",
  "node_modules/@idio/preact-fixture/src/Test.jsx",
  "node_modules/@idio/preact-fixture/package.json",
  "node_modules/@depack/fixture/build/Component.js",
  "node_modules/@depack/fixture/build/Test2.js",
  "node_modules/@depack/fixture/build/Test.js"
]
/**/
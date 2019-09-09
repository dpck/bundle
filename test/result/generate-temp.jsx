// generates a temp file
test/fixture/index.jsx

/* expected */
# test/fixture/index.jsx

import { render } from 'preact'
const App = ({ test }) =>  h('div',{},test)
render(h(App,{test:"OK"}), document.body)
/**/

// works with the scoped node_module
test/fixture/dep.jsx

/* expected */
# test/fixture/dep.jsx

import { render } from 'preact'
import { Test } from '@idio/preact-fixture'
const App = ({ test }) =>   h('div',{},
  h(Test,{},test),
)
render(h(App,{test:"OK"}), document.body)
/**/

// detects all dependencies in node_modules
test/fixture/nested.jsx

/* expected */
# test/fixture/nested.jsx

import { render } from 'preact'
import { Test } from '@idio/preact-fixture'
import Fixture, { Component3 } from '@depack/fixture'
const App = ({ test }) =>          h('div',{},
  h(Component3,{},
    h(Test,{},test),
    h(Fixture),
  ),
)
render(h(App,{test:"OK"}), document.body)
/**/

// updates css files
test/fixture/css.jsx

/* expected */
# test/fixture/css.jsx

import './style.css'

# test/fixture/style.css.js

import injectStyle from 'depack/inject-css'

injectStyle(`body {
  background: green;
}`)
/**/

// transforms anon imports
test/fixture/anon.jsx

/* expected */
# test/fixture/anon.jsx

import './test.jsx'
import "./test.jsx"

# test/fixture/test.jsx

console.log('hello world jsx')
/**/
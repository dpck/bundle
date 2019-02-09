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
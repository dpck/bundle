import { render } from 'preact'
import { Test } from '@idio/preact-fixture'
const App = ({ test }) => <div>
  <Test>{test}</Test>
</div>
render(<App test="OK"/>, document.body)
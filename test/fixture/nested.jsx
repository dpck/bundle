import { render } from 'preact'
import { Test } from '@idio/preact-fixture'
import Fixture, { Component3 } from '@depack/fixture'
const App = ({ test }) => <div>
  <Component3>
    <Test>{test}</Test>
    <Fixture />
  </Component3>
</div>
render(<App test="OK"/>, document.body)
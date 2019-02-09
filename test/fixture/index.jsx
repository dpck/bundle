import { render } from 'preact'
const App = ({ test }) => <div>{test}</div>
render(<App test="OK"/>, document.body)
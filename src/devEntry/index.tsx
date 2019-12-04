import * as React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { render } from 'react-dom'
import { Header, Footer } from './components'
import { pages } from './pages'
import './index.scss'

const App = () => {
  return (
    <Router>
      <Header data={pages} />
      <main className='dev-main'>
        <Switch>
          {pages.map(({ name, view }, index) => (
            <Route key={index} path={`/${name}`} component={view} />
          ))}
        </Switch>
      </main>
      <Footer />
    </Router>
  )
}

render(<App />, document.getElementById('root'))

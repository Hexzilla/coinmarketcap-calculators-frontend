import React, { lazy } from 'react'
import { Router, Redirect, Route, Switch } from 'react-router-dom'
import history from './routerHistory'
import Menu from './components/Menu'
import Calculator from "./views/Calculator"
import Signup from "./views/Signup"

const Home = lazy(() => import('./views/Home'))

function App() {
  return (
    <Router history={history}>
      <Menu>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/calculator">
            <Calculator />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
        </Switch>
      </Menu>
    </Router>
  );
}

export default App;

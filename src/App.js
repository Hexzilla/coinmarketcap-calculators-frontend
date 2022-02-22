import React, { lazy } from 'react'
import { Router, Redirect, Route, Switch } from 'react-router-dom'
import history from './routerHistory'
import Menu from './components/Menu'
import Calculator from "./views/Calculator"
import Login from "./views/Login"
import Signup from "./views/Signup"

const Home = lazy(() => import('./views/Home'))

function App() {
  return (
    <Router history={history}>
        <Switch>
          <Route path="/" exact>
            <Calculator />
          </Route>
          <Route path="/calculator">
            <Calculator />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Signup />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;

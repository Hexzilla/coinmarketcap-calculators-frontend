//import React, { lazy } from 'react'
import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import './App.scss'
import history from './routerHistory'
import Menu from './components/Menu'
import Calculator from "./views/Calculator"
import ProfitLoss from "./views/ProfitLoss"
import Login from "./views/Login"
import Signup from "./views/Signup"
import ProfitCalculator from 'views/Profit'

//const Home = lazy(() => import('./views/Home'))

function App() {
  return (
    <Router history={history}>
      <Menu>
        <Switch>
          <Route path="/" exact>
            <Calculator />
          </Route>
          <Route path="/cryptocurrency">
            <Calculator />
          </Route>
          <Route path="/profit-loss-calculator">
            <ProfitLoss />
          </Route>
          <Route path="/crypto-profit-calculator">
            <ProfitCalculator />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Signup />
          </Route>
        </Switch>
      </Menu>
    </Router>
  );
}

export default App;

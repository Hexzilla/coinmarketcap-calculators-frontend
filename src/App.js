//import React, { lazy } from 'react'
import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
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
    <HashRouter history={history}>
      <Menu>
        <Switch>
          <Route path="/" exact>
            <Calculator />
          </Route>
          <Route path="/cryptocurrencyconversioncalculator">
            <Calculator />
          </Route>
          <Route path="/profitlosscalculator">
            <ProfitLoss />
          </Route>
          <Route path="/cryptoprofitcalculator">
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
    </HashRouter>
  );
}

export default App;

//import React, { lazy } from 'react'
import React, { useEffect } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import './App.scss'
import history from './routerHistory'
import Menu from './components/Menu'
import Calculator from "./views/Calculator"
import ProfitLoss from "./views/ProfitLoss"
import ProfitCalculator from 'views/Profit'
import Subscription from 'views/Subscription'
import Billing from 'views/Billing/Billing'
import Login from "./views/Login"
import Signup from "./views/Signup"
import { useDispatch, useSelector } from 'react-redux'
import { alertActions } from '_actions'
import { Redirect } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

function App() {
  const alert = useSelector(state => state.alert);
  const dispatch = useDispatch();
  const user = useSelector(state => state.authentication.user);

  useEffect(() => {
    history.listen((location, action) => {
      dispatch(alertActions.clear());
    });
  }, []);

  return (
    <Router history={history}>
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
          <Route path="/pricing">
            <Subscription/>
          </Route>
          <Route path="/billing">
            <Billing/>
          </Route>
        </Switch>
      </Menu>
    </Router>
  );
}

/*function App() {
  return (
    <Router history={history}>
      <Menu>
        <Switch>
          <Route path="/" exact>
            <Subscription />
          </Route>
          <Route path="/cryptocurrencyconversioncalculator">
            <Calculator />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Signup />
          </Route>
          <Route path="/subscription">
            <Subscription/>
          </Route>
        </Switch>
      </Menu>
    </Router>
  );
}*/

export default App;

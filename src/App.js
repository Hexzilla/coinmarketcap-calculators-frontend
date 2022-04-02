//import React, { lazy } from 'react'
import React, { useEffect } from 'react'
import { Router, Route, Switch, Redirect, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { alertActions } from 'actions'
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

function RequireAuth({ children }) {
  const user = useSelector(state => state.authentication.user);

  if (!user?.access_token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}


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
            <RequireAuth>
              <Calculator />
            </RequireAuth>
          </Route>
          <Route path="/cryptocurrencyconversioncalculator">
            <RequireAuth>
              <Calculator />
            </RequireAuth>
          </Route>
          <Route path="/profitlosscalculator">
            <RequireAuth>
              <ProfitLoss />
            </RequireAuth>
          </Route>
          <Route path="/cryptoprofitcalculator">
            <RequireAuth>
              <ProfitCalculator />
            </RequireAuth>
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

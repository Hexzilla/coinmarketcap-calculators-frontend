import React from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import {  useSelector } from 'react-redux'
import './App.less'
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
    return <Redirect to="/login" />;
  }

  return children;
}

function App() {
  /*const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location, action) => {
      dispatch(alertActions.clear());
    });
  }, []);*/

  return (
    <HashRouter history={history}>
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
    </HashRouter>
  );
}

export default App;

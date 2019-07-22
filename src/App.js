import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import EmployeeLogin from './components/EmployeeLogin';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import Allocateproject from './components/Allocateproject';
import Adminaccess from './components/Adminaccess';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={EmployeeLogin} />
        <Route
          exact
          path="/Adminaccess"
          render={routeProps => <Adminaccess {...routeProps} />}
        />
      </Switch>
    </Router>
  );
}

export default App;

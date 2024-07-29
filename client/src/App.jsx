import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FoundItems from './pages/User/FoundItems';
import Claims from './pages/Admin/Claims';

const App = () => (
  <Router>
    <Switch>
      <Route path="/admin/claims" component={Claims} />
      <Route path="/user/found-items" component={FoundItems} />
    </Switch>
  </Router>
);

export default App;

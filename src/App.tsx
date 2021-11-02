import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import CriteriaSelection from './components/CriteriaSelection';
import Weights from './components/Weights';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path='/' exact component={Dashboard} />
          <Route path='/prestudy' component={CriteriaSelection} />
          <Route path='/weights' component={Weights} />
          <Redirect to='/' />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

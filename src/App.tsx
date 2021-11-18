import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import CriteriaSelection from './components/CriteriaSelection';
import Weights from './components/Weights';
import Statistics from './components/Statistics';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path='/' exact component={Dashboard} />
          <Route path='/prestudy' component={CriteriaSelection} />
          <Route path='/weights' component={Weights} />
          <Route path='/statistics' component={Statistics} />
          <Redirect to='/' />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

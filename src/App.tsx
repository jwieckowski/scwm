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
          <Route path='/scwm' exact component={Dashboard} />
          <Route path='/scwm/prestudy' component={CriteriaSelection} />
          <Route path='/scwm/weights' component={Weights} />
          <Route path='/scwm/statistics' component={Statistics} />
          <Redirect to='/scwm' />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Lending from './components/layout/Lending';
import MedicinesByAlphabet from './components/layout/MedicinesByAlphabet';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
//Redux
import {Provider} from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivteRoute';

import './App.css';
import News from './components/layout/News';
import Contacts from './components/layout/Contacts';

if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
  <Provider store={store}>
    <Router>
        <div>
          <Navbar/>
              <Alert/>
              <Switch>
              <Route exact path="/" component={Lending}/>
              <Route exact path="/alphabet" component={MedicinesByAlphabet}/>
              <Route exact path="/news" component={News}/>
              <Route exact path="/contacts" component={Contacts}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/register" component={Register}/>
              <PrivateRoute exact path="/dashboard" component={Dashboard}/>
            </Switch>
        </div>
    </Router>
  </Provider>
)};

export default App;
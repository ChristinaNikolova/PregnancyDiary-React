import { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import * as authService from './services/authService.js'

import Home from './components/Home/Home.jsx';
import Header from './components/shared/Header/Header.jsx';
import Footer from './components/shared/Footer/Footer.jsx';

import Register from './components/Auth/Register/Register.jsx';
import Login from './components/Auth/Login/Login.jsx';

import './App.css';

function App() {
  const [hasToReload, setHasToReload] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsLoggedIn(authService.isAuthenticated());
    setIsAdmin(authService.isAdmin());
    setHasToReload(false);
  }, [hasToReload]);

  const reload = () => {
    setHasToReload(true);
  }

  return (
    <div className="app">
      <Header isLoggedIn={isLoggedIn} isAdmin={isAdmin} clickHandler={reload} />
      <Switch>
        <Route path='/' exact>
          <Redirect to='/home'></Redirect>
        </Route>
        <Route path='/home' render={() => <Home isLoggedIn={isLoggedIn} />}></Route>

        <Route path='/register' component={Register}></Route>
        <Route path='/login' render={() => <Login clickHandler={reload} />}></Route>
      </Switch>
      <Footer />
    </div >
  );
}

export default App;

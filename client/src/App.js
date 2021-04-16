import { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import * as authService from './services/authService.js'

import Home from './components/Home/Home.jsx';
import Header from './components/shared/Header/Header.jsx';
import Footer from './components/shared/Footer/Footer.jsx';

import Register from './components/Auth/Register/Register.jsx';
import Login from './components/Auth/Login/Login.jsx';

import ArticlesList from './components/Blog/ArticlesList/ArticlesList.jsx';
import ArticleDetails from './components/Blog/ArticleDetails/ArticleDetails.jsx';
import ByCategory from './components/Blog/ByCategory/ByCategory.jsx';
import FavouriteArticles from './components/User/FavouriteArticles/FavouriteArticles.jsx';

import Dashboard from './components/Administration/Dashboard/Dashboard.jsx'
import CreateCategory from './components/Administration/Category/CreateCategory/CreateCategory.jsx';
import AllCategories from './components/Administration/Category/AllCategories/AllCategories.jsx';

import NotFound from './components/shared/NotFound/NotFound.jsx';

import './App.css';
import UpdateCategory from './components/Administration/Category/UpdateCategory/UpdateCategory.jsx';

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

        <Route path='/articles' exact component={ArticlesList}></Route>
        <Route path='/articles/by-category/:id' exact component={ByCategory}></Route>
        <Route path='/articles/current-article/:id' exact component={ArticleDetails}></Route>

        <Route path='/user/favourite-articles' component={FavouriteArticles}></Route>

        <Route path='/admin/dashboard' component={Dashboard}></Route>
        <Route path="/admin/categories" exact component={AllCategories}></Route>
        <Route path="/admin/categories/create" component={CreateCategory}></Route>
        <Route path="/admin/categories/update/:id" component={UpdateCategory}></Route>
        <Route path="*" component={NotFound}></Route>
      </Switch>
      <Footer />
    </div >
  );
}

export default App;

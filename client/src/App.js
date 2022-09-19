import { useState, useEffect, lazy, Suspense } from 'react';
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

import CreateDiary from './components/Diary/CreateDiary/CreateDiary.jsx';
import SeeDiary from './components/Diary/SeeDiary/SeeDiary.jsx';
import UpdateDiary from './components/Diary/UpdateDiary/UpdateDiary.jsx';

import UpdateBaby from './components/Baby/UpdateBaby/UpdateBaby.jsx';
import CreateBaby from './components/Baby/CreateBaby/CreateBaby.jsx';

import AddWeek from './components/Week/AddWeek/AddWeek.jsx';
import UpdateWeek from './components/Week/UpdateWeek/UpdateWeek.jsx';
import SeeWeek from './components/Week/SeeWeek/SeeWeek.jsx';

import CreateMemory from './components/Memory/CreateMemory/CreateMemory.jsx';
import UpdateMemory from './components/Memory/UpdateMemory/UpdateMemory.jsx';

import UserDiariesList from './components/User/UserDiariesList/UserDiariesList.jsx';
import FavouriteArticles from './components/User/FavouriteArticles/FavouriteArticles.jsx';

import NotFound from './components/shared/NotFound/NotFound.jsx';

import './App.css';

const Dashboard = lazy(() => import('./components/Administration/Dashboard/Dashboard.jsx'));

const CreateCategory = lazy(() => import('./components/Administration/Category/CreateCategory/CreateCategory.jsx'));
const AllCategories = lazy(() => import('./components/Administration/Category/AllCategories/AllCategories.jsx'));
const UpdateCategory = lazy(() => import('./components/Administration/Category/UpdateCategory/UpdateCategory.jsx'));

const AllArticles = lazy(() => import('./components/Administration/Article/AllArticles/AllArticles.jsx'));
const CreateArticle = lazy(() => import('./components/Administration/Article/CreateArticle/CreateArticle.jsx'));
const UpdateArticle = lazy(() => import('./components/Administration/Article/UpdateArticle/UpdateArticle.jsx'));

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

        <Route path='/diary/create' component={CreateDiary}></Route>
        <Route path='/diary/see/:id' component={SeeDiary}></Route>
        <Route path='/diary/update/:id' component={UpdateDiary}></Route>

        <Route path='/diary/week/add/:id' exact component={AddWeek}></Route>
        <Route path='/diary/week/update/:id' exact component={UpdateWeek}></Route>
        <Route path='/diary/week/see/:id' exact component={SeeWeek}></Route>

        <Route path='/diary/baby/create/:id' exact component={CreateBaby}></Route>
        <Route path='/diary/baby/update/:babyId/:diaryId' exact component={UpdateBaby}></Route>

        <Route path='/week/memory/create/:id' exact component={CreateMemory}></Route>
        <Route path='/week/memory/update/:id' exact component={UpdateMemory}></Route>

        <Route path='/user/diaries' exact component={UserDiariesList}></Route>
        <Route path='/user/favourite-articles' component={FavouriteArticles}></Route>

        <Route
          path='/admin/dashboard'
          render={() => (
            <Suspense fallback={<span>Loading...</span>}>
              <Dashboard />
            </Suspense>
          )}
        ></Route>

        <Route
          path="/admin/categories"
          exact
          render={() => (
            <Suspense fallback={<span>Loading...</span>}>
              <AllCategories />
            </Suspense>
          )}
        ></Route>

        <Route
          path="/admin/categories/create"
          render={(props) => (
            <Suspense fallback={<span>Loading...</span>}>
              <CreateCategory {...props} />
            </Suspense>
          )}
        ></Route>

        <Route
          path="/admin/categories/update/:id"
          render={(props) => (
            <Suspense fallback={<span>Loading...</span>}>
              <UpdateCategory {...props} />
            </Suspense>
          )}
        ></Route>

        <Route
          path="/admin/articles"
          exact
          render={() => (
            <Suspense fallback={<span>Loading...</span>}>
              <AllArticles />
            </Suspense>
          )}
        ></Route>

        <Route
          path="/admin/articles/create"
          render={(props) => (
            <Suspense fallback={<span>Loading...</span>}>
              <CreateArticle {...props} />
            </Suspense>
          )}
        ></Route>

        <Route
          path="/admin/articles/update/:id"
          render={(props) => (
            <Suspense fallback={<span>Loading...</span>}>
              <UpdateArticle {...props} />
            </Suspense>
          )}
        ></Route>

        <Route path="*" component={NotFound}></Route>
      </Switch>
      <Footer />
    </div >
  );
}

export default App;

import { lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext.js';

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
import PrivateRoute from './components/common/PrivateRoute.jsx';
import AdminRoute from './components/common/AdminRoute.jsx';
import GuestRoute from './components/common/GuestRoute.jsx';

import './App.css';

const Dashboard = lazy(() => import('./components/Administration/Dashboard/Dashboard.jsx'));

const CreateCategory = lazy(() => import('./components/Administration/Category/CreateCategory/CreateCategory.jsx'));
const AllCategories = lazy(() => import('./components/Administration/Category/AllCategories/AllCategories.jsx'));
const UpdateCategory = lazy(() => import('./components/Administration/Category/UpdateCategory/UpdateCategory.jsx'));

const AllArticles = lazy(() => import('./components/Administration/Article/AllArticles/AllArticles.jsx'));
const CreateArticle = lazy(() => import('./components/Administration/Article/CreateArticle/CreateArticle.jsx'));
const UpdateArticle = lazy(() => import('./components/Administration/Article/UpdateArticle/UpdateArticle.jsx'));

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Header />
        <Switch>
          <Route path='/' exact>
            <Redirect to='/home'></Redirect>
          </Route>
          <Route path='/home' component={Home}></Route>

          <Route
            path='/register'
            render={(props) => (
              <GuestRoute>
                <Register {...props} />
              </GuestRoute>
            )}></Route>

          <Route
            path='/login'
            render={(props) => (
              <GuestRoute>
                <Login {...props} />
              </GuestRoute>
            )}></Route>

          <Route path='/articles' exact component={ArticlesList}></Route>
          <Route path='/articles/by-category/:id' exact component={ByCategory}></Route>

          <Route
            path='/articles/current-article/:id'
            exact
            render={(props) => (
              <PrivateRoute>
                <ArticleDetails {...props} />
              </PrivateRoute>
            )}></Route>

          <Route
            path='/diary/create'
            render={(props) => (
              <PrivateRoute>
                <CreateDiary {...props} />
              </PrivateRoute>
            )}></Route>

          <Route
            path='/diary/see/:id'
            render={(props) => (
              <PrivateRoute>
                <SeeDiary {...props} />
              </PrivateRoute>
            )}></Route>

          <Route
            path='/diary/update/:id'
            render={(props) => (
              <PrivateRoute>
                <UpdateDiary {...props} />
              </PrivateRoute>
            )}></Route>

          <Route
            path='/diary/week/add/:id'
            exact
            render={(props) => (
              <PrivateRoute>
                <AddWeek {...props} />
              </PrivateRoute>
            )}></Route>

          <Route
            path='/diary/week/update/:id'
            exact
            render={(props) => (
              <PrivateRoute>
                <UpdateWeek {...props} />
              </PrivateRoute>
            )}></Route>

          <Route
            path='/diary/week/see/:id'
            exact
            render={(props) => (
              <PrivateRoute>
                <SeeWeek {...props} />
              </PrivateRoute>
            )}></Route>

          <Route
            path='/diary/baby/create/:id'
            exact
            render={(props) => (
              <PrivateRoute>
                <CreateBaby {...props} />
              </PrivateRoute>
            )}></Route>

          <Route
            path='/diary/baby/update/:babyId/:diaryId'
            exact
            render={(props) => (
              <PrivateRoute>
                <UpdateBaby {...props} />
              </PrivateRoute>
            )}></Route>

          <Route
            path='/week/memory/create/:id'
            exact
            render={(props) => (
              <PrivateRoute>
                <CreateMemory {...props} />
              </PrivateRoute>
            )}></Route>

          <Route
            path='/week/memory/update/:id'
            exact
            render={(props) => (
              <PrivateRoute>
                <UpdateMemory {...props} />
              </PrivateRoute>
            )}></Route>

          <Route
            path='/user/diaries'
            exact
            render={() => (
              <PrivateRoute>
                <UserDiariesList />
              </PrivateRoute>
            )}></Route>

          <Route
            path='/user/favourite-articles'
            render={() => (
              <PrivateRoute>
                <FavouriteArticles />
              </PrivateRoute>
            )}></Route>

          <Route
            path='/admin/dashboard'
            render={() => (
              <Suspense fallback={<span>Loading...</span>}>
                <AdminRoute>
                  <Dashboard />
                </AdminRoute>
              </Suspense>
            )}
          ></Route>

          <Route
            path="/admin/categories"
            exact
            render={() => (
              <Suspense fallback={<span>Loading...</span>}>
                <AdminRoute>
                  <AllCategories />
                </AdminRoute>
              </Suspense>
            )}
          ></Route>

          <Route
            path="/admin/categories/create"
            render={(props) => (
              <Suspense fallback={<span>Loading...</span>}>
                <AdminRoute>
                  <CreateCategory {...props} />
                </AdminRoute>
              </Suspense>
            )}
          ></Route>

          <Route
            path="/admin/categories/update/:id"
            render={(props) => (
              <Suspense fallback={<span>Loading...</span>}>
                <AdminRoute>
                  <UpdateCategory {...props} />
                </AdminRoute>
              </Suspense>
            )}
          ></Route>

          <Route
            path="/admin/articles"
            exact
            render={() => (
              <Suspense fallback={<span>Loading...</span>}>
                <AdminRoute>
                  <AllArticles />
                </AdminRoute>
              </Suspense>
            )}
          ></Route>

          <Route
            path="/admin/articles/create"
            render={(props) => (
              <Suspense fallback={<span>Loading...</span>}>
                <AdminRoute>
                  <CreateArticle {...props} />
                </AdminRoute>
              </Suspense>
            )}
          ></Route>

          <Route
            path="/admin/articles/update/:id"
            render={(props) => (
              <Suspense fallback={<span>Loading...</span>}>
                <AdminRoute>
                  <UpdateArticle {...props} />
                </AdminRoute>
              </Suspense>
            )}
          ></Route>

          <Route path="*" component={NotFound}></Route>
        </Switch>
        <Footer />
      </div >
    </AuthProvider >
  );
}

export default App;

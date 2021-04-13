import { Route, Switch, Redirect } from 'react-router-dom';

import Home from './components/Home/Home.jsx';
import Register from './components/Auth/Register/Register.jsx';
import Login from './components/Auth/Login/Login.jsx';

import './App.css';

function App() {
  return (
    <div className="app">
      <Switch>
        <Route path='/' exact>
          <Redirect to='/home'></Redirect>
        </Route>
        <Route path='/home' component={Home}></Route>

        <Route path='/register' component={Register}></Route>
        <Route path='/login' component={Login}></Route>

      </Switch>
    </div >
  );
}

export default App;

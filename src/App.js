import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import SinglePost from './Pages/SinglePost';
import AuthDashboard from './Pages/AuthDashboard';
import Default from './Pages/Default';
import Invalid from './Pages/Invalid';
import SearchJobs from './Pages/SearchJobs';
import store from './redux/store';
import { Provider } from 'react-redux';
import axios from 'axios';
import {SET_AUTHENTICATED} from './redux/types';
import jwtDecode from 'jwt-decode';
import {logoutUser} from './redux/actions/userAction';
import AuthRoute from './util/AuthRoute'; 

axios.defaults.baseURL = "your_public_endpoint";

const token = localStorage.getItem('jwt-auth');
if(token){
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp * 1000 < Date.now()){
    store.dispatch(logoutUser());
    window.location.href = '/';
  }
  else{
    store.dispatch({type: SET_AUTHENTICATED});
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
}


function App() {
  return (
    <Provider store = {store}>
    <BrowserRouter>
        <div className="App">
          <Switch>
            <AuthRoute exact path='/' component={Default} />
            <Route exact path='/home' component={AuthDashboard} />
            <AuthRoute exact path='/login' component={Login} />
            <AuthRoute exact path='/signup' component={Signup} />
            <Route exact path='/jobs/:jobid' component={SinglePost}/>
            <Route exact path='/search/:key' component={SearchJobs}/>
            <Route exact path='/:invalid' component={Invalid}/>
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

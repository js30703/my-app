
import React from 'react'
import Jamo from '../jamo/Jamo';
import Login from '../auth/login';
import Signup from '../auth/Signup';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Myverbs from '../Myverb/Myverbs';
import Post from '../Post/Post'
import Home from '../Home/Home'
import Reset from '../auth/reset';

export default function Routes() {


   return (
      <BrowserRouter>
      
        <Switch>
          <Route exact path='/' component={Jamo}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/signup' component={Signup}/>
          <Route exact path='/myverbs' component={Myverbs}/>
          <Route exact path='/reset' component={Reset}/>
          {/* <Route exact path='/' component={Home}/> */}
          {/* <Route exact path='/posts' component={Post}/> */}

        </Switch>      
      </BrowserRouter>

  );
}




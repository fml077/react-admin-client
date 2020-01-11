import React, { Component } from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from './pages/login'
import Admin from './pages/admin'
import './index.css';
export default class App extends Component {
  render() {
    return (
       <div style={{height: '100%'}}>
         <BrowserRouter>
          <Switch> {/* 只匹配其中一个 */}
            <Route path='/login' component={Login}></Route>
            <Route path='/' component={Admin}></Route>
          </Switch>
         </BrowserRouter>
       </div>
    );
  }
}
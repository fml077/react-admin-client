import React, { Component } from 'react'
import LoginForm from './components/login-form/index'
import './index.less'
export default class Login extends Component {
  render() {
    return (
      <div className="login-page">
        <div className="login-content">
          <LoginForm></LoginForm>
        </div>
      </div>
    )
  }
}


import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import memoryUtil from '../../utils/memoryUtil'
export default class Admin extends Component {
  render() {
    const user = memoryUtil.user;
    console.log(99,user);
    
    // 如果内存中没有存储user 当前没登录，要跳转到登录页
    if (!user || !user.username) {
      // 自动跳转到登录页（render中使用Redirect标签跳转页面）
      return <Redirect to="/login" />
    }
    return (
      <div>
        这是admin首页，欢迎{user.username}
      </div>
    )
  }
}
import React, { Component } from 'react'
import './index.less' 
export default class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎 admin</span> <a href="">退出</a>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">
            <span>首页</span> 
          </div>
          <div className="header-bottom-right">
            <span>2019-12-12 20:23:22</span>
            <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3778734548,115006230&fm=26&gp=0.jpg" alt="" srcset=""/>
            <span>晴</span>
          </div>
        </div>
      </div>
    )
  }
}

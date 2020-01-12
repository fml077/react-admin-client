import React, { Component } from 'react'
import { formateDate } from "../../utils/dateUtils";
import memoryUtil from "../../utils/memoryUtil";

import './index.less' 
export default class Header extends Component {
  state = {
    time: formateDate(Date.now()),
    dayPicture: '', // 天气图片
    weather: '' //天气情况
  }
  getCurrentTime =() => {
    setInterval(() => {
      const time = formateDate(Date.now())
      this.setState({ time })
    }, 1000);
  }
  /* 
  第一次render()之后执行一次
  一般在此执行异步请求：发ajax请求/启动定时器
   */
  componentDidMount() {
    this.getCurrentTime()
  }
  render() {
   const { time, dayPicture, weather } = this.state;
   const user = memoryUtil.user.username
    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎 {user}</span> <a href="">退出</a>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">
            <span>首页</span> 
          </div>
          <div className="header-bottom-right">
            <span>{time}</span>
            {/* <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3778734548,115006230&fm=26&gp=0.jpg" alt="" srcset=""/> */}
            <img src={dayPicture} alt="" srcset=""/>
            <span>{weather}</span>
          </div>
        </div>
      </div>
    )
  }
}

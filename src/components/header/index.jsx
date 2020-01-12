import React, { Component } from 'react'
// import { withRouter } from 'react-router-dom'
import { withRouter } from 'react-router-dom';
import { formateDate } from "../../utils/dateUtils";
import menuList from "../../config/menuConfig";
import memoryUtil from "../../utils/memoryUtil";

import './index.less' 
class Header extends Component {
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
  getTitle = () => {
    // 得到当前页面请求路径
    const path = this.props.location.pathname;
    let title;
    menuList.forEach(item => {
      // 无children的一级菜单
      if (item.key === path) {
        title = item.title
      } else if (item.children) {
        // 有children的二级菜单,在所有子item中查找匹配的路径
        const cItem =  item.children.find(cItem => 
          cItem.key === path
        )
        // 如果有值取出title
        if (cItem) {
          title = cItem.title
        }
      }
    })
    return title;
  }
  /* 
  第一次render()之后执行一次
  一般在此执行异步请求：发ajax请求/启动定时器
   */
  componentDidMount() {
    this.getCurrentTime();
  }
  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  componentWillMount() {
    
  }
  render() {
   const { time, dayPicture, weather } = this.state;
  //  得到当前页面title
   const title = this.getTitle()
   const user = memoryUtil.user.username
    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎 {user}</span> <a href="">退出</a>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">
            <span>{title}</span> 
          </div>
          <div className="header-bottom-right">
            <span>{time}</span>
            {/* <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3778734548,115006230&fm=26&gp=0.jpg" alt="" srcset=""/> */}
            {/* todo-没有天气接口，暂时不做 */}
            <img src={dayPicture} alt="" srcSet=""/>
            <span>{weather}</span>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(Header)

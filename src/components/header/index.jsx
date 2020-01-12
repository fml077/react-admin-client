import React, { Component } from 'react'
import { Modal } from 'antd'
import { withRouter } from 'react-router-dom';
import { formateDate } from "../../utils/dateUtils";
import menuList from "../../config/menuConfig";
import memoryUtil from "../../utils/memoryUtil";
import storageUtil from "../../utils/storageUtil";

import './index.less' 
const { confirm } = Modal;

class Header extends Component {
  state = {
    time: formateDate(Date.now()),
    dayPicture: '', // 天气图片
    weather: '' //天气情况
  }
  getCurrentTime =() => {
    this.intervalId = setInterval(() => {
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
  退出登录确认框 */
  logout =() => {
    // const { confirm } = Modal;
    confirm({
      title: '确定要退出登录吗？',
      onOk: () => {
        // 删除保存的用户登录数据，从内存、local都要删除
        storageUtil.removeUser()
        memoryUtil.user = {}
        // 跳转到登录页面
        this.props.history.replace('/login')
      }
    });
  }
  /* 
  第一次render()之后执行一次
  一般在此执行异步请求：发ajax请求/启动定时器
   */
  componentDidMount() {
    this.getCurrentTime();
  }
  /* 
  页面卸载时调用 */
  componentWillUnmount() {
    // 清除时间更新定时器
    clearInterval(this.intervalId)
  }
  render() {
   const { time, dayPicture, weather } = this.state;
  //  得到当前页面title
   const title = this.getTitle()
   const user = memoryUtil.user.username
    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎 {user}</span> <a onClick={this.logout}>退出</a>
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

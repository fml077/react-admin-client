import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import logoImg from '../../assets/images/logo.png'
import { Menu, Icon } from 'antd';
import './index.less'
import menuList from '../../config/menuConfig'
const { SubMenu } = Menu;
class LeftNav extends Component {
  handleClick = e => {
    // console.log('click ', e);
  };
  // 动态生成菜单路由：方法一： map()加递归方法
  getMenuList = (menuList) => {
    return menuList.map((item, i) => {
      // 无children渲染Menu.Item
      if (!item.children) {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.link}><Icon type={item.icon} /> {item.title}</Link>
          </Menu.Item>
        )
      } else {
        // 有children渲染SubMenu
         // 得到当前请求的路由路径，默认高亮对应菜单
         const path = this.props.location.pathname
         // 查找与当前路径匹配的子item，如果存在将当前item展开
         const cItem = item.children.find((cItem) => cItem.key === path)
         // 展开菜单
         if (cItem) {
           this.openKey = item.key
         }
          return (
            <SubMenu key={item.key} title={<span><Icon type={item.icon} />{item.title}</span>} >
              {this.getMenuList(item.children)}
            </SubMenu>
          )
      }
    })
  }
  // 动态生成菜单路由：方法二： reduce()加递归方法
  getMenuList_reduce = (menuList) => {
    return menuList.reduce((pre, item) => {
      // 向pre添加Menu.Item
      if (!item.children) {
        pre.push((
          <Menu.Item key={item.key}>
            <Link to={item.link}><Icon type={item.icon} /> {item.title}</Link>
          </Menu.Item>
        ))
      } else {
        // 有children二级菜单，向pre添加SubMenu
         // 得到当前请求的路由路径，默认高亮对应菜单
        const path = this.props.location.pathname
        // 查找与当前路径匹配的子item，如果存在将当前item展开
        const cItem = item.children.find((cItem) => cItem.key === path)
        // 展开菜单
        if (cItem) {
          this.openKey = item.key
        }
        pre.push((
          <SubMenu key={item.key} title={<span><Icon type={item.icon} />{item.title}</span>} >
            {/* 递归调用 */}
            {this.getMenuList(item.children)}
          </SubMenu>
        ))
      }
      return pre;
    } , []) // 向空数组中添加pre
  }
  /* 
  componentWillMount在第一次render()之前执行一次
  为第一个render()准备数据（必须是同步的）
   */
  componentWillMount() {
    // 在此生命周期执行getMenuList方法可确保render时能取到this.openKey
    this.getMenuNode = this.getMenuList(menuList)
  }
  render() {
    // 得到当前请求的路由路径，默认高亮对应菜单
    const path = this.props.location.pathname
    const openKey = this.openKey
    return (
      <div className="left-nav">
        <Link to="/" className="left-nav-logo">
          <img src={logoImg} alt=""/>
          <span>智控后台</span>
        </Link>
        <Menu
        onClick={this.handleClick}
        style={{ width: 200 }}
        // defaultSelectedKeys={[path]}
        selectedKeys={[path]}
        defaultOpenKeys={[openKey]}
        mode="inline"
      >
        {this.getMenuNode}
      </Menu>
      </div>
    )
  }
}

/* withRouter高阶组件
包装非路由组件，返回一个新的组件
新的组件向非路由组件传递3个属性：history/location/match
*/
export default withRouter(LeftNav)

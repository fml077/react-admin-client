import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import logoImg from '../../assets/images/logo.png'
import { Menu, Icon } from 'antd';
import './index.less'
import menuList from '../../config/menuConfig'
const { SubMenu } = Menu;
export default class LeftNav extends Component {
  handleClick = e => {
    console.log('click ', e);
  };
  // 动态生成菜单路由：方法一： map()加递归方法
  getMenuList_map = (menuList) => {
    return menuList.map((item, i) => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.link}><Icon type={item.icon} /> {item.title}</Link>
          </Menu.Item>
        )
      } else {
          return (
            <SubMenu key={item.key} title={<span><Icon type={item.icon} />{item.title}</span>} >
              {this.getMenuList_map(item.children)}
            </SubMenu>
          )
      }
    })
  }
  // 动态生成菜单路由：方法二： reduce()加递归方法
  getMenuList = (menuList) => {
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
  render() {
    return (
      <div className="left-nav">
        <Link to="/" className="left-nav-logo">
          <img src={logoImg} alt=""/>
          <span>智控后台</span>
        </Link>
        <Menu
        onClick={this.handleClick}
        style={{ width: 200 }}
        // defaultSelectedKeys={['10']}
        // defaultOpenKeys={['sub1']}
        mode="inline"
      >
        {this.getMenuList(menuList)}
        {/* <Menu.Item key="0">
          <Link to="/home">
            <Icon type="home" />
            首页
          </Link>
        </Menu.Item>
        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="calendar" />
              <span>商品</span>
            </span>
          }
        >
          <Menu.ItemGroup key="g1" title="商品管理">
            <Menu.Item key="1">
              <Link to="/product">商品入库</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/product">商品出库</Link>
            </Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup key="g2" title="品类管理">
            <Menu.Item key="3">
              <Link to="/category">品类列表</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/category">品类库存</Link>
            </Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              <Icon type="user" />
              <span>用户&角色</span>
            </span>
          }
        >
          <Menu.Item key="5">
            <Link to="/role">角色管理</Link>
          </Menu.Item>
          <SubMenu key="sub3" title="用户管理">
            <Menu.Item key="6">
              <Link to="/role">新增用户</Link>
            </Menu.Item>
            <Menu.Item key="7">
              <Link to="/role">用户黑名单</Link>
            </Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu
          key="sub4"
          title={
            <span>
              <Icon type="setting" />
              <span>图表分析</span>
            </span>
          }
        >
          <Menu.Item key="8">
            <Link to="/pie">饼图</Link>
          </Menu.Item>
          <Menu.Item key="9">
            <Link to="/bar">柱状图</Link>
          </Menu.Item>
          <Menu.Item key="10">
            <Link to="/line">折线图</Link>
          </Menu.Item>
        </SubMenu> */}
      </Menu>
      </div>
    )
  }
}

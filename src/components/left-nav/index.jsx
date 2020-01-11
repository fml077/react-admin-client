import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import logoImg from '../../assets/images/logo.png'
import { Menu, Icon } from 'antd';
import './index.less'

const { SubMenu } = Menu;
export default class LeftNav extends Component {
  handleClick = e => {
    console.log('click ', e);
  };
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
        <Menu.Item key="0">
          <Icon type="home" />
          首页
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
            <Menu.Item key="1">商品入库</Menu.Item>
            <Menu.Item key="2">商品出库</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup key="g2" title="商品明细">
            <Menu.Item key="3">商品列表</Menu.Item>
            <Menu.Item key="4">商品库存</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              <Icon type="user" />
              <span>用户</span>
            </span>
          }
        >
          <Menu.Item key="5">角色管理</Menu.Item>
          <SubMenu key="sub3" title="用户管理">
            <Menu.Item key="6">新增用户</Menu.Item>
            <Menu.Item key="7">用户黑名单</Menu.Item>
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
          <Menu.Item key="8">饼图</Menu.Item>
          <Menu.Item key="9">柱状图</Menu.Item>
        </SubMenu>
      </Menu>
      </div>
    )
  }
}

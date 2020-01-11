import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Layout } from 'antd';
import memoryUtil from '../../utils/memoryUtil'
import Header from '../../components/header'
import LeftNav from '../../components/left-nav'

const { Footer, Sider, Content } = Layout;
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
      // <div>
      //   这是admin首页，欢迎{user.username}
      // </div>
      <Layout style={{height: '100%'}}>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header />
          <Content style={{backgroundColor: '#fff'}}>Content</Content>
          <Footer className="footer">©copyright 2020 made by xiaomei</Footer>
        </Layout>
      </Layout>
    )
  }
}
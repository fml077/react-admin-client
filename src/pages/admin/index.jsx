import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Layout } from 'antd';
import memoryUtil from '../../utils/memoryUtil'
import Header from '../../components/header'
import LeftNav from '../../components/left-nav'
import { Switch, Route } from 'react-router-dom'
import Home  from '../home'
import Category  from '../category/category-list'
import Article  from '../category/article-list'
import User  from '../user'
import Role  from '../role'
import productCategory  from '../product/product-category'
import Product  from '../product/product-manage'
import Bar  from '../charts/bar'
import Line  from '../charts/line'
import Pie  from '../charts/pie'



const { Footer, Sider, Content } = Layout;
export default class Admin extends Component {
  render() {
    const user = memoryUtil.user;
    
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
          <Content style={{margin: '15px', backgroundColor: '#fff'}}>
            <Switch>
              <Route path="/home" component={Home}/>
              <Route path="/category" component={Category}/>
              <Route path="/article" component={Article}/>
              <Route path="/user" component={User}/>
              <Route path="/role" component={Role}/>
              <Route path="/productCategory" component={productCategory}/>
              <Route path="/product" component={Product}/>
              <Route path="/bar" component={Bar}/>
              <Route path="/line" component={Line}/>
              <Route path="/pie" component={Pie}/>
              {/* 如果前面路由都不匹配 用Redirect跳转到home */}
              <Redirect to="/home"/> 
            </Switch>
          </Content>
          <Footer className="footer">©copyright 2020 made by xiaomei</Footer>
        </Layout>
      </Layout>
    )
  }
}
import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import ProductDetail from './detail'
import ProductAdd from './add'
import ProductList from './home'
import ProductUpdate from './update'
export default class ProductManage extends Component {
  render() {
    return (
      <Switch>
        {/* exact完全匹配路由路径 */}
        <Route path="/product" exact component={ProductList}/>
        <Route path="/product/detail" component={ProductDetail}/>
        <Route path="/product/add" component={ProductAdd}/>
        <Route path="/product/update" component={ProductUpdate}/>
        {/* Redirect对匹配不到的路由(例如/product/xxx)重定向 */}
        <Redirect to="/product" />
      </Switch>
    )
  }
}

/* 
包含应用中所有接口请求函数的模块
每个函数的返回值都是promise
要能根据接口文档定义接口请求方法
*/
import ajax from './ajax'

// 登录接口
/* export function reqLogin(username, password) {
  return ajax('/login', {username, password}, 'POST')
} */
// 登录接口 es6写法
export const reqLogin = (username, password) => ajax('/login', {username, password}, 'POST')
// 添加用户接口
export const reqAddUser = (user) => ajax('/user/add', user, 'POST')
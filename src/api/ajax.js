/* 
能发送异步ajax请求的函数模块
封装axios库
函数返回值是一个promise对象
优化：统一处理异常请求
  1. 在外层包一个自己创建的promise对象
  2. 在请求出错时，不执行reject(error), 而是显示错误提示信息
 */

import axios from 'axios';
import { message } from 'antd'
/* 
url:请求URL地址
data:请求参数（默认为空）
type:请求类型（默认GET）
*/
export default function ajax(url, data={}, type='GET' ) {
  return new Promise((resolve, reject) => {
    let promise
    // 1. 执行异步ajax请求
    if (type === 'GET') { // 发送GET请求
      promise = axios.get(url, {
        params: data
      })
    } else {
      promise = axios.post(url, data) // 发送POST请求
    }
    // 2. 成功，调用resolve(value)
    promise.then(response => {
      resolve(response)
    }).catch(error => {
    // 3. 失败，不调用reject(error),而是提示异常信息
      message.error('请求出错了：', error.message)
    })
  })
 
}
// 请求接口示例
// ajax('/login', {username: 'Ami', password: '123456'}, 'POST').then(function(response){console.log(respose)})


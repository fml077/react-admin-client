/* 
能发送异步ajax请求的函数模块
封装axios库
函数返回值是一个promise对象
 */

 import axios from 'axios';
/* 
url:请求URL地址
data:请求参数（默认为空）
type:请求类型（默认GET）
*/
export default function ajax(url, data={}, type='GET' ) {
  if (type === 'GET') { // 发送GET请求
    return axios.get(url, {
      params: data
    })
  } else {
    return axios.post(url, data) // 发送POST请求
  }
}
// 请求接口示例
// ajax('/login', {username: 'Ami', password: '123456'}, 'POST').then(function(response){console.log(respose)})


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
// export const reqLogin = (username, password) => ajax('/login', {username, password}, 'POST')

export const reqLogin = (title, body,userId) => ajax('https://jsonplaceholder.typicode.com/posts/', {title, body,userId}, 'POST')
// 获取用户列表接口
export const reqAddUser = (user) => ajax('/manage/user/list')
// 获取优惠券接口
// export const reqEample = (user) => ajax('/discounts/coupons')
// 登录接口获取用户列表接口
export const reqEample = () => ajax('/manage/user/list')
// 获取一级/二级分类列表接口, GET请求
/* 
parentId:传入的分类父类id
 */
export const reqGetCategorys =(parentId) => ajax('/manage/category/list', {parentId})
// 添加分类, POST请求
/* 
parentId:所属父类id
categoryName:传入的分类名称
 */
export const reqAddCategory =(parentId, categoryName) => ajax('/manage/category/add', {parentId, categoryName}, 'POST')
// 更新分类, POST请求
/* 
categoryId:传入的分类id
categoryName:传入的分类名称
 */
export const reqUpdateCategory =({categoryId, categoryName}) => ajax('/manage/category/update', {categoryId, categoryName}, 'POST')
//  获取文章分类列表 GET请求
export const reqGetCategoryList =() => ajax('/cms/category/list',)

//  获取文章列表 POST请求
export const reqGetArticleList =(id) => ajax('/cms/news/list', {}, 'POST')
//  获取文章详情 GET请求, 传参id
export const reqGetArticleDetail =(id) => ajax('/cms/news/detail', {id})



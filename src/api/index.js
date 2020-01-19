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
/* 
//  编辑文章 POST请求, 传参
categoryId: 文章分类ID, content:文章内容, descript:文章摘要, title:文章标题 
*/
export const reqUpdateArticle =({categoryId, content, descript, title }) => ajax('/cms/news/put', {categoryId, content, descript, title }, 'POST')

/* 
//  编辑文章 POST请求, 传参
deviceId: 登录设备ID，测试接口自定义即可, deviceName:登录设备名称， 测试接口自定义即可, pwd:登录密码, username:用户名 
*/
export const reqLoginTest =({ deviceId, deviceName, pwd, username }) => ajax('/user/username/login', { deviceId, deviceName, pwd, username }, 'POST')
// 获取手机短信验证码 GET请求
export const reqMobileCode =(mobile) => ajax('/verification/sms/get', {mobile})
// 获取邮箱验证码 GET请求
export const reqSetEmailCode =(mail) => ajax('/verification/mail/get', {mail})

/* 
// 校验邮件验证码是否正确 POST请求，验证码有效期5分钟
code:用户输入的邮件验证码
mail:用户邮箱
 */
export const reqCheckEmailCode =({ code, mail }) => ajax('/verification/mail/check', { code, mail }, 'POST')
/* 
// 用户注册[邮箱注册] POST请求，
code:用户输入的邮件验证码
mail:用户邮箱
psd:用户密码
 */
export const reqEmailRegister =({ code, email, pwd }) => ajax('/user/email/register', { code, email, pwd }, 'POST')
/* 
// 用户登录[邮箱登录] POST请求，
deviceId: 登录设备ID，测试接口自定义即可, deviceName:登录设备名称， 测试接口自定义即可
email:用户邮箱
psd:用户密码
 */
export const reqEmailLogin =({ deviceId, deviceName, email, pwd }) => ajax('/user/email/login', { deviceId, deviceName, email, pwd }, 'POST')
/* 
// 获取商品列表 POST请求 参数均为非必填 , 后端分页 
categoryId: 获取指定分类下的商品
nameLike: 商品名称关键词模糊搜索
status: -1 (-1全部状态 0上架 1下架)
page: 获取第几页数据
pageSize: 每页显示几条数据 */
export const reqProductList =(params) => ajax('/shop/goods/list', params, 'POST')
/* // 获取商品详情数据
id: 商品id 
*/
export const reqProductDetail =(params) => ajax('/shop/goods/detail', params)



// import React, { Component } from 'react'
// import LoginForm from './components/login-form/index'
// import './index.less'
// export default class Login extends Component {
//   render() {
//     return (
//       <div className="login-page">
//         <div className="login-content">
//           <LoginForm></LoginForm>
//         </div>
//       </div>
//     )
//   }
// }
import React, { Component } from 'react'
import { Redirect }from 'react-router-dom'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import './index.less'
import { reqLogin } from '../../api'
import memoryUtil from '../../utils/memoryUtil'
import storageUtil from '../../utils/storageUtil'

const FormItem = Form.Item;
class LoginForm extends Component {
  handleSubmit = e => {
    // 阻止事件默认行为
    e.preventDefault();
    // console.log('获得form输入框的值',this.props.form.getFieldsValue());
    
    this.props.form.validateFields(async (err, values) => {
      // const _this = this;
      // 无错误，即校验成功，向后台发ajax请求
      if (!err) {
        // console.log('提交登录的ajax请求，Received values of form: ', values);
        const {username, password} = values
        /* reqLogin(username, password).then((response) => {
          console.log('成功了', response.data)
        }).catch((error) => {
          console.log('失败了', error);
        }) */
        // const response = await reqLogin(username, password);
        const response = await reqLogin('foo', 'bar', 1); // toto-写死了测试用，实际项目中要改为传入form表单数据
        // const result = response.data
        if (response.status === 201) { // todo-测试用，实际项目要改为接口状态码
          message.success('登录成功')
          memoryUtil.user = values // todo-测试用,实际项目要改为接口返回用户内容
          storageUtil.saveUser(values) // 保存到local中
          this.props.history.replace('/')
          
          // 跳转到首页，不允许回退用replace，允许回退用push
        } else {
          message.error('登录失败')
        }
      } else {
        message.error('登录失败')
      }
    });
  };
  // 自定义密码校验规则
  /* 
  密码合法性要求 
  1）不能为空
  2）必须大于6 并且小于18位
  3）必须由英文、数字或下划线组成
  */
  validatorPassWord = (rule, value, callback) => {
     /* 自定义校验要求回调函数callback必须执行
    callback() //校验通过执行
    callback('xxx') // 校验不通过的提示信息 xxx 
    */
    if (!value) {
      callback('密码必填')
    } else if (value.length < 6) {
      callback('密码不能小于6位')
    } else if (value.length > 12) {
      callback('密码不能超过12位')
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback('密码必须由英文、数字或下划线组成')
    } else{
      callback()
    }
  }

  render() {
    // 判断用户是否登录, 如果已经登录跳转到首页
    const user = memoryUtil.user
    if (user && user.username) {
      return <Redirect to="/" />
    }
    // 得到form对象
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-page">
        <div className="login-content">
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator('username', {
                // 声明式子验证：用别人定义好的验证规则
                rules: [
                  { required: true, message: 'Please input your username!' },
                  { min: 3, message: '用户名至少3位'},
                  { max: 30, message: '用户名至多30位'},
                  // { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字、下划线开头' }
                ],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: '#1890ff' }} />}
                  placeholder="Username"
                />,
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('email', {
                rules: [{required: true, message: '请输入邮箱'}]
              })(
                <Input
                  prefix={<Icon type="mail" style={{ color: '#1890ff' }} />}
                  placeholder="email"
                />,
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [
                  // { required: true, message: 'Please input your Password!' },
                  // { pattern: /^[a-zA-Z0-9_]+$/, message: '密码必须是英文、数字、下划线开头' }
                  { validator: this.validatorPassWord }, // 自定义校验规则
                ],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: '#1890ff' }} />}
                  type="password"
                  placeholder="Password"
                />,
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>记住密码</Checkbox>)}
              <a className="login-form-forgot" href="">
                忘记密码
              </a>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
              <a href="">注册!</a>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}
// 
/* 
1. 高阶函数
  1) 一类特殊的函数，满足以下其一
    a. 接受函数类型的参数
    b. 返回值是函数
  2) 常见有
    a. 定时器： setTimeout() / setInterval()
    b. Promise: Promise(() => {}) then(value => {}, reason => {})
    c. 数组遍历相关的方法：forEach()/filter()/map()/reduce()/find()/findIndex()
    d. 函数对象的bind()
    e. Form.create()() / getFieldDecorator()()
  3) 高阶函数更新动态，更加具有扩展性
2. 高阶组件
  1）本质是一个高阶函数
  2）接收一个组件（被包装组件），返回一个新组件（包装组件），包装组件会向被包装组件传入特定属性
  3）作用：扩展组件的功能
*/
/* 
async 和 await
1. 作用
  简化promise对象的使用：不用使用then()来指定成功/失败的回调函数
  以同步编码（没有回调函数）方式实现异步流程
2. 哪里写await
  在返回promise的表达式左侧写await：不想要promise，只想要promise异步返回的data数据
3. 哪里写async
  在await所在函数(最近的函数)定义的左侧写async
*/


/* 
Form.create: 包装Form组件生成一个新的组件：Form(Login)
新组件会向Form组件传递一个强大的对象属性：form
 */
export default Form.create({ name: 'login_form' })(LoginForm);



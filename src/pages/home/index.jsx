import React, { Component } from 'react'
import { Button, message } from 'antd'
import { reqLoginTest, reqMobileCode, reqSetEmailCode, reqCheckEmailCode } from "../../api/index";
export default class Home extends Component {
  // 发送手机验证码
  sendMobileCode() {
    const result = reqMobileCode('18811583298')
    console.log('999',result);
  }
  // 发送邮箱验证码
  sendEmailCode = async () => {
    const result = await reqSetEmailCode('419847610@qq.com')
    console.log('567',result);
  }
  // 校验输入的邮箱验证码 验证码有效期5分钟
  checkEmailCode = async () => {
    const result = await reqCheckEmailCode({code:'5357',mail:'419847610@qq.com'})
    if (result.code === 0) {
      message.success(result.msg)
    } else {
      message.error(result.msg)
    }
  }
  componentDidMount() {
  }
  
  render() {
    return (
      <div>
        首页
        <Button onClick={this.sendEmailCode}>发送验证码</Button>
        <Button onClick={this.checkEmailCode}>校验验证码</Button>
      </div>
    )
  }
}

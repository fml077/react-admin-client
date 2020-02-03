import React, { Component } from 'react';
import {Card, Icon, Form, Input, Button, Cascader, Upload} from 'antd';

const Item = Form.Item;
const {TextArea} = Input;

class ProductAdd extends Component {
  // 自定义价格校验
  priceValidator =(rule, value, callback) => {
    if (value * 1 > 0) { // 大于0的数字
      callback(); // 验证通过
    } else {
      callback('价格必须大于0') // 验证没通过提示
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    // 表单验证
    this.props.form.validateFields((err, values) => {
      if (!err) { // 无错误验证通过
        console.log('Received values of form: ', values);
        alert('数据无误可发送ajax请求')
      }
    });
  };
  render () {
    const { getFieldDecorator } = this.props.form;

    const title = (
      <span>
        {/* 回退到上一个页面，也可用this.props.history.push('/product') */}
        <Icon type="arrow-left" onClick={() => this.props.history.goBack()} style={{color: '#1890ff', marginRight: 10}} />
        添加商品
      </span>
    )
    // Item布局配置
    const formItemLayout = {
      labelCol: {
        xs: { span: 4 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 12 },
        sm: { span: 12 },
      },
    };
    return (
      <div>
        <Card className="add-page" title={title}>
          <Form {...formItemLayout} onSubmit={this.handleSubmit} >
            <Item label="商品名称">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: '商品名称不能为空',
                  }
                ]
              })(<Input placeholder="请输入商品名称" />)}
            </Item>
            <Item label="商品价格">
              {getFieldDecorator('price', {
                initialValue: '10',
                rules: [
                  {
                    required: true,
                    message: '商品价格不能为空'
                  },
                  {validator: this.priceValidator}
                ]
              })(<Input placeholder="请输入商品价格" type='number' addonAfter="元"/>)}
            </Item>
            <Item label="商品描述">
              {getFieldDecorator('descript', {
                rules: [
                  {
                    required: true,
                    message: '商品描述不能为空',
                  }
                ]
              })(<TextArea placeholder="请输入商品描述"  autoSize={{minRows: 2, maxRows: 5}} />)}
            </Item>
            <Item label="商品图片">
              <Input type="text"/>
            </Item>
            <Item label="商品详情">
              <Input type="text"/>
            </Item>
            <Item wrapperCol={{ span: 12, offset: 6 }}>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Item>
          </Form>
        </Card>
      </div>
    )
  }
}
export default Form.create()(ProductAdd)
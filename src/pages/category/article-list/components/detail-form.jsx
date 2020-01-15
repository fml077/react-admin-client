import React, { Component } from 'react'
import { Form, Select, Input } from 'antd'
const Item = Form.Item
const { Option } = Select;
const { TextArea } = Input;
class DetailForm extends Component {
  // 提交表单
  handleSubmit = (e) => {
    console.log(e);
  }
  render() {
    const {getFieldDecorator} = this.props.form;
    const {currentDetail} = this.props;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };
    return (
      <div>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Item label="文章分类" hasFeedback>
            {getFieldDecorator('categoryId', {
              // rules: [{ required: true, message: '请选择分类!' }],
              initialValue: currentDetail.categoryId || ''
            })(
              <Input disabled />
            )}
          </Item>
          <Item label="文章标题" hasFeedback>
            {getFieldDecorator('title', {
              // rules: [{ required: true, message: '请填写标题!' }],
              initialValue: currentDetail.title || ''
            })(
              <TextArea disabled rows={2}></TextArea>
            )}
          </Item>
          <Item label="文章摘要" hasFeedback>
            {getFieldDecorator('descript', {
              // rules: [{ required: true, message: '请填写摘要!' }],
              initialValue: currentDetail.descript || ''
            })(
              <TextArea disabled rows={2}></TextArea>
            )}
          </Item>
        </Form>
      </div>
    )
  }
}
export default Form.create()(DetailForm)

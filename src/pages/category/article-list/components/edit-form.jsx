import React, { Component } from 'react'
import { Form, Select, Input } from 'antd'
const Item = Form.Item
const { Option } = Select;
const { TextArea } = Input;
class EditForm extends Component {
  // 提交表单
  handleSubmit = (e) => {
    console.log(e);
    
  }
  render() {
    const {getFieldDecorator} = this.props.form;
    const {currentRecord} = this.props;
    console.log('currentRecord',currentRecord);
    
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };
    return (
      <div>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Item label="文章分类" hasFeedback>
            {getFieldDecorator('categoryId', {
              rules: [{ required: true, message: '请选择分类!' }],
              initialValue: currentRecord.categoryId || ''
            })(
              <Select placeholder="请选择分类">
                <Option value="1">科技</Option>
                <Option value="2">技术</Option>
              </Select>
            )}
          </Item>
          <Item label="文章标题" hasFeedback>
            {getFieldDecorator('title', {
              rules: [{ required: true, message: '请填写标题!' }],
              initialValue: currentRecord.title || ''
            })(
              <TextArea rows={2}></TextArea>
            )}
          </Item>
          <Item label="文章摘要" hasFeedback>
            {getFieldDecorator('descript', {
              rules: [{ required: true, message: '请填写摘要!' }],
              initialValue: currentRecord.descript || ''
            })(
              <TextArea rows={2}></TextArea>
            )}
          </Item>
          <Item label="文章内容" hasFeedback>
            {getFieldDecorator('content', {
              rules: [{ required: true, message: '请填写内容!' }],
              initialValue: currentRecord.content || ''
            })(
              <TextArea rows={3}></TextArea>
            )}
          </Item>
        </Form>
      </div>
    )
  }
}
export default Form.create()(EditForm)

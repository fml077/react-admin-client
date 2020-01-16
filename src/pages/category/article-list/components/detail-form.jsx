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
    const {currentRecord} = this.props;
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
              initialValue: currentRecord.categoryId || ''
            })(
              <Input disabled />
            )}
          </Item>
          <Item label="文章标题" hasFeedback>
            {getFieldDecorator('title', {
              // rules: [{ required: true, message: '请填写标题!' }],
              initialValue: currentRecord.title || ''
            })(
              <TextArea disabled rows={2}></TextArea>
            )}
          </Item>
          <Item label="文章摘要" hasFeedback>
            {getFieldDecorator('descript', {
              // rules: [{ required: true, message: '请填写摘要!' }],
              initialValue: currentRecord.descript || ''
            })(
              <TextArea disabled rows={2}></TextArea>
            )}
          </Item>
          <Item label="文章内容" hasFeedback>
            {getFieldDecorator('content', {
              // rules: [{ required: true, message: '请填写内容!' }],
              initialValue: {__html:currentRecord.content}
            })(
              <div style={{padding: '4px 11px',border: '1px solid #d9d9d9', color: 'rgba(0, 0, 0, 0.25)', borderRadius: 4, backgroundColor: '#f5f5f5'}} dangerouslySetInnerHTML={{__html:currentRecord.content}}></div>
              // <TextArea  dangerouslySetInnerHTML={{__html:currentRecord.content}} disabled rows={2}></TextArea>
            )}
          </Item>
        </Form>
      </div>
    )
  }
}
export default Form.create()(DetailForm)

import React, { Component } from 'react'
import { Form, Select, Input } from 'antd'
import PropTypes from 'prop-types';
import { reqUpdateArticle } from '../../../../api/index';
const Item = Form.Item
const { Option } = Select;
const { TextArea } = Input;
class EditForm extends Component {
  // static PropTypes = {
  //   setForm: PropTypes.func.isRequired
  // }
  // 提交表单
  handleSubmit = (e) => {
    console.log(e);
    e.preventDefault()
  }
  
  componentWillMount() {
    // 将form对象通过setForm()传递给父组件
    this.props.setForm(this.props.form)
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
        <Form {...formItemLayout} onSubmit={() => (this.handleSubmit)}>
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
          {/* <Item label="文章内容" hasFeedback>
            {getFieldDecorator('content', {
              rules: [{ required: true, message: '请填写内容!' }],
              initialValue: currentRecord.content || ''
            })(
              <TextArea rows={3}></TextArea>
            )}
          </Item> */}
          <Item label="文章内容" hasFeedback>
            {getFieldDecorator('content', {
              rules: [{ required: true, message: '请填写内容!' }],
              initialValue: {__html:currentRecord.content}
            })(
              <div style={{padding: '4px 11px', border: '1px solid #d9d9d9', borderRadius: 4}} contentEditable='true' dangerouslySetInnerHTML={{__html:currentRecord.content}}></div>
              // <TextArea  disabled rows={2}></TextArea>
            )}
          </Item>
        </Form>
      </div>
    )
  }
}
export default Form.create()(EditForm)

import React, { Component } from 'react'
import { Card, Button, Icon, Table, Divider, message, Tag, Modal } from 'antd'
import { reqGetArticleList, reqGetArticleDetail, reqUpdateArticle } from '../../../api'
import EditForm from '../article-list/components/edit-form'
import DetailForm from '../article-list/components/detail-form'
export default class Article extends Component {
  state = {
    articles: [], // 文章分类
    tableLoading: false, // 表格数据加载状态 
    detail: {}, // 文章详情
    modalStatus : 0 // 控制Modal弹窗 0都不显示，1为只显示详情弹窗，2为只显示编辑弹窗
  }
  // 初始化表格columns
  initColumns = () => {
    this.columns = [
      {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
        render: (id) => (id || '--')
      },
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        render: (title) => (title || '--')
      },
      {
        title: '标签',
        dataIndex: 'tags',
        key: 'tags',
        render: (tags) => (
          <Tag color="magenta">{tags}</Tag>
        )
      },
      {
        title: '操作',
        key: 'action',
        render: (record) => (
          <span>
            <a onClick={(e) => (this.getArticleDetail(record, 1)
            )}>查看详情</a>
            <Divider type="vertical" />
            <a onClick={(e) => {
              this.getArticleDetail(record, 2)
            }}>编辑</a>
          </span>
        ),
      },
    ];
  }
  // 获取文章列表
  getArticlesList = async () => {
//     {author: "小美"
// categoryId: 7089
// commentNumber: 0
// dateAdd: "2020-01-13 18:13:10"
// dateUpdate: "2020-01-14 18:21:40"
// descript: "前端达人，揭秘react从入门到放弃的秘诀……"
// id: 22754
// isRecommend: true
// keywords: "react"
// numberFav: 0
// paixu: 0
// pic: "https://dcdn.it120.cc/2020/01/13/033e210a-06c3-4094-ba36-a92d851dccb5.jpeg"
// status: 2
// statusStr: "审核通过"
// tags: "前端"
// title: "揭秘react从入门到放弃"
// uid: 0
// unusefulNumber: 0
// usefulNumber: 0
// userId: 11135
// views: 37}
    this.setState({tableLoading: true})
    const result = await reqGetArticleList()
    const articles = result.data.data
    if (result.data.code === 0) {
      this.setState({articles})
      this.setState({tableLoading: false})
    } else {
      message.error(result.data.msg)
    }
  }
  
  // 获取文章详情
  getArticleDetail = async (record, modalStatus) => {

//     author: 小美
// categoryId: 7089
// commentNumber: 0
// content: <p>前端达人，揭秘react从入门到放弃的秘诀&hellip;&hellip;欢迎围观吐槽</p>
// dateAdd: 2020-01-13 18:13:10
// descript: 前端达人，揭秘react从入门到放弃的秘诀……
// id: 22754
// isRecommend: true
// keywords: react
// numberFav: 0
// paixu: 0
// pic: https://dcdn.it120.cc/2020/01/13/033e210a-06c3-4094-ba36-a92d851dccb5.jpeg
// status: 2
// statusStr: 审核通过
// tags: 前端
// title: 揭秘react从入门到放弃
// uid: 0
// unusefulNumber: 0
// usefulNumber: 0
// userId: 11135
// views: 0
// extJsonStr: {}
    const result = await reqGetArticleDetail(record.id)
    if (result.data.code === 0) {

      // 保存当前记录数据用于传递给子组件detail-form
      this.currentRecord = result.data.data;
      // 显示详情Modal
      this.handleModalStatus(modalStatus)
    }
    
  }
  // 控制Modal弹窗
  handleModalStatus = (status) => {
    this.setState({modalStatus: status})
  }
  // 隐藏modal弹窗
  hideModal = () => {
    // 清除form表单输入数据
    this.form && this.form.resetFields()
    // 关闭modal弹窗
    this.setState({modalStatus: 0})
  }
  // 点击编辑按钮
  editArticle = async (record) => {
    const result = await reqGetArticleDetail(record.id)
    if (result.data.code === 0) {
      
      // 保存当前记录数据用于传递给子组件detail-form
      this.currentRecord = result.data.data;
      // 显示编辑弹框
      this.handleModalStatus(2)
    } else {
      message.error(result.data.msg)
    }
  }
  // 点击编辑更新文章Modal弹窗OK按钮
  updateArticle =  () => {
    // 编辑文章点击OK按钮提交前先进行表单错误校验
    this.form.validateFieldsAndScroll(async (errors, values) => {
      if (!errors) {
        // 1、关闭Modal弹窗
        this.handleModalStatus(0)
        // 2、获取edit-form表单数据相应字段值，this.form是在setForm属性中接收到的子组件form对象
        const categoryId = this.form.getFieldValue('categoryId')
        const content = this.form.getFieldValue('content')
        const descript = this.form.getFieldValue('descript')
        const title = this.form.getFieldValue('title')
        // 清除edit-form表单输入数据
        this.form && this.form.resetFields()
        // 3、发请求更新数据
        const result = await reqUpdateArticle({categoryId, content, descript, title});
        console.log('4443',result.data.data);
        // 4、重新渲染列表表格数据
        if (result.data.code === 0) {
          this.getArticlesList()
        } else {
          message.error(result.data.msg)
        }
      } else {
        return
      }
    })
    
  }
  componentWillMount() {
    this.initColumns()
  }
  componentDidMount() {
    this.getArticlesList()
  }
  render() {
    const { articles, tableLoading, modalStatus } = this.state;
    const { updateArticle, currentRecord, currentDetail } = this;
    const title = '文章列表';
    const extra = (
      <Button type="primary">
        <Icon type="plus"></Icon>
        添加
      </Button>
    )
    return (
      <Card title={title} extra={extra}>
        <Table 
        dataSource={articles} 
        rowKey={item => item.id}
        columns={this.columns}
        loading={tableLoading}
        bordered
        pagination={{defaultPageSize: 1, showQuickJumper: true}}
         />
         <Modal
          title="文章详情"
          visible={modalStatus === 1}
          onCancel={this.hideModal}
          //设置foot而不需要显示cancel和OK按钮 
          footer={[ 
            null, 
            null, 
          ]} 
        >
          <DetailForm currentRecord={currentRecord} />
        </Modal>
        <Modal
          title="编辑文章"
          visible={modalStatus === 2}
          onOk={updateArticle}
          onCancel={this.hideModal}
        >
          <EditForm 
            currentRecord={currentRecord}
            // 设置setForm属性用一个方法使得子组件能将form对象传递过来以获得子组件form表单值并存为this.form 
            setForm={(form) => this.form = form}
          />
        </Modal>
      </Card>
    )
  }
}

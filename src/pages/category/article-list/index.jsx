import React, { Component } from 'react'
import { Card, Button, Icon, Table, Divider, message, Tag, Modal } from 'antd'
import { reqGetArticleList, reqGetArticleDetail } from '../../../api'
export default class Article extends Component {
  state = {
    articles: [], // 文章分类
    tableLoading: false, // 表格数据加载状态 
    detail: {}, // 文章详情
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
            <a onClick={(e) => (this.getArticleDetail(record.id)
            )}>查看详情</a>
            <Divider type="vertical" />
            <a>编辑</a>
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
      message.error('服务器出错了┭┮﹏┭┮')
    }
  }
  // 获取文章详情
  getArticleDetail = async (id) => {

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
    const result = await reqGetArticleDetail(id)
    console.log(1567,result.data.data);
    
  }
  componentWillMount() {
    this.initColumns()
  }
  componentDidMount() {
    this.getArticlesList()
  }
  render() {
    const { articles, tableLoading } = this.state;
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
      </Card>
    )
  }
}

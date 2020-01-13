import React, { Component } from 'react'
import { Card, Button, Icon, Table, Divider, message } from 'antd'
import { reqGetArticleList } from '../../api'
export default class Category extends Component {
  state = {
    categorys: [], // 文章分类
    tableLoading: false, // 表格数据加载状态 
  }
  // 初始化表格columns
  initColumns = () => {
    /* data = [{
      dateAdd: "2020-01-13 18:03:37"
      icon: "https://dcdn.it120.cc/2020/01/13/c0311cb2-c791-4d11-b31a-a1ba54a7bf61.jpeg"
      id: 7088
      isUse: true
      key: "1"
      level: 1
      name: "学习技术贴"
      paixu: 1
      pid: 0
      remark: "这是学习技术贴文章分类"
      type: "技术"
      userId: 11135
    }] */
    this.columns = [
      {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
        render: (id) => (id || '--')
      },
      {
        title: '所属分类',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '所属分类级别',
        dataIndex: 'level',
        key: 'level',
        render: (level) => (level || '' + '级')
      },
      {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
        render: (remark) => (remark || '--')
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <a>查看详情</a>
            <Divider type="vertical" />
            <a>删除</a>
          </span>
        ),
      },
    ];
  }
  // 获取文章类别列表
  getArticleList =  async () => {
    this.setState({tableLoading: true})
    const result = await reqGetArticleList()
    
    this.setState({tableLoading: false}) // 接口数据返回后关闭loading效果

    if (result.data.msg === 'success') {
      const categorys = result.data.data || [];
      this.setState({
        categorys
      })
    } else {
      message.error('服务器出错了┭┮﹏┭┮')
    }
  }
  componentWillMount() {
    this.initColumns()
    
  }
  componentDidMount() {
    this.getArticleList()
  }
  
  
  render() {
    const { categorys, tableLoading } = this.state;
    const title = '文章分类';
    const extra = (
      <Button type="primary">
        <Icon type="plus"></Icon>
        添加
      </Button>
    )
    return (
      <Card title={title} extra={extra}>
        <Table 
        dataSource={categorys} 
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

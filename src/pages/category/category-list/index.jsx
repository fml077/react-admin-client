import React, { Component } from 'react'
import { Card, Button, Icon, Table, Divider, message, Tooltip } from 'antd'
import { reqGetCategoryList, reqGetArticleDetail } from '../../../api'
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
        title: () => (
          <span>
            {'所属分类级别'}
            <Tooltip
                title={'分类级别分为一二三级'}
            >
              <Icon style={{ marginLeft: 8 }} type="question-circle" />
            </Tooltip>
          </span>
        ),
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
            <a>编辑</a>
          </span>
        ),
      },
    ];
  }
  // 获取文章类别列表
  getCategoryList =  async () => {
    this.setState({tableLoading: true})
    const result = await reqGetCategoryList()
    
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
    const result = await reqGetArticleDetail(22754)
    console.log(56,result);
    
  }
  componentWillMount() {
    this.initColumns()
    
  }
  componentDidMount() {
    this.getCategoryList()
    this.getArticleDetail()
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

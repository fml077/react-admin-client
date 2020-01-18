import React, { Component } from 'react'
import { Card, Select, Button, Input, Table } from 'antd'

const {Option} = Select
const dataSource = [
    {
        "categoryId": 87833,
        "characteristic": "方便面 广西特产 美食",
        "commission": 0,
        "commissionType": 0,
        "dateAdd": "2020-01-18 15:26:43",
        "dateUpdate": "2020-01-18 15:36:44",
        "gotScore": 0,
        "gotScoreType": 0,
        "id": 262807,
        "kanjia": false,
        "kanjiaPrice": 0,
        "limitation": false,
        "logisticsId": 0,
        "miaosha": false,
        "minPrice": 80,
        "minScore": 0,
        "name": "桂林米粉",
        "numberFav": 0,
        "numberGoodReputation": 0,
        "numberOrders": 0,
        "numberSells": 0,
        "originalPrice": 110,
        "paixu": 0,
        "pic": "https://dcdn.it120.cc/2020/01/18/d9f02509-762a-473b-ad97-77ba5e202727.jpeg",
        "pingtuan": false,
        "pingtuanPrice": 0,
        "recommendStatus": 0,
        "recommendStatusStr": "普通",
        "shopId": 0,
        "status": 0,
        "statusStr": "上架",
        "stores": 120,
        "tags": "方便面,广西特产",
        "userId": 11135,
        "vetStatus": 1,
        "views": 1,
        "weight": 0
    }
]

export default class ProductHome extends Component {
  state = {
    productList: [], // 商品列表
  }
  // 改变查询条件
  handleSelectChange = (e) => {
    console.log('ee',e);
    
  }
  // 初始化表格列数据
  initColumns = () => {
    this.columns = [
      {
        title: 'ID',
        dataIndex: 'categoryId',
        key: 'categoryId',
      },
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '库存',
        dataIndex: 'stores',
        key: 'stores',
      },
      {
        title: '状态',
        dataIndex: 'statusStr',
        key: 'statusStr',
      },
      {
        title: '价格',
        dataIndex: 'originalPrice',
        key: 'originalPrice',
        render: (originalPrice) => ( '￥' + originalPrice ) // 当前指定了对应属性，传入的就是对应属性的值
      },
      {
        title: '操作',
        render: (record) => { // 传入的是整条行数据
          return (
             <span>
               <Button type='link'>查看详情</Button>
               <Button type='link'>编辑</Button>
             </span>
          );
        }
      },
    ]
  }
  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  componentWillMount() {
    this.initColumns()
  }
  
  render() {
    const title = (
      <span>
        <Select defaultValue="1" style={{ width: 150 }} onChange={this.handleSelectChange}>
          <Option value='1'>按商品ID搜索</Option>
          <Option value='2'>按商品名称搜索</Option>
        </Select>
        <Input placeholder='请输入……' style={{width: 200, margin: '0 10px'}} />
        <Button type='primary' icon="search">搜索</Button>
      </span>
    )
    const extra = (
      <Button type='primary' icon="plus">添加商品</Button>
    )
    const { productList } = this.state
    
    return (
      <div>
        <Card title={title} extra={extra}>
          <Table dataSource={dataSource} columns={this.columns} rowKey={record => record.id} bordered />
        </Card>
      </div>
    )
  }
}

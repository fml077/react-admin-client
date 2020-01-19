import React, { Component } from 'react'
import { Card, Select, Button, Input, Table, message } from 'antd'
import { reqProductList } from '../../../api/index'

const {Option} = Select

export default class ProductHome extends Component {
  state = {
    productList: [], // 商品列表数据
    total: 0, // 总共所有数据条数
    tableLoading: true, // 表格loading效果
    searchType: 'categoryId', // 搜索类型
    searchValue: '', // 搜索框输入值
  }
  // 改变select查询条件
  handleSelectChange = (value) => {
    this.setState({searchType: value})
  }
  // 改变input输入内容查询条件
  handleInputChange = (e) => {
    this.setState({searchValue: e.target.value})
  }
  // 初始化表格列数据
  initColumns = () => {
    this.columns = [
      {
        title: '所属分类ID',
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
      }
    ]
  }
  // 页码分页配置
  paginationConfig = () => {
    const {total, page, pageSize} = this.state;
    
    return {
      defaultPageSize: 2, // 默认的每页条数
      pageSize: pageSize || 2, // 每页条数
      total: total,
      showQuickJumper: true, // 快速跳转至某页
      showSizeChanger: true, // 是否可以改变 pageSize
      pageSizeOptions: ['1', '2', '5'], // 指定每页可以显示多少条
      showTotal: (total) => '共' + total + '条', // 用于显示数据总量和当前数据顺序
      onChange: (page, pageSize) => { // 页码改变的回调
        this.setState({
          pageSize,
          page: 1 // 回到第一页
        },
        () =>  {
          this.getTableList(page, pageSize)// 状态设置完毕重新渲染表格
        })
      }, 
      onShowSizeChange: (current, pageSize) => { // pageSize 变化的回调
        this.setState({
          pageSize
        },
        () => {
          this.getTableList(page, pageSize)// 状态设置完毕重新渲染表格
        })
      } 
    }
  }
  // 获取表格数据
  /* // reqProductList 获取商品列表 POST请求 参数均为非必填 , 后端分页 
    categoryId: 获取指定分类下的商品
    nameLike: 商品名称关键词模糊搜索
    status: -1 (-1全部状态 0上架 1下架)
    page: 获取第几页数据
    pageSize: 每页显示几条数据 */
  getTableList = async(page = 1, pageSize = 2) => {
    const totalResult = await reqProductList({status: -1}); //todo-- 接口缺陷无总数据total，此测试为了获得所有数据 来演示后台分页效果(实际开发无需这步)
    const list = totalResult.data
    const total = list.length; // 获取所有数据条数
    this.setState({
      total,
      page,
      pageSize,
      tableLoading: true,
    },
    // setState 异步处理完成后再执行接口请求保证拿到最新的state数据
    async () => {
      const { page, pageSize, searchType, searchValue } = this.state
      let result
      // 后台分页
      if (searchValue) { // 如果输入框有值就按分类ID(传字段categoryId)或者是按名称(传字段nameLike)搜索
        result = await reqProductList({status: -1, page, pageSize, [searchType]:searchValue }) // 默认返回全部状态数据
      } else { // 普通搜索
        result = await reqProductList({status: -1, page, pageSize}) // 默认返回全部状态数据
      }
      const productList = result.data || []
      // 请求完毕 关闭loading
      this.setState({tableLoading: false})
      if (result.code === 0) {
        this.setState({productList})
      } else { // 其他错误则清空表格数据并提示错误信息
        this.setState({productList: []})
        message.error(result.msg)
      }
    })
  }
  
  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  componentWillMount() {
    this.initColumns()
  }
  componentDidMount() {
    this.getTableList()
  }
  
  render() {
    const {searchType, searchValue} = this.state
    const title = (
      <span>
        <Select defaultValue="categoryId" style={{ width: 150 }} value={searchType} onChange={(value)=>this.handleSelectChange(value)}>
          <Option value='categoryId'>按商品分类ID搜索</Option>
          <Option value='nameLike'>按商品名称搜索</Option>
        </Select>
        <Input placeholder='ID要完全匹配/名称可模糊匹配' style={{width: 220, margin: '0 10px'}} value={searchValue} onChange={(event)=>this.handleInputChange(event)} />
        <Button type='primary' icon="search" onClick={()=>this.getTableList()}>搜索</Button>
      </span>
    )
    const extra = (
      <Button type='primary' icon="plus">添加商品</Button>
    )
    const { productList, tableLoading } = this.state
    
    return (
      <div>
        <Card title={title} extra={extra}>
          <Table 
            dataSource={productList} 
            columns={this.columns} 
            pagination={this.paginationConfig()}
            rowKey={record => record.id} 
            loading={tableLoading}
            bordered
           />
        </Card>
      </div>
    )
  }
}

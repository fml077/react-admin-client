import React, { Component } from 'react'
import { Card, Select, Button, Input, Table, message, List, Icon } from 'antd'
import './index.less'
const {Item} = List

// 详情接口返回数据格式
const dataSource = {
  "extJson": {},
  "category": {
      "dateAdd": "2020-01-16 15:23:46",
      "id": 87452,
      "isUse": true,
      "key": "4001",
      "name": "服装",
      "paixu": 4,
      "pid": 0,
      "type": "4",
      "userId": 11135
  },
  "pics": [
      {
          "goodsId": 262888,
          "id": 1311709,
          "pic": "https://dcdn.it120.cc/2020/01/18/360b5723-b536-44a7-a868-89dc63e45956.jpeg",
          "userId": 11135
      }
  ],
  "content": "<ol>\n<li><b>夏天 ，清爽</b></li>\n<li><b>超级凉爽</b></li>\n</ol>",
  "basicInfo": {
      "categoryId": 87452,
      "characteristic": "夏天 ，清爽 盛夏",
      "commission": 0,
      "commissionType": 0,
      "dateAdd": "2020-01-18 22:47:04",
      "dateUpdate": "2020-01-19 18:05:53",
      "gotScore": 0,
      "gotScoreType": 0,
      "id": 262888,
      "kanjia": false,
      "kanjiaPrice": 0,
      "limitation": false,
      "logisticsId": 0,
      "miaosha": false,
      "minPrice": 880,
      "minScore": 0,
      "name": "夏天清爽T恤",
      "numberFav": 0,
      "numberGoodReputation": 0,
      "numberOrders": 0,
      "numberSells": 0,
      "originalPrice": 990,
      "paixu": 0,
      "pic": "https://dcdn.it120.cc/2020/01/18/360b5723-b536-44a7-a868-89dc63e45956.jpeg",
      "pingtuan": false,
      "pingtuanPrice": 0,
      "recommendStatus": 0,
      "recommendStatusStr": "普通",
      "shopId": 0,
      "status": 0,
      "statusStr": "上架",
      "stores": 20,
      "tags": "夏天,清爽",
      "userId": 11135,
      "vetStatus": 1,
      "views": 0,
      "weight": 0
  }
}
export default class ProductDetail extends Component {
  
  render() {
    // 接收从列表页点详情按钮传递过来的商品state数据
    const productDetailData = this.props.location.state;
    // console.log(productDetailData);
    const {name, id, characteristic, originalPrice, statusStr, tags, stores } = productDetailData
    // const { category, pics, content, basicInfo } = dataSource
    
    const title = (
      <span>
        <Icon type="arrow-right" />
        商品详情
      </span>
    )
    const extra = (
      <span>这是详情页</span>
    )
    return (
      <Card className="detail-page" title={title} extra={extra}>
        <List
          className="detail-list"
          itemLayout="horizontal"
        >
            <Item>
              <span className="left-label">商品名称：</span>
              <span>{name}</span>
            </Item>
            <Item>
              <span className="left-label">商品所属分类：</span>
              {/* <span>{category.name}</span> */}
            </Item>
            <Item>
              <span className="left-label">商品ID：</span>
              <span>{id}</span>
            </Item>
            <Item>
              <span className="left-label">商品详情描述：</span>
              {/* <span>{content}</span> */}
            </Item>
            <Item>
              <span className="left-label">商品价格：</span>
              <span>{originalPrice}</span>
            </Item>
            <Item>
              <span className="left-label">上架状态：</span>
              <span>{statusStr}</span>
            </Item>
            <Item>
              <span className="left-label">商品标签：</span>
              <span>{tags}</span>
            </Item>
            <Item>
              <span className="left-label">商品库存：</span>
              <span>{stores}</span>
            </Item>
            <Item>
              <span className="left-label">商品图片：</span>
              {/* <span><img src="" alt="" srcSet=""/></span> */}
            </Item>
        </List>
      </Card>
    )
  }
}

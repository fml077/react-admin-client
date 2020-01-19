import React, { Component } from 'react'
import { Card, Tag, List, Icon } from 'antd'
import './index.less'
import { reqProductDetail } from "../../../api/index";
const {Item} = List
// 自定义tag标签颜色样式
const tagsColor = ['magenta','red','volcano','gold','blue','purple','green','lime']

export default class ProductDetail extends Component {
  state = {
    detailData: {} // 商品详情数据
  }
  // 获取详情页数据
  getDetail = async() => {
      // 接收从列表页点详情按钮传递过来的商品state数据中的产品id
    const productId = this.props.location.state.id
      const result = await reqProductDetail({id: productId})
      // 存储商品详情数据
      this.setState({detailData: result.data})
  }
  componentDidMount () {
    this.getDetail()
  }
  render() {
    // 接收从列表页点详情按钮传递过来的商品state数据
    const productDetailData = this.props.location.state;
    const {name, id, originalPrice, statusStr, tags, stores } = productDetailData
    // tag标签分隔成数组
    const tagsLabel = tags.split(',')
    // 解构详情数据
    const { category, pics, content } = this.state.detailData
    
    const title = (
      <span>
        {/* 回退到上一个页面，也可用this.props.history.push('/product') */}
        <Icon type="arrow-right" onClick={() => this.props.history.goBack()} style={{color: '#1890ff', marginRight: 10}} />
        商品详情
      </span>
    )
    const extra = (
      <span style={{fontSize: 16, fontWeight: 500}}>{name}</span>
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
              <span>{category && category.name }</span>
            </Item>
            <Item>
              <span className="left-label">商品ID：</span>
              <span>{id}</span>
            </Item>
            <Item>
              <span className="left-label">商品详情描述：</span>
              {/*dangerouslySetInnerHTML渲染HTML标签 innerHTML 的替换 */}
              <span dangerouslySetInnerHTML={{__html:content}}></span>
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
              <span>
                {tagsLabel && tagsLabel.map((item,i )=>(
                  <Tag key={i} color={tagsColor[i]}>{item}</Tag>
                ))}
              </span>
            </Item>
            <Item>
              <span className="left-label">商品库存：</span>
              <span>{stores}</span>
            </Item>
            <Item>
              <span className="left-label">商品图片：</span>
              <span className="product-imgs">
                {pics && pics.map((item, i)=>(
                  <img key={i} src={item.pic} alt="" srcSet=""/>
                ))}
              </span>
            </Item>
        </List>
      </Card>
    )
  }
}

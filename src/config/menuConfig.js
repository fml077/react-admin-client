// 菜单配置
const menuList = [
  {
    title: '首页',
    key: '1',
    icon: 'home',
    link: '/home'
  },
  {
    title: '商品',
    key: '2',
    icon: 'calendar',
    itemGroup: '商品管理',
    children: [
      {
        title: '商品出库',
        key: '3',
        icon: 'calendar',
        link: '/product'

      },
      {
        title: '商品入库',
        key: '4',
        icon: 'calendar',
        link: '/product'
      },
    ]
  },
  {
    title: '图表分析',
    key: '5',
    icon: 'setting',
    // itemGroup: '图表',
    children: [
      {
        title: '柱状图',
        key: '6',
        icon: 'calendar',
        link: '/bar'
      },
      {
        title: '折线图',
        key: '7',
        icon: 'setting',
        link: '/line'
      },
      {
        title: '饼图',
        key: '8',
        icon: 'setting',
        link: '/pie'
      }
    ]
  }
]

export default menuList;
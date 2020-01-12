// 菜单配置
const menuList = [
  {
    title: '首页',
    key: '/home',
    icon: 'home',
    link: '/home'
  },
  {
    title: '商品',
    key: '/products',
    icon: 'calendar',
    itemGroup: '商品管理',
    children: [
      {
        title: '商品出库',
        key: '/product',
        icon: 'calendar',
        link: '/product'

      },
      // {
      //   title: '商品入库',
      //   key: '/product',
      //   icon: 'calendar',
      //   link: '/product'
      // },
    ]
  },
  {
    title: '图表分析',
    key: '/charts',
    icon: 'setting',
    // itemGroup: '图表',
    children: [
      {
        title: '柱状图',
        key: '/bar',
        icon: 'calendar',
        link: '/bar'
      },
      {
        title: '折线图',
        key: '/line',
        icon: 'setting',
        link: '/line'
      },
      {
        title: '饼图',
        key: '/pie',
        icon: 'setting',
        link: '/pie'
      }
    ]
  }
]

export default menuList;
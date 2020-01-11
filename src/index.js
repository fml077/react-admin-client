import React from 'react'
import ReactDOM from 'react-dom'
import App from './App' 
import storageUtil from './utils/storageUtil'
import memoryUtil from './utils/memoryUtil'
// import 'antd/dist/antd.min.css'

// 读取local中保存的user, 保存到内存中
const user = storageUtil.getUser()
memoryUtil.user = user

ReactDOM.render(<App />, document.getElementById('root'))
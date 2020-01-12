import React, { Component } from 'react'
import './index.less' 
/* 
用button封装类外形像是a标签的按钮
非状态组件 用function即可 */
export default function LinkButton (props) {
  return (
    <button {...props} className="link-button"></button>
  )
}

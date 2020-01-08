import React, { Component } from 'react'
import {Button} from 'antd'
export default class App extends Component {
  render() {
    return (
       <div>
         <Button type="primary">APP</Button>
         <Button type="danger">Danger</Button>
       </div>
    );
  }
}
import React from 'react';
import { withRouter } from "react-router-dom";
import { Layout, Menu, Icon } from 'antd';
const { Sider } = Layout;
interface PropType {
  history?:any
}
interface StateType{
  show:boolean
}
class MySider extends React.Component<PropType, StateType> {
  constructor(props:PropType){
    super(props)
  }
  go=(path:string)=>{
    this.props.history.push(path)
  }
  render() {
    return (
      <Sider trigger={null} >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['home']}>
          <Menu.Item key="home" onClick={()=>this.go('./home')}>
            <Icon type="user" />
            <span>home</span>
          </Menu.Item>
          <Menu.Item key="detail" onClick={()=>this.go('./detail')}>
            <Icon type="video-camera" />
            <span>detail</span>
          </Menu.Item>
        </Menu>
      </Sider>
    )
  }

}

export default withRouter(MySider);

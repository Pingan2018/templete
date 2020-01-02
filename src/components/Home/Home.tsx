import React from 'react';
import { connect } from "react-redux";
import {addAction} from '../../store/home'
import { Button } from 'antd'
interface PropType{
  counter:number
  addAction:any
}
class Home extends React.Component<PropType,any> {
  handleClick = () => {
    console.log(this.props)
    this.props.addAction()
  };
  render(){
    return (
      <div>
        {this.props.counter}
        <Button type='primary' onClick={this.handleClick}>点击</Button>
      </div>
    );
  }
}

export default connect(
  (state:any)=>({
    counter:state.addReducer.counter
  }),
  {addAction}
)(Home);

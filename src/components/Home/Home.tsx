import React from 'react';
import { connect } from "react-redux";
import {add} from '../../store/actions'
import { Button } from 'antd'
interface PropType{
  counter:number
  add:any
}
class Home extends React.Component<PropType,any> {
  handleClick = () => {
    console.log(this.props)
    this.props.add()
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
    counter:state.add.counter
  }),
  {add}
)(Home);

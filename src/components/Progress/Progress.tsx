import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './progress.css'
interface PropType{

}
interface StateType{
  show:boolean
}
class Box extends Component<PropType, StateType> {
  constructor(props:PropType){
        super(props)
        this.state = {show:false}
    }
  start(){ 
    this.setState({
      show:true
    })
  }
  end(){ 
    this.setState({
      show:false
    })
  }
  render(){
    return (
      <div className='myprogress' style={this.state.show? {display:'block'}:{display:'none'}}>
        <div className='myprogress-bar'>
          <div className='myprogress-peg'></div>
        </div>
      </div>
      )
  }
}
let div = document.createElement('div');
document.body.appendChild(div);
 
let Progress = ReactDOM.render(React.createElement(
  Box
),div);
export default Progress
import React, { Component } from 'react';
import './progress.css'
interface PropType{

}
interface StateType{
  show:boolean
}
class Progress extends Component<PropType, StateType> {
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

export default Progress
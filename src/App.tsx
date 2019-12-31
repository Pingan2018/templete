import React from 'react';
import './App.css';
import { Button, message } from 'antd'

function App() {
  const handleClick = () => {
    message.info('This is a normal message');
  };
  return (
    <div className="App">
      <Button type='primary' onClick={handleClick}>点击</Button>
    </div>
  );
}

export default App;

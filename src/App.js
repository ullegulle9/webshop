import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MyProducts from './Products.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MyProducts />
      </div>
    );
  }
}

export default App;

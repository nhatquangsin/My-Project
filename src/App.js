import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ImageView from './components/ImageView';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ImageView />
      </div>
    );
  }
}

export default App;

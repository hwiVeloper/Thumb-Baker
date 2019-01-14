import React, { Component } from 'react';
import Navigation from './components/Navigation';
import Maker from './components/Maker';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Maker />
      </div>
    );
  }
}

export default App;

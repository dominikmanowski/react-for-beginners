import React, { Component } from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from '../sample-fishes';

class App extends Component {
  state = {
    fishes: {},
    order: {}
  };
  addFish = fish => {
    // 1. Take a copy of the current state, to avoid mutating it
    const fishes = { ...this.state.fishes };
    // 2. Add new fish to fishes object
    fishes[`fish${Date.now()}`] = fish;
    // 3. Set the new fishes object to state
    this.setState({
      fishes
    });
  };
  loadSampleFishes = () => {
    this.setState({fishes: sampleFishes})
  }
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
        </div>
        <Order />
        <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes}/>
      </div>
    );
  }
}

export default App;

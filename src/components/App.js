import React, { Component } from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends Component {
  state = {
    fishes: {},
    order: {}
  };

  componentDidMount() {
    const { params } = this.props.match;
    // first reinstate our localStorage
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorage) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
    console.log("Updated!");
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

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

  updateFish = (key, updatedFish) => {
    // 1. Take a copy ot the current state
    const fishes = this.state.fishes;
    // 2. Update that copied state
    fishes[key] = updatedFish;
    // 3. Set that copied state to state
    this.setState({ fishes });
  };

  deleteFish = key => {
    // 1. Take a copy of state
    const fishes = { ...this.state.fishes };
    // 2. Update the copied state
    fishes[key] = null; //setting it to null lets firebase delete it
    // 3 Update state
    this.setState({ fishes });
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  addToOrder = key => {
    // 1. Take a copy of state
    const order = { ...this.state.order };
    // 2. Enter add to order, or update the number in our order
    order[key] = order[key] + 1 || 1;
    // 3. Call setState to update our state object
    this.setState({ order });
  };

  removeFromOrder = key => {
    // 1. Take a copy of state
    const order = { ...this.state.order };
    // 2. Remove that item from order
    delete order[key];
    // 3. Call setState to update our state object
    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        {/* <Order {...this.state} /> */}
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
        />
      </div>
    );
  }
}

export default App;

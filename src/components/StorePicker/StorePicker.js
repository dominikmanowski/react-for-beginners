import React, { Component } from "react";
import PropTypes from "prop-types";
import { getFunName } from "../../helpers";

class StorePicker extends Component {
  myInput = React.createRef();

  static propTypes = {
    history: PropTypes.object
  };

  goToStore = e => {
    e.preventDefault();
    // Get the value from the input via ref
    const storeName = this.myInput.current.value;
    // Change the view to store via react router push() method
    this.props.history.push(`store/${storeName}`);
  };

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter a Store</h2>
        <input
          type="text"
          ref={this.myInput}
          required
          placeholder="Store Name"
          defaultValue={getFunName()}
        />
        <button type="submit">Visit Store →</button>
      </form>
    );
  }
}

export default StorePicker;

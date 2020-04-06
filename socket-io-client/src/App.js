import React, { Component } from "react";
import socketIOClient from "socket.io-client";

class App extends Component {
  constructor() {
    super();
    this.state = {
      manchester: [],
      kashmir: [],
      endpoint: "http://127.0.0.1:4001",
    };
  }

  componentDidMount() {
    console.log("incomponentdidmount");
    const { endpoint } = this.state;

    const socket = socketIOClient(endpoint);

    socket.on("FromAPI", (data) =>
      this.setState({
        manchester: data.current.temp_f,
      })
    );

    // socket.on("FromAPI2", (data) => {
    //   console.log(data);
    //   this.setState({
    //     kashmir: data.current.temperature,
    //   });
    // });
  }

  render() {
    console.log(this.state.manchester, "manchester");
    const { manchester } = this.state;
    return (
      <div style={{ textAlign: "center" }}>
        {manchester ? (
          <p>The temperature in Manchester is: {this.state.manchester} °F</p>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}

export default App;

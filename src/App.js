import React, { Component } from "react";

import Application from "./Randomize.jsx";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="main">
        <header> RANDOMIZE! </header>
        <p>
          {" "}
          We help you make those hard choices. All you have to do is supply the
          question and we will pick from a list of choices you gave. Hopefully
          we make the right decision...
        </p>
        <Application />
      </div>
    );
  }
}

export default App;

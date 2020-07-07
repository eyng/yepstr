import React from "react";
import { CardGame } from "components";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header>
        <h2>Deck of Cards</h2>
      </header>

      <div>
        <CardGame />
      </div>
    </div>
  );
}

export default App;

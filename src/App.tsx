import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [flipResult, setFlipResult] = useState(0)

  // returns 0 or 1
  const flipCoin = (): void => setFlipResult(Math.floor(Math.random() * 2))

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {flipResult}
        </p>
        <button
          className="App-link"
          onClick={flipCoin}
        >
          Flip Coin
        </button>
      </header>
    </div>
  );
}

export default App;

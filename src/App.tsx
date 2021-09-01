import './App.css';
import React, { ReactElement, useState } from 'react';

function App() {
  const [flipResult, setFlipResult] = useState(0)
  const [numberOfCoins, setNumberOfCoins] = useState(1)
  const [haveThumb, setHaveThumb] = useState(false)

  // returns 0 or 1
  const flipCoin = (): number => Math.floor(Math.random() * 2)

  const flipCoins = (): void => {
    if (!haveThumb) {
      const results: number[] = []
      for (let i = 0; i < numberOfCoins; i++) {
        results.push(flipCoin())
      }
      const totalWins = results.reduce((sum, current) => sum + current, 0)
      setFlipResult(totalWins)
    } else {
      const results: [number, number][] = []
      for (let i = 0; i < numberOfCoins; i++) {
        results.push([flipCoin(), flipCoin()])
      }
      const totalWins = results.reduce((sum, current) => sum + (current[0] * current[1]), 0)
      setFlipResult(totalWins)
    }
  }

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>): void => setNumberOfCoins(event.target.valueAsNumber)
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>): void => setHaveThumb(event.target.checked)

  return (
    <div className="App">
      <header className="App-header">
        <p>
          {flipResult}
        </p>
        <input
          type="number"
          name="numberOfCoins"
          id="numberOfCoins"
          value={numberOfCoins}
          onChange={handleNumberChange} />
        <input 
          type="checkbox"
          name="haveThumb"
          id="haveThumb"
          onChange={handleCheckboxChange} />
        <button
          className="App-link"
          onClick={flipCoins}
        >
          Flip Coin{(numberOfCoins > 1) && (<span>s</span>)}
        </button>
      </header>
    </div>
  );
}

export default App;

import './App.css';
import React, { useState } from 'react';

function App() {
  const [flipResult, setFlipResult] = useState(0)
  const [numberOfCoins, setNumberOfCoins] = useState(1)
  const [haveThumb, setHaveThumb] = useState(false)
  const [results, setResults] = useState<JSX.Element[]>()

  // returns 0 or 1
  const flipCoin = (): number => Math.floor(Math.random() * 2)

  const flipCoins = (n :number): [number, JSX.Element[]] => {
    if (!haveThumb) {
      const r: number[] = []
      for (let i = 0; i < n; i++) {
        r.push(flipCoin())
      }
      const totalWins = r.reduce((sum, current) => sum + current, 0)
      return [totalWins, r.map(v => (<span>{v}</span>))]
    } else {
      const r: [number, number][] = []
      for (let i = 0; i < n; i++) {
        r.push([flipCoin(), flipCoin()])
      }
      const totalWins = r.reduce((sum, current) => sum + (current[0] || current[1] ? 1 : 0), 0)
      return [totalWins, r.map(vs => (<span>({vs[0]}, {vs[1]})</span>))]
    }
  }

  const reflipWins = (coinsToFlip: number = numberOfCoins): [number, JSX.Element[]] => {
    const [wins, res] = flipCoins(coinsToFlip)
    let totalWins = wins
    let totalRes = res
    if (wins > 0) {
      const [newWins, newRes] = reflipWins(wins)
      totalWins += newWins
      totalRes = totalRes.concat(newRes)
    }
    return [totalWins, totalRes]
  }

  const flipManyce = (): void => {
    const [totalWins, r] = reflipWins()
    setResults(r)
    setFlipResult(totalWins)
  }

  const flipOnce = (): void => {
    const [totalWins, r] = flipCoins(numberOfCoins)
    setResults(r)
    setFlipResult(totalWins)
  }

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>): void => setNumberOfCoins(event.target.valueAsNumber)
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>): void => setHaveThumb(event.target.checked)

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Total wins: {flipResult}
        </p>
        <label htmlFor="numberOfCoins"></label>
        <input
          type="number"
          name="numberOfCoins"
          id="numberOfCoins"
          value={numberOfCoins}
          onChange={handleNumberChange} />
        <label htmlFor="haveThumb">Krark's Thumb in play</label>
        <input 
          type="checkbox"
          name="haveThumb"
          id="haveThumb"
          onChange={handleCheckboxChange} />
        <button
          className="App-link"
          onClick={flipOnce}
        >
          Flip Coin{(numberOfCoins > 1) && (<span>s</span>)}
        </button>
        <button
          className="App-link"
          onClick={flipManyce}
        >
          Reflip Wins
        </button>
        <p>Results</p>
        {results}
      </header>
    </div>
  );
}

export default App;

import React, { useState } from 'react'
import './App.scss';
import Road from './components/Road/Road'
import GameOverProvider from './providers/GameOverProvider'
import GameOverModal from './components/GameOverModal/GameOverModal'
import WindowSizeProvider from './providers/WindowSizeProvider'

function App() {

    const [retries, setRetries] = useState<number>(0)

    return (
        // by changing the key value, child components will reset
        <div className="App" key={retries}>
            <GameOverProvider>
                <WindowSizeProvider>
                    <Road />
                </WindowSizeProvider>
                <GameOverModal onRetryClick={() => {
                    setRetries((prevValue: number) => prevValue + 1)
                }}/>
            </GameOverProvider>
        </div>
    )
}

export default App;

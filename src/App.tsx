import React, { useState } from 'react'
import './App.scss';
import Road from './Road'
import GameOverProvider from './GameOverProvider'
import GameOverModal from './GameOverModal'

function App() {

    const [retries, setRetries] = useState<number>(0)

    return (
        // by changing the key value, child components will reset
        <div className="App" key={retries}>
            <GameOverProvider>
                <Road />
                <GameOverModal onRetryClick={() => {
                    setRetries((prevValue: number) => prevValue + 1)
                }}/>
            </GameOverProvider>
        </div>
    )
}

export default App;

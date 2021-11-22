import React, { useState, useEffect } from 'react'
import './App.scss';
import Road from './Road'
import GameOverProvider from './GameOverProvider'
import GameOverModal from './GameOverModal'

function App() {

    const [resetApp, setResetApp] = useState<number>(0)

    return (
        <div className="App" key={resetApp}>
            <GameOverProvider>
                <Road />
                <GameOverModal onRetryClick={() => {
                    setResetApp((prevValue: number) => prevValue + 1)
                }}/>
            </GameOverProvider>
        </div>
    )
}

export default App;

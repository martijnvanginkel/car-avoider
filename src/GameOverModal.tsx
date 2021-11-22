import React from 'react'
import './GameOverModal.scss'
import { useGameOver } from './GameOverProvider'

interface Props {}

const GameOverModal: React.FC<Props> = () => {
    
    const isGameOver = useGameOver()

    if (isGameOver) {
        return null
    }

    return (
        <div className="Container">
            <div className="Modal">
            </div>
            <div className="ButtonsContainer">
                <button className="Button">Button 1</button>
            </div>
        </div>
    )
}

export default GameOverModal 

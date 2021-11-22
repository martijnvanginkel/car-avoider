import React from 'react'
import './GameOverModal.scss'
import { useGameOver } from './GameOverProvider'

interface Props {
    onRetryClick: () => void
}

const GameOverModal: React.FC<Props> = ({ onRetryClick }) => {
    
    const isGameOver = useGameOver()

    if (!isGameOver) {
        return null
    }

    return (
        <>
            <div className="ModalBackground">
            </div>
            <div className="ModalAligner">
                <button className="Button" onClick={onRetryClick}>Retry</button>
            </div>
        </>
    )
}

export default GameOverModal 

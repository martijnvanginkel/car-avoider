import React from 'react'
import './GameOverModal.scss'
import { useGameOver } from './../../providers/GameOverProvider'

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
                <button className="Button" onClick={onRetryClick}>RETRY</button>
            </div>
        </>
    )
}

export default GameOverModal 

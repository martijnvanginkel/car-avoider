import React, { useContext, useState } from 'react'

interface GameOverContextType {
    isGameOver: boolean
}

interface GameOverUpdateContextType {
    toggleGameIsOver: () => void
}

interface Props {
    children: React.ReactNode
}

const GameOverContext = React.createContext<GameOverContextType | null>(null)
const GameOverUpdateContext = React.createContext<GameOverUpdateContextType | null>(null)

export const useGameOver = () => {
    return useContext(GameOverContext)
}

export const useGameOverUpdate = () => {
    return useContext(GameOverUpdateContext)
}

const GameOverProvider: React.FC<Props> = ({ children }) => {
    const [isGameOver, setIsGameOver] = useState<boolean>(false)

    function toggleGameIsOver() {
        setIsGameOver(true)
    }

    return (
        <GameOverContext.Provider value={{ isGameOver }}>
            <GameOverUpdateContext.Provider value={{ toggleGameIsOver }}>
                {children}
            </GameOverUpdateContext.Provider>
        </GameOverContext.Provider>
    )
}

export default GameOverProvider

import React, { useContext, useState } from 'react'

interface GameOverContextType {
    isGameOver: boolean
}

interface Props {
    children: React.ReactNode
}

const GameOverContext = React.createContext<GameOverContextType | null>(null)

export const useGameOver = () => {
    return useContext(GameOverContext)
}

const GameOverProvider: React.FC<Props> = ({ children }) => {
    const [isGameOver, setIsGameOver] = useState<boolean>(false)

    return (
        <GameOverContext.Provider value={{ isGameOver }}>
            {children}
        </GameOverContext.Provider>
    )
}

export default GameOverProvider

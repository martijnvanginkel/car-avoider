import React, { useContext, useState } from 'react'

interface GameOverContextType {
    isGameOver: boolean
}

const GameOverContext = React.createContext<GameOverContextType | null>(null)
x
interface Props {
    children: React.ReactNode
}

const GameOverProvider: React.FC<Props> = ({ children }) => {
    const [isGameOver, setIsGameOver] = useState<boolean>(false)


    return (
        <GameOverContext.Provider value={{ isGameOver: isGameOver }}>
            {children}
        </GameOverContext.Provider>
    )
}

export default GameOverProvider

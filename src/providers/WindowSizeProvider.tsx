import React, { useContext, useState, useEffect } from 'react'

interface WindowSizeContextType {
    width: number 
    height: number
}

interface Props {
    children: React.ReactNode
}

const WindowSizeContext = React.createContext<WindowSizeContextType>({ width: 0, height: 0 })

export const useWindowSize = () => {
    return useContext(WindowSizeContext)
}

const WindowSizeProvider: React.FC<Props> = ({ children }) => {
    const [windowSize, setWindowSize] = useState<WindowSizeContextType>({ width: 0, height: 0 })
    
    useEffect(() => {
        function updateSize() {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight})
        }
        window.addEventListener('resize', updateSize)
        updateSize()

        return () => window.removeEventListener('resize', updateSize)
    }, [])

    return (
        <WindowSizeContext.Provider value={windowSize}>
            {children}
        </WindowSizeContext.Provider>
    )
}

export default WindowSizeProvider

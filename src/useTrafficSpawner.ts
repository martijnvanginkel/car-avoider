import { useState, useEffect, useRef } from 'react'
import usePlayerPosition, { Position } from './usePlayerPosition'
import { useGameOver, useGameOverUpdate } from './GameOverProvider'

export interface TrafficObject {
    id: string
    position: Position
    speed: number
}

function useTrafficSpawner() {
    const initialTrafficState: TrafficObject[] = []
    const [trafficObjects, setTrafficObjects] = useState<TrafficObject[]>(initialTrafficState)
    const trafficRef = useRef(initialTrafficState)
    
    const isGameOver = useGameOver()
    const position: Position = usePlayerPosition() 

    useEffect(() => {
        trafficRef.current = trafficObjects 
    })
    
    useEffect(() => {
        if (isGameOver) {
            return
        }
        const interval = setInterval(() => {
            setTrafficObjects([...trafficRef.current,
                { id: getUniqueId(), position: Position.center, speed: 3 }
            ])
        }, 2000)
        return () => clearInterval(interval)
    }, [isGameOver])

    function getUniqueId() {
        return new Date().getTime().toString()
    }
    
    function removeTrafficObject(id: string) {
        const filtered = trafficObjects.filter(trafficObject => trafficObject.id !== id)
        setTrafficObjects(filtered)
    }
 
    return {
        trafficObjects,
        removeTrafficObject
    }
}

export default useTrafficSpawner

import { useState, useEffect, useRef } from 'react'
import { Position } from './usePlayerPosition'
import { useGameOver } from './GameOverProvider'

export interface TrafficObject {
    id: string
    position: Position
}

function useTrafficSpawner() {
    const initialstate: TrafficObject[] = []
    const [trafficObjects, setTrafficObjects] = useState<TrafficObject[]>(initialstate)
    const trafficRef = useRef(initialstate)
    const isGameOver = useGameOver()

    useEffect(() => {
        trafficRef.current = trafficObjects 
    })
    
    useEffect(() => {
        if (isGameOver) {
            return
        }
        const interval = setInterval(() => {
            setTrafficObjects([...trafficRef.current,
                { id: getUniqueId(), position: Position.left }
            ])
        }, 5000)
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

import { useState, useEffect, useRef } from 'react'
import { Position } from './usePlayerPosition'

export interface TrafficObject {
    id: string
    position: Position
}

function useTrafficSpawner() {
    const initialstate: TrafficObject[] = []
    const [trafficObjects, setTrafficObjects] = useState<TrafficObject[]>(initialstate)
    const trafficRef = useRef(initialstate)

    useEffect(() => {
        trafficRef.current = trafficObjects 
    })
    
    useEffect(() => {
        setInterval(() => {
            setTrafficObjects([...trafficRef.current,
                { id: getUniqueId(), position: Position.left }
            ])
        }, 5000);
    }, [])

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

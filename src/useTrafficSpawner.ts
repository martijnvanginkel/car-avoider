import { useState, useEffect, useRef } from 'react'
import usePlayerPosition, { Position } from './usePlayerPosition'
import { useGameOver, useGameOverUpdate } from './GameOverProvider'
import { getRandomNumber } from './utils/numbers'
import { getTwoRandomPositions } from './utils/randomPosition'
import { getUniqueId } from './utils/uniqueId'
import { getMinInBetweenSpawnTime} from './utils/speedCalculations'
import { createSpawnInstruction } from './utils/createSpawnInstruction'

export interface TrafficObject {
    id: string
    position: Position
    speed: number
    multiplier: number
}

interface Lanes {
    [Position.left]: LaneStatus 
    [Position.center]: LaneStatus 
    [Position.right]: LaneStatus 
}

interface LaneStatus {
    occupied: boolean
}

const speed = 10 

function useTrafficSpawner() {
    const initialTrafficState: TrafficObject[] = []
    const [trafficObjects, setTrafficObjects] = useState<TrafficObject[]>(initialTrafficState)
    const trafficRef = useRef(initialTrafficState)

    const [lanes, setLanes] = useState<Lanes>({
        [Position.left]: { occupied: false },
        [Position.center]: { occupied: false },
        [Position.right]: { occupied: false }
    })


    const isGameOver = useGameOver()
    const position: Position = usePlayerPosition() 

    useEffect(() => {
        trafficRef.current = trafficObjects 
    })

    useEffect(() => {
        const lines = createSpawnInstruction().reverse()
        const waitTime = getMinInBetweenSpawnTime(speed)

        console.log('lines')
        let index = 0

        setTimeout(() => {
            setTrafficObjects([...trafficRef.current,
                {
                    id: getUniqueId(),
                    position: Position.center,
                    speed: 10,
                    multiplier: 2 
                }
            ])
        }, 1000)

        const interval = setInterval(() => {

            const line = lines[index]
            const newObjects: TrafficObject[] = []
            
            if (!line) {
                return
            }

            Object.entries(line).forEach(([position, value]) => {
                if (value !== 0) {
                    newObjects.push({
                        id: getUniqueId(),
                        position: position as Position,
                        speed: speed,
                        multiplier: value
                    })    
                }
            })

            index++

//            setTrafficObjects([...trafficRef.current,
//                ...newObjects
//            ])
       }, waitTime) 

        return () => clearInterval(interval)
    }, [])

    function setLaneOccupied(lane: Position, occupied: boolean) {
        setLanes(prevState => {
            return {
                ...prevState,
                [Position[lane]]: { occupied: occupied } 
            }
        })
    }
 
    function removeTrafficObject(id: string) {
        const filtered = trafficObjects.filter(trafficObject => trafficObject.id !== id)
        setTrafficObjects(filtered)
    }
 
    return {
        trafficObjects,
        lanes,
        setLaneOccupied,
        removeTrafficObject
    }
}

export default useTrafficSpawner

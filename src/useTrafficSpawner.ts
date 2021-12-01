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
}

interface Lanes {
    [Position.left]: LaneStatus 
    [Position.center]: LaneStatus 
    [Position.right]: LaneStatus 
}

interface LaneStatus {
    occupied: boolean
}

const baseSpeed = 10 

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
        const lines = createSpawnInstruction()
        const waitTime = getMinInBetweenSpawnTime(baseSpeed)
        console.log(waitTime)

//        console.log('lines')
//        console.log(lines)
        let index = 0

        // speed = 10
        // blocks = 8
        // halfway = 4 blocks
        // 1 block time with speed 10 = 1.25
        //

        // 8 blocks
        // 4 blocks is halfway
        // 10 seconds takes 8 blocks, 1 block takes (8/ 10)
        // 4 blocks takes (10

        const interval = setInterval(() => {

            const line = lines[index]
            const newObjects: TrafficObject[] = []
            
            if (!line) {
                return
            }

//            console.log(line)

            Object.entries(line).forEach(([position, value]) => {
                const extraSpeed = value <= 1 ? 0 : (baseSpeed / 8) * value
//                console.log(baseSpeed + extraSpeed)
                if (value !== 0) {
                    newObjects.push({
                        id: getUniqueId(),
                        position: position as Position,
                        speed: baseSpeed - extraSpeed
                    })    
                }
            })

            index++

            setTrafficObjects([...trafficRef.current,
                ...newObjects
            ])
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

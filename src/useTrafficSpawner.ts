import { useState, useEffect, useRef } from 'react'
import usePlayerPosition, { Position } from './usePlayerPosition'
import { useGameOver, useGameOverUpdate } from './GameOverProvider'
import { getRandomNumber } from './utils/numbers'
import { getTwoRandomPositions } from './utils/randomPosition'
import { getUniqueId } from './utils/uniqueId'

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

    function getRandomSpawnTime() {
        const randomNumber = Math.floor(Math.random() * 6) + 4
        return randomNumber * 1000
    }

    function getRandomSpeed() {
        return Math.floor(Math.random() * 11) + 9 
    }

    useEffect(() => {
        trafficRef.current = trafficObjects 
    })

    useEffect(() => {
        if (isGameOver) {
            return
        }

        const interval = setInterval(() => {
            const { positionOne, positionTwo } = getTwoRandomPositions()
            const id1 = getUniqueId()
            const id2 = getUniqueId()

            const object1 = {
                id: id1,
                position: positionOne,
                speed: getRandomSpeed() 
            }

            const object2 = {
                id: id2,
                position: positionTwo,
                speed: getRandomSpeed() 
            }

            setTrafficObjects([...trafficRef.current,
                object1,
                object2
            ])

        }, getRandomSpawnTime())
        return () => clearInterval(interval)
    }, [isGameOver])

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

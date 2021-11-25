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
    speed: number
}

function useTrafficSpawner() {
    const initialTrafficState: TrafficObject[] = []
    const [trafficObjects, setTrafficObjects] = useState<TrafficObject[]>(initialTrafficState)
    const trafficRef = useRef(initialTrafficState)

    const initialLanesState: Lanes = {
        [Position.left]: { occupied: false, speed: 0 },
        [Position.center]: { occupied: false, speed: 0 },
        [Position.right]: { occupied: false, speed: 0 }
    }
    const [lanes, setLanes] = useState<Lanes>(initialLanesState)
    const lanesRef = useRef(initialLanesState)

    const [spawnHistory, setSpawnHistory] = useState<any>({
        [Position.left]: { speed: 0 },
        [Position.center]: { speed: 0 },
        [Position.right]: { speed: 0 }
    })

    const [lastSpawn, setLastSpawn] = useState<any>({ [Position.left]: 0, [Position.right]: 1 })

    const isGameOver = useGameOver()
    const position: Position = usePlayerPosition() 

    function getRandomSpawnTime() {
        const randomNumber = Math.floor(Math.random() * 4) + 2
        return randomNumber * 1000
    }

    function getRandomSpeed() {
        return Math.floor(Math.random() * 11) + 7 
    }

    useEffect(() => {
        trafficRef.current = trafficObjects 
    })

    useEffect(() => {

        const getSpeedNotSameAsLast = () => {
            let speed = getRandomSpeed()
            while (speed === lastSpawn[Position.left].speed) {
                speed = getRandomSpeed()
            }
            return speed
        }

        const speed = getSpeedNotSameAsLast() 
        console.log(speed)

        const id = getUniqueId()
        console.log('use effect')
        const timer = setTimeout(() => {
            setTrafficObjects([...trafficRef.current,
                {
                    id: id, 
                    position: Position.left,
                    speed: 5 
                }
            ])

            setLastSpawn({ [Position.left]: speed, [Position.right]: lastSpawn[Position.right] })
           
        }, 5000) 


        return () => clearTimeout(timer)
        
    }, [lastSpawn[Position.left]])

    // have an useEffect for every Lane, then have it all have its own setTimeout and it will calculate it's own timeout based on what it previously was if its set at all

//    useEffect(() => {
//        if (isGameOver) {
//            return
//        }
//
//        // als speed 10 is van de eerste en speed 5 van de tweede, dan hitten ze elkaar in het midden van de lane
//        // wanneer de eerste speed 10 is, moet de tweede met speed 5 minimaal 5 wachten
//        // wanneer de eerste speed 11 is en de tweede speed 8, moet de tweede minimaal 3 wachten
//        // dus vorige speed - huidige speed = minimale spawn tijd
//        const { positionOne, positionTwo } = getTwoRandomPositions()
//
//        const timer = setTimeout(() => {
//            const id1 = getUniqueId()
//            const id2 = getUniqueId()
//
//            const object1 = {
//                id: id1,
//                position: Position.left,
//                speed: 10 
//            }
//
//            const object2 = {
//                id: id2,
//                position: Position.left,
//                speed: 6 
//            }
//
//            setTrafficObjects([...trafficRef.current,
//                object1,
//                object2
//            ])
//
//            setSpawnHistory(prev => prev + 1)
//
//        }, 5000) // getRandomSpawnTime
//        return () => clearTimeout(timer)
//    }, [spawnHistory, isGameOver])
    //
    function setLaneSpeed(lane: Position, speed: number) {
        setLanes(prevState => {
            return {
                ...prevState,
                [Position[lane]]: { occupied: lanes[Position[lane]].occupied, speed: speed } 
            }
        })
    }

    function setLaneOccupied(lane: Position, occupied: boolean) {
        setLanes(prevState => {
            return {
                ...prevState,
                [Position[lane]]: { occupied: occupied, speed: lanes[Position[lane]].speed } 
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

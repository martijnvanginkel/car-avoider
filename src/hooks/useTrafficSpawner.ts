import { useState, useEffect, useRef } from 'react'
import { Position } from './usePlayerPosition'
import { getUniqueId } from './../utils/uniqueId'
import { getMinInBetweenSpawnTime, getBonusSpeed, getRandomVarietySpeed } from './../utils/speedCalculations'
import { createSpawnInstruction } from './../utils/createSpawnInstruction'
import { useGameOver } from '../providers/GameOverProvider'

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

const baseSpeed = 9

function useTrafficSpawner() {
    const initialTrafficState: TrafficObject[] = []
    const [trafficObjects, setTrafficObjects] = useState<TrafficObject[]>(initialTrafficState)
    const trafficRef = useRef(initialTrafficState)
    
    const isGameOver = useGameOver()
    const gameOverRef = useRef(isGameOver)

    const [lanes, setLanes] = useState<Lanes>({
        [Position.left]: { occupied: false },
        [Position.center]: { occupied: false },
        [Position.right]: { occupied: false }
    })

    useEffect(() => {
        trafficRef.current = trafficObjects
        gameOverRef.current = isGameOver
    })

    useEffect(() => {
        const timer = setTimeout(() => {
            const lines = createSpawnInstruction()
            const waitTime = getMinInBetweenSpawnTime(baseSpeed)
    
            let index = 0
    
            const interval = setInterval(() => {
                if (gameOverRef.current) {
                    clearTimeout(timer)
                    clearInterval(interval)
                    return
                }

                const line = lines[index]
                const newObjects: TrafficObject[] = []
                
                if (!line) {
                    return
                }
    
                Object.entries(line).forEach(([position, value]) => {
                    const bonusSpeed = getBonusSpeed(baseSpeed, value)
                    const varietySpeed = getRandomVarietySpeed()
    
                    if (value !== 0) {
                        newObjects.push({
                            id: getUniqueId(),
                            position: position as Position,
                            speed: (baseSpeed - bonusSpeed) + varietySpeed
                        })    
                    }
                })
    
                index++
    
                setTrafficObjects([...trafficRef.current,
                    ...newObjects
                ])
    
            }, waitTime) 
            return () => clearInterval(interval)
        }, 5000)
        return () => clearTimeout(timer)
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

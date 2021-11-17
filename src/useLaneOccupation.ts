import { useState, useEffect, useRef } from 'react'
import usePlayerPosition, { Position } from './usePlayerPosition'
import { useGameOver, useGameOverUpdate } from './GameOverProvider'

interface Lanes {
    [Position.left]: { occupied: boolean }
    [Position.center]: { occupied: boolean }
    [Position.right]: { occupied: boolean }
}

function useLaneOccupation() {
 
    const position = usePlayerPosition()
    const toggleGameIsOver = useGameOverUpdate()
    console.log(position)

    const [lanes, setLanes] = useState<Lanes>({
        [Position.left]: { occupied: false },
        [Position.center]: { occupied: false },
        [Position.right]: { occupied: false }
    })

    useEffect(() => {
        const currentLane = lanes[position]
        if (currentLane.occupied) {
            toggleGameIsOver?.toggleGameIsOver() 
            console.log('is occupied')
        }
    }, [position])

    function setLaneOccupied(lane: Position, occupied: boolean) {
        setLanes(prevState => {
            return {
                ...prevState,
                [Position[lane]]: { occupied: occupied } 
            }
        })
    }

    return {
        setLaneOccupied
    }
}

export default useLaneOccupation 

import './Road.scss'
import React, { useState, useEffect } from 'react'
import useWindowSize from './useWindowSize'
import useTrafficSpawner, { TrafficObject } from './useTrafficSpawner'
import usePlayerPosition, { Position } from './usePlayerPosition'
import PlayerCar from './PlayerCar'
import EnemyCar from './EnemyCar'
import { useGameOverUpdate } from './GameOverProvider'

interface Lanes {
    [Position.left]: { occupied: boolean }
    [Position.center]: { occupied: boolean }
    [Position.right]: { occupied: boolean }
}

const Road: React.FC = () => {
    const { height } = useWindowSize()
    const { trafficObjects, removeTrafficObject } = useTrafficSpawner()
    const position: Position = usePlayerPosition() 
    const toggleGameIsOver = useGameOverUpdate()    

    const [lanes, setLanes] = useState<Lanes>({
        [Position.left]: { occupied: false },
        [Position.center]: { occupied: false },
        [Position.right]: { occupied: false }
    })


    // make difference between if player moves in or if a car moves in
    // if player moves in, check first if occupied before moving player and add different class to midst stop animation
    useEffect(() => {
        const currentLane = lanes[position]
        if (currentLane.occupied) {
            toggleGameIsOver?.toggleGameIsOver() 
            console.log('is occupied')
        }
    }, [position, lanes])

    return (
        <div className="Road" style={getRoadWidth()}>
            {renderTraffic()}
            <PlayerCar position={position} />
        </div>
    )

    function renderTraffic() {
        return trafficObjects.map((trafficObject: TrafficObject) => {
            return (
                <EnemyCar
                    key={trafficObject.id}
                    position={trafficObject.position}
                    onFinished={() => removeTrafficObject(trafficObject.id)}
                    onEnterHitZone={() => setLaneOccupied(trafficObject.position, true)}
                    onExitHitZone={() => setLaneOccupied(trafficObject.position, false)}
                />
            )
        })
    }

    function setLaneOccupied(lane: Position, occupied: boolean) {
        setLanes(prevState => {
            return {
                ...prevState,
                [Position[lane]]: { occupied: occupied } 
            }
        })
    }

    function getRoadWidth() {
        const roadWidth = (height / 2)
        return { width: `${roadWidth}px` }
    }
}

export default Road

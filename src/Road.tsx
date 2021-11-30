import './Road.scss'
import React, { useState, useEffect } from 'react'
import useWindowSize from './useWindowSize'
import useTrafficSpawner, { TrafficObject } from './useTrafficSpawner'
import usePlayerPosition, { Position } from './usePlayerPosition'
import PlayerCar from './PlayerCar'
import EnemyCar from './EnemyCar'
import { useGameOverUpdate } from './GameOverProvider'

const Road: React.FC = () => {
    const { height } = useWindowSize()

    const position: Position = usePlayerPosition() 
    const { trafficObjects, lanes, removeTrafficObject, setLaneOccupied } = useTrafficSpawner()
    const toggleGameIsOver = useGameOverUpdate()    

//    // make a car crashed into other car boolean and set as prop to PlayerCar with according css state
    useEffect(() => {
        const currentLane = lanes[position]
        if (currentLane.occupied) {
            toggleGameIsOver?.toggleGameIsOver() 
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
                    speed={trafficObject.speed}
                    multiplier={trafficObject.multiplier}
                    onFinished={() => removeTrafficObject(trafficObject.id)}
                    onEnterHitZone={() => setLaneOccupied(trafficObject.position, true)}
                    onExitHitZone={() => setLaneOccupied(trafficObject.position, false)}
                />
            )
        })
    }

    function getRoadWidth() {
        const roadWidth = (height / 2)
        return { width: `${roadWidth}px` }
    }
}

export default Road

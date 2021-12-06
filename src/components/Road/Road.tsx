import './Road.scss'
import React, { useState, useEffect } from 'react'
import { useWindowSize } from './../../providers/WindowSizeProvider'
import useTrafficSpawner, { TrafficObject } from './../../hooks/useTrafficSpawner'
import usePlayerPosition, { Position } from './../../hooks/usePlayerPosition'
import PlayerCar from './../Car/PlayerCar/PlayerCar'
import EnemyCar from './../Car/EnemyCar'
import { useGameOverUpdate } from './../../providers/GameOverProvider'
import { getRoadWidth } from './../../utils/resolutionSizes'

const Road: React.FC = () => {
    const { width, height} = useWindowSize()
    const { trafficObjects, lanes, removeTrafficObject, setLaneOccupied } = useTrafficSpawner()
    const toggleGameIsOver = useGameOverUpdate()    

    const { position, direction } = usePlayerPosition() 

    useEffect(() => {
        const newLane = lanes[position]
        if (newLane.occupied) {
            toggleGameIsOver?.toggleGameIsOver() 
        }
    }, [lanes])

    useEffect(() => {
        const newLane = lanes[position]
        if (newLane.occupied) {
            toggleGameIsOver?.toggleGameIsOver() 
        }
    }, [position])

    return (
        <>
            {renderRoadSideArea(Position.left)}
            <div className="Road" style={getRoadWidthStyle()}>
                {renderRoadLines()}
                {renderTraffic()}
                <PlayerCar position={position} />
            </div>
            {renderRoadSideArea(Position.right)}
        </>
    )

    function renderRoadSideArea(side: Position.left | Position.right) {

        const border = {
            [Position.left]: { borderWidth: '0 0 0 2px', justifyContent: 'flex-end' },
            [Position.right]: { borderWidth: '0 2px 0 0', justifyContent: 'flex-start' }
        }

        return (
            <div className="RoadSideArea" style={border[side]}>
                <div className="RoadSideOuterLine"></div>
                <div className="RoadSideInnerLine"></div>
            </div>
        )
    }

    function renderRoadLines() {
        return (
            <div className="RoadLineContainer">
                <div className="RoadLine"></div>
                <div className="RoadLine"></div>
            </div>
        )
    }

    function renderTraffic() {
        return trafficObjects.map((trafficObject: TrafficObject) => {
            return (
                <EnemyCar
                    key={trafficObject.id}
                    position={trafficObject.position}
                    speed={trafficObject.speed}
                    onFinished={() => removeTrafficObject(trafficObject.id)}
                    onEnterHitZone={() => setLaneOccupied(trafficObject.position, true)}
                    onExitHitZone={() => setLaneOccupied(trafficObject.position, false)}
                />
            )
        })
    }

    function getRoadWidthStyle() {
        const roadWidth = getRoadWidth(width, height)
        return { width: `${roadWidth}px` }
    }
}

export default Road

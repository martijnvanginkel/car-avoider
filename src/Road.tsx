import './Road.scss'
import React, { useEffect } from 'react'
import { useWindowSize } from './WindowSizeProvider'
import useTrafficSpawner, { TrafficObject } from './useTrafficSpawner'
import usePlayerPosition, { Position } from './usePlayerPosition'
import PlayerCar from './PlayerCar'
import EnemyCar from './EnemyCar'
import { useGameOverUpdate } from './GameOverProvider'
import { getRoadWidth } from './utils/resolutionSizes'

const Road: React.FC = () => {
    const { width, height} = useWindowSize()
    const position: Position = usePlayerPosition() 

//    const [crashingInto, setCrashingInto] = useState<boolean>(false)

    const { trafficObjects, lanes, removeTrafficObject, setLaneOccupied } = useTrafficSpawner()
    const toggleGameIsOver = useGameOverUpdate()    

    // make a car crashed into other car boolean and set as prop to PlayerCar with according css state
    useEffect(() => {
        const currentLane = lanes[position]
        if (currentLane.occupied) {
            toggleGameIsOver?.toggleGameIsOver() 
        }
    }, [lanes])

    useEffect(() => {
        const currentLane = lanes[position]
        if (currentLane.occupied) {
            toggleGameIsOver?.toggleGameIsOver() 
        }
    }, [position])

    return (
        <div className="Road" style={getRoadWidthStyle()}>
            {renderRoadLines()}
            {renderTraffic()}
            <PlayerCar position={position} />
        </div>
    )

    function renderRoadLines() {
        return (
            <div className="RoadLineContainer">
                <div className="RoadLine"></div>
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

import './Road.scss'
import { useState, useEffect } from 'react'
import Car from './Car'
import useWindowSize from './useWindowSize'
import TopDownMover from './TopDownMover'
import useTrafficSpawner, { TrafficObject } from './useTrafficSpawner'
import usePlayerPosition, { Position } from './usePlayerPosition'
import PlayerCar from './PlayerCar'
import EnemyCar from './EnemyCar'

interface Lanes {
    [Position.left]: { occupied: boolean }
    [Position.center]: { occupied: boolean }
    [Position.right]: { occupied: boolean }
}

function Road() {
    const { height } = useWindowSize()
    const { trafficObjects, removeTrafficObject } = useTrafficSpawner()
    const position: Position = usePlayerPosition() 

    const [lanes, setLanes] = useState<Lanes>({
        [Position.left]: { occupied: false },
        [Position.center]: { occupied: false },
        [Position.right]: { occupied: false }
    })

    useEffect(() => {
        const lane = lanes[position]
        if (lane.occupied) {
            console.log('is occupied')
        }
        else {
            console.log('not occupied')
        }
    }, [position])

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
                    onFinished={() => {
                        removeTrafficObject(trafficObject.id)
                    }}
                    onEnterHitZone={() => {
                        setLanes((prevState) => {
                            return {
                                ...prevState,
                                [Position.left]: { occupied: true }
                            }
                        })
                    }}
                    onExitHitZone={() => {
                        setLanes((prevState) => {
                            return {
                                ...prevState,
                                [Position.left]: { occupied: false }
                            }
                        })
                    }}
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

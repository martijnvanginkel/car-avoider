import './Road.scss'
import Car from './Car'
import useWindowSize from './useWindowSize'
import TopDownMover from './TopDownMover'
import useTrafficSpawner, { TrafficObject } from './useTrafficSpawner'
import { Position } from './usePlayerPosition'
import PlayerCar from './PlayerCar'

function Road() {
    
    const { height } = useWindowSize()
    const { trafficObjects, removeTrafficObject } = useTrafficSpawner()

    return (
        <div className="Road" style={getRoadWidth()}>
            {renderTraffic()}
            <PlayerCar />
        </div>
    )

    function renderTraffic() {
        return trafficObjects.map((trafficObject: TrafficObject) => {
            return (
                <TopDownMover
                    key={trafficObject.id}
                    id={trafficObject.id}
                    onAnimationEnd={(id: string) => {
                        removeTrafficObject(id)
                    }}
                >
                    <Car />
                </TopDownMover>
            )
        })
    }

    function getRoadWidth() {
        const roadWidth = (height / 2)
        return { width: `${roadWidth}px` }
    }
}

export default Road

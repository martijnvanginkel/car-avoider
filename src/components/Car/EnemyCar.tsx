import TopDownMover from './../TopDownMover/TopDownMover'
import Car from './Car'
import { Position } from './../../hooks/usePlayerPosition'

interface Props {
    position: Position
    speed: number
    onFinished: () => void
    onEnterHitZone: () => void
    onExitHitZone: () => void
}

const EnemyCar: React.FC<Props> = ({
    position,
    speed,
    onFinished,
    onEnterHitZone,
    onExitHitZone
}) => {
    return (
        <TopDownMover
            position={position}
            speed={speed}
            onAnimationEnd={() => {
                onFinished()
            }}
            enterHitZone={onEnterHitZone}
            exitHitZone={onExitHitZone}
        >
            <Car position={position} />
        </TopDownMover>
    )
}

export default EnemyCar 

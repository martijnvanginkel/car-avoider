import TopDownMover from './TopDownMover'
import Car from './Car'
import { Position } from './usePlayerPosition'

interface Props {
    position: Position
    speed: number
    multiplier: number
    onFinished: () => void
    onEnterHitZone: () => void
    onExitHitZone: () => void
}

const EnemyCar: React.FC<Props> = ({
    position,
    speed,
    multiplier,
    onFinished,
    onEnterHitZone,
    onExitHitZone
}) => {
    return (
        <TopDownMover
            position={position}
            speed={speed}
            multiplier={multiplier}
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

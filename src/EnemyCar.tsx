import TopDownMover from './TopDownMover'
import Car from './Car'
import { Position } from './usePlayerPosition'

interface Props {
    position: Position
    onFinished: () => void
    onEnterHitZone: () => void
    onExitHitZone: () => void
}

const EnemyCar: React.FC<Props> = ({ position, onFinished, onEnterHitZone, onExitHitZone }) => {
    return (
        <TopDownMover
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

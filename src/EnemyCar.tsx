import TopDownMover from './TopDownMover'
import Car from './Car'

interface Props {
    onFinished: (id: string) => void
    onEnterHitZone: () => void
    onExitHitZone: () => void
}

function EnemyCar<Props>({ onFinished, onEnterHitZone, onExitHitZone }) {
    return (
        <TopDownMover
            onAnimationEnd={() => {
                onFinished()
            }}
            enterHitZone={onEnterHitZone}
            exitHitZone={onExitHitZone}
        >
            <Car />
        </TopDownMover>
    )
}

export default EnemyCar 

import React, { useEffect } from 'react'
import './TopDownMover.scss'
import { useGameOver } from './GameOverProvider'

interface Props {
    onAnimationEnd: () => void
    children: React.ReactNode
    enterHitZone: () => void
    exitHitZone: () => void
}

const TopDownMover: React.FC<Props> = ({ onAnimationEnd, children, enterHitZone, exitHitZone }) => {

    const isGameOver = useGameOver() 
    useEffect(() => {
        setTimeout(() => {
            console.log('enter hitzone')
            enterHitZone()
        }, 5000)
        setTimeout(() => {
            exitHitZone()
        }, 6500)
    }, [])

    return (
        <div className="Container">
            <div
                className="MajorMovement"
                onAnimationEnd={() => {
                    onAnimationEnd()
                }}
                style={pauseAnimation()}
            >
                    <div className="LayoutMovement" style={pauseAnimation()}>
                        {children}
                    </div>
            </div>
        </div>
    )

    function pauseAnimation() {
        const playState = isGameOver ? 'paused' : ''
        return { animationPlayState: playState }
    }
}

export default TopDownMover 

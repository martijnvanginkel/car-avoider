import React, { useEffect } from 'react'
import './TopDownMover.scss'

interface Props {
    onAnimationEnd: () => void
    children: React.ReactNode
    enterHitZone: () => void
    exitHitZone: () => void
}

const TopDownMover: React.FC<Props> = ({ onAnimationEnd, children, enterHitZone, exitHitZone }) => {

    useEffect(() => {
        setTimeout(() => {
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
                    <div className="LayoutMovement">
                        {children}
                    </div>
            </div>
        </div>
    )

    function pauseAnimation() {
        return { animationPlayState: 'paused' }
    }
}

export default TopDownMover 

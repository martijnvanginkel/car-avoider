import React, { useEffect } from 'react'
import './TopDownMover.scss'

interface Props {
    onAnimationEnd: (id: string) => void
    children: React.ReactNode
    enterHitZone: () => void
    exitHitZone: () => void
}

function TopDownMover<Props>({ onAnimationEnd, children, enterHitZone, exitHitZone }) {

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
                onAnimationEnd={(value) => {
                    onAnimationEnd()
                }}>
                    <div className="LayoutMovement">
                        {children}
                    </div>
            </div>
        </div>
    )
}

export default TopDownMover 

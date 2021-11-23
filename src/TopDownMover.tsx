import React, { useEffect } from 'react'
import './TopDownMover.scss'
import { useGameOver } from './GameOverProvider'
import { Position } from './usePlayerPosition'
import { getHitZoneTime } from './utils/speedCalculations'

interface Props {
    position: Position
    speed: number
    onAnimationEnd: () => void
    children: React.ReactNode
    enterHitZone: () => void
    exitHitZone: () => void
}

const TopDownMover: React.FC<Props> = ({
    position,
    speed,
    onAnimationEnd,
    children,
    enterHitZone,
    exitHitZone
}) => {
    const isGameOver = useGameOver() 

    useEffect(() => {
        const enterTimer = setTimeout(() => {
            console.log('enter hitzone')
            enterHitZone()
        }, 5000)
        const exitTimer = setTimeout(() => {
            exitHitZone()
        }, 6500)
        return () => {
            clearTimeout(enterTimer)
            clearTimeout(exitTimer)
        }
    }, [])

    return (
        <div className="Container" style={getPositionStyle()}>
            <div
                className="MajorMovement"
                onAnimationEnd={() => {
                    onAnimationEnd()
                }}
                style={getAnimationDetails()}
            >
                    <div className="LayoutMovement" style={getAnimationDetails()}>
                        {children}
                    </div>
            </div>
        </div>
    )

    function getPositionStyle() {
        const styles = {
            [Position.left]: 'flex-start',
            [Position.center]: 'center',
            [Position.right]: 'flex-end'
        }
        return { 'justify-content': styles[position] }
    }


    function getAnimationDetails() {
        const playState = isGameOver ? 'paused' : ''
        return {
            animationPlayState: playState,
            animationDuration: `${speed * 1000}ms`
        }
    }
}

export default TopDownMover 

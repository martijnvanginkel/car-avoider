import React, { useEffect } from 'react'
import './TopDownMover.scss'
import { useGameOver } from './../../providers/GameOverProvider'
import { Position } from './../../hooks/usePlayerPosition'
import { getEnterHitZoneTime, getExitHitZoneTime } from './../../utils/speedCalculations'

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
        const enterTime = getEnterHitZoneTime(speed)
        const exitTime = getExitHitZoneTime(speed)
        const enterTimer = setTimeout(() => enterHitZone(), enterTime)
        const exitTimer = setTimeout(() => exitHitZone(), exitTime)
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
                style={getSpeedAnimationDetails()}
            >
                <div className="CenterLayout">
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
        return { 'justifyContent': styles[position] }
    }

    function getSpeedAnimationDetails() {
        const playState = isGameOver ? 'paused' : ''
        return {
            animationPlayState: playState,
            animationDuration: `${speed * 1000}ms`
        }
    }
}

export default TopDownMover 

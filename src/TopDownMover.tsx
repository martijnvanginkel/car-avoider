import React, { useEffect } from 'react'
import './TopDownMover.scss'
import { useGameOver } from './GameOverProvider'
import { Position } from './usePlayerPosition'
import { getHitZoneTime, getMinInBetweenSpawnTime } from './utils/speedCalculations'

interface Props {
    position: Position
    speed: number
    multiplier: number
    onAnimationEnd: () => void
    children: React.ReactNode
    enterHitZone: () => void
    exitHitZone: () => void
}

const TopDownMover: React.FC<Props> = ({
    position,
    speed,
    multiplier,
    onAnimationEnd,
    children,
    enterHitZone,
    exitHitZone
}) => {
    const isGameOver = useGameOver() 
    console.log(multiplier, ' here')

    useEffect(() => {
        const enterTimer = setTimeout(() => {
            console.log('enter')
            enterHitZone()
        }, getHitZoneTime(speed).enter)
        const exitTimer = setTimeout(() => {
            console.log('exit')
            exitHitZone()
        }, getHitZoneTime(speed).exit)
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
                <div className="CenterLayout" style={getMultiplierAnimationDetails()}>
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

    function getMultiplierAnimationDetails() {
        const y = multiplier === 1 ? 0 : (multiplier * 100) - 100
        return {
            transform: 'translateY(-50%)' 
        }
    }
}

export default TopDownMover 

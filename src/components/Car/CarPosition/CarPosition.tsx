import React from 'react'
import './CarPosition.scss'
import { useWindowSize } from './../../../providers/WindowSizeProvider'
import { Position }  from './../../../hooks/usePlayerPosition'
import { useGameOver } from './../../../providers/GameOverProvider'
import { getCarSize } from './../../../utils/resolutionSizes'

interface Props {
    children: React.ReactNode    
    position: Position
}

const CarPosition: React.FC<Props> = ({ children, position }) => {
    const { width, height } = useWindowSize()
    const isGameOver = useGameOver()

    return (
        <div className={renderOuterMoveClasses()} style={pauseAnimation()}>
            <div className={renderInnerMoveClasses()} style={getCarSizeStyle()}>
                <div className="Padding">
                    {children}
                </div>
            </div> 
        </div>
    )

    function pauseAnimation() {
        const playState = isGameOver ? 'paused' : ''
        return { animationPlayState: playState }
    }

    function getCarSizeStyle() {
        const carSize = getCarSize(width, height)
        return { width: `${carSize.width}px`, height: `${carSize.height}px` }
    }

    function renderOuterMoveClasses() {
        const classes = {
            [Position.right]: "OuterMoveRight",
            [Position.center]: "OuterMoveCenter",
            [Position.left]: "OuterMoveLeft"
        } 
        return `OuterMove ${classes[position]}`
    }

    function renderInnerMoveClasses() {
        const classes = {
            [Position.right]: "InnerMoveRight",
            [Position.center]: "InnerMoveCenter",
            [Position.left]: "InnerMoveLeft"
        }
        return `InnerMove ${classes[position]}`
    }
}

export default CarPosition 

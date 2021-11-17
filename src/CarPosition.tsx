import React from 'react'
import './CarPosition.scss'
import useWindowSize from './useWindowSize'
import { Position }  from './usePlayerPosition'
import { useGameOver } from './GameOverProvider'
import useLaneOccupation from './useLaneOccupation'

interface Props {
    children: React.ReactNode    
    position: Position
}

const CarPosition: React.FC<Props> = ({ children, position }) => {
    const { height } = useWindowSize()
    const isGameOver = useGameOver()

    return (
        <div className={renderOuterMoveClasses()} style={pauseAnimation()}>
            <div className={renderInnerMoveClasses()} style={getCarSize()}>
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

    function getCarSize() {
        const roadWidth = (height / 2)
        const carWidth = (roadWidth / 3)
        const carHeight = (carWidth * 1.5)
        return { width: `${carWidth}px`, height: `${carHeight}px` }
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

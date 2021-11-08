import './Player.scss'
import { useEffect, useState } from 'react'
import useWindowSize from './useWindowSize'
import usePlayerPosition, { Position }  from './usePlayerPosition'
import Car from './Car'

function Player() {

    const position: Position = usePlayerPosition() 
    const { width } = useWindowSize()

    return (
        <div className={renderWrapperClasses()}>
            <div className={renderPlayerClasses()} style={getCarContainerHeight()}>
                <Car />
            </div> 
        </div>
    )

    function getCarContainerHeight() {
        const height = ((width / 2) / 3) * 1.5
        return { height: `${height}px` }
    }

    function renderPlayerClasses() {
        const classes = {
            [Position.right]: "PlayerRight",
            [Position.center]: "PlayerCenter",
            [Position.left]: "PlayerLeft"
        }

        return `Player ${classes[position]}`
    }

    function renderWrapperClasses() {
        const classes = {
            [Position.right]: "WrapperRight",
            [Position.center]: "WrapperCenter",
            [Position.left]: "WrapperLeft"
        } 
        return `Wrapper ${classes[position]}`
    }
}

export default Player 

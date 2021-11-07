import './Player.scss'
import { useEffect, useState } from 'react'
import useWindowSize from './useWindowSize'
import Car from './Car'

enum Position {
    left = 'left',
    center = 'center',
    right = 'right'
}

enum ArrowKey {
    left = 'left',
    right = 'right'
}

function Player() {

    const [position, setPosition] = useState<Position>(Position.center)
    const { width } = useWindowSize()

    useEffect(() => { 
        const handleKeyEvent = (event: any) => {
            if (event.key === 'ArrowLeft') {
                changePosition(ArrowKey.left)
            }

            if (event.key === 'ArrowRight') {
                changePosition(ArrowKey.right)
            }
        }
        window.addEventListener('keydown', handleKeyEvent)
        return () => {
            window.removeEventListener('keydown', handleKeyEvent)
        }
    })

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

    function changePosition(key: ArrowKey) {
        if (position !== Position.center) {
            setPosition(Position.center)
            return
        }

        if (key === ArrowKey.left) {
            setPosition(Position.left)
        }

        if (key === ArrowKey.right) {
            setPosition(Position.right)
        }
    }
}

export default Player 

import { useEffect, useState } from 'react'
import { useGameOver } from './../providers/GameOverProvider'

export enum Position {
    left = 'left',
    center = 'center',
    right = 'right'
}

enum Direction {
    left = 'left',
    right = 'right'
}

function usePlayerPosition() {
    const [position, setPosition] = useState<{ position: Position, direction: Direction }>({ position: Position.center, direction: Direction.left })
    const isGameOver = useGameOver() 

    console.log(position)

    useEffect(() => { 
        if (isGameOver === true) {
            return
        }
        const handleKeyEvent = (event: any) => {
            if (event.repeat) {
                return
            }
            if (event.key === 'ArrowLeft') {
                changePosition(Direction.left)
            }

            if (event.key === 'ArrowRight') {
                changePosition(Direction.right)
            }
        }
        window.addEventListener('keydown', handleKeyEvent)
        return () => {
            window.removeEventListener('keydown', handleKeyEvent)
        }
    })

    function changePosition(direction: Direction) {
        if (position.position !== Position.center) {
            setPosition({ position: Position.center, direction: direction })
            return
        }

        if (direction === Direction.left) {
            setPosition({ position: Position.left, direction: direction })
        }

        if (direction === Direction.right) {
            setPosition({ position: Position.right, direction: direction })
        }
    }

    return position
}

export default usePlayerPosition 

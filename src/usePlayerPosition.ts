import { useEffect, useState } from 'react'

export enum Position {
    left = 'left',
    center = 'center',
    right = 'right'
}

enum ArrowKey {
    left = 'left',
    right = 'right'
}

function usePlayerPosition() {
    const [position, setPosition] = useState<Position>(Position.center)

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

    return position
}

export default usePlayerPosition 

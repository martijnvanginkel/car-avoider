import { Position } from './../usePlayerPosition'
import { getRandomNumber } from './numbers'

export const getRandomPosition = () => {
    const positions = Object.values(Position)
    const randomNumber = getRandomNumber(0, 3) 
    const position: Position = Position[positions[randomNumber]] 
    return position
}

export const getTwoRandomPositions = () => {
    const positionOne = getRandomPosition()
    let positionTwo = positionOne 

    while (positionTwo === positionOne) {
        positionTwo = getRandomPosition()
    }
    return { positionOne, positionTwo }
}


import { Position } from './../hooks/usePlayerPosition'
import { isEvenNumber } from './numbers'

interface Line {
    [Position.left]: number
    [Position.center]: number
    [Position.right]: number
}

const createLines = (): Line[] => {
    const length = 10
    const lines: Line[] = []

    const line: Line = {
        [Position.left]: 1,
        [Position.center]: 1,
        [Position.right]: 1
    }

    for (let index = 0; index < length; index++) {
        lines.push(line)
    }

    return lines
}

const getRandomPosition = (currentPosition: Position) => {
    if (currentPosition === Position.left) {
        return Position.center
    }
    if (currentPosition === Position.right) {
        return Position.center
    }

    const randomNumber: number = Math.floor(Math.random() * 2)
    const choices = [Position.left, Position.right]

    return choices[randomNumber]
}

const makePathThroughLines= (lines: Line[]): Line[] => {
    let lastPosition: Position = Position.center 

    const cutout = lines.map((line: Line, index: number) => {
        line = { ...line, [Position[lastPosition]]: 0 }

        if (isEvenNumber(index)) {
            const randomPosition: Position = getRandomPosition(lastPosition)
            line = { ...line, [Position[randomPosition]]: 0 } 
            lastPosition = randomPosition
        }
        return line 
    })

    return cutout 
}

const addVarietyToLane = (lane: number[]): number[] => {
    let valuesInARow: number = 0 

    lane.forEach((value: number, index: number) => {
        if (value !== 0) {
            valuesInARow++
        }

        const loopBack = () => {
            for (let i = 0; i < valuesInARow; i++) {
                if (i === valuesInARow - 1) {
                    lane[index - i] = valuesInARow
                    break;
                }
                lane[index - i] = 0
            }
            valuesInARow = 0
        }

        if (valuesInARow > 2) {
            loopBack()
            return
        }
        
        if (index === lane.length - 1) {
            loopBack()
            return
        }

        if (lane[index + 1] === 0) {
            loopBack()
            return
        }
    })

    return lane
}

// 1, 2 or 3 occupied spots will be replaced with one that is x the amount that are stacked
// [1, 1, 1] in a row will become [3, 0, 0], [1, 0, 1, 1] will become [1, 0, 2, 0]
// this is to make it feel like the traffic has more 'variety' while still having the same layed out path
const makeTrafficVary = (lines: Line[]): Line[] => {
    const leftLane = lines.map(line => line[Position.left])
    const centerLane = lines.map(line => line[Position.center])
    const rightLane = lines.map(line => line[Position.right])

    const variedLeftLane = addVarietyToLane(leftLane) 
    const variedCenterLane = addVarietyToLane(centerLane)
    const variedRightLane = addVarietyToLane(rightLane)

    const newLines: Line[] = []
    
    for (let i = 0; i < leftLane.length; i++) {
        newLines.push({
            [Position.left]: variedLeftLane[i],
            [Position.center]: variedCenterLane[i],
            [Position.right]: variedRightLane[i]
        }) 
    }

    return newLines 
}

export const createSpawnInstruction = (): Line[] => {
    const filledLines = createLines()
    const linesWithPath = makePathThroughLines(filledLines)
    const linesWithVariety = makeTrafficVary(linesWithPath)

    return linesWithVariety.reverse()
}


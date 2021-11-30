import { Position } from './../usePlayerPosition'
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

const makeTrafficVary = (lines: Line[]): Line[] => {

    const transformLane = (lanePosition: Position): number[] => {
        const lane: number[] = lines.map(line => line[lanePosition])
        let carsInARow = 0
        lane.forEach((value: number, index: number) => {
            if (value === 0 || index === lane.length - 1) {
                for (let i = 0; i < carsInARow; i++) {
                    if (i === (carsInARow - 1)) {
                        lane[index - (i + 1)] = carsInARow
                    } else {
                        lane[index - (i + 1)] = 0
                    }
                }
                carsInARow = 0
                return
            }

            if (value === 1) {
                carsInARow += 1     
            }
        })
        return lane
    }

    const leftLane = transformLane(Position.left)
    const centerLane = transformLane(Position.center)
    const rightLane = transformLane(Position.right)

    const newLines: Line[] = []
    
    for (let i = 0; i < leftLane.length; i++) {
        newLines.push({
            [Position.left]: leftLane[i],
            [Position.center]: centerLane[i],
            [Position.right]: rightLane[i]
        }) 
    }

    return newLines 
}

export const createSpawnInstruction = (): Line[] => {
    const filledLines = createLines()
    const linesWithPath = makePathThroughLines(filledLines)
    const linesWithVariety = makeTrafficVary(linesWithPath) 
    return linesWithVariety
}


import { Position } from './../usePlayerPosition'

interface Line {
    [Position.left]: number
    [Position.center]: number
    [Position.right]: number
}

function createLines(): Line[] {
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

function getRandomPosition(currentPosition: Position) {
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

function isEvenNumber(num: number) {
    return (num % 2) === 0
}

function makePathThroughLines(filledLines: Line[]): Line[] {
    let lastPosition: Position = Position.center 

    const cutout = filledLines.map((line: Line, index: number) => {
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

export const createSpawnInstruction = (): Line[] => {
    const filledLines = createLines()

    const linesWithPath = makePathThroughLines(filledLines)
    console.log(linesWithPath)
    return linesWithPath
}


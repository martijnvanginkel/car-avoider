import React, { useState } from 'react'
import './GameView.scss';
import Road from './../Road/Road'

interface ScoredPoint {
//    id: string     
}

function GameView() {

    const [scoredPoints, setScoredPoints] = useState<number[]>([])

    return (
        <div className="Background">
            {renderPointScorer()}
            <Road
                playerPassedObject={() => scoredPoint()} 
            />
        </div>
    )

    function renderPointScorer() {
        return (
            <div className="PointsContainer">
                <div className="Point">2</div>
                {renderPoints()}
            </div>
        )
 //       return scoredPoints.map(scoredPoint => {
 //           return <div className="ScoredPoint">+1</div>
 //       })
    }

    function renderPoints() {
        return scoredPoints.map((scoredPoint: number, index: number) => {
            return <div key={index} className="Point">1</div>
        })
    }
    

    function scoredPoint() {
        console.log('scored point')
 //       const stateCopy = [...scoredPoints]
//        stateCopy.push(1)

//        setScoredPoints([1, 2, 3])

        setScoredPoints(prevValue => [...prevValue, 1])
//        console.log('scored point')
    }
}

export default GameView

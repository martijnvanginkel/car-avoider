import React, { useState } from 'react'
import './GameView.scss';
import Road from './../Road/Road'
import { getUniqueId } from './../../utils/uniqueId'

interface ScoredPoint {
    id: string
}

function GameView() {

    const [scoredPoints, setScoredPoints] = useState<ScoredPoint[]>([])

    return (
        <div className="Background">
            {renderPointScorer()}
            <Road playerPassedObject={addPoint} />
        </div>
    )

    function renderPointScorer() {
        return (
            <div className="CenterPoints">
                <div className="PointsContainer">
                    {renderPoints()}
                </div>
            </div>
        )
    }

    function renderPoints() {
        return scoredPoints.map((scoredPoint: ScoredPoint) => {
            return (
                <div key={scoredPoint.id} className="Point" onAnimationEnd={() => {
                    removePoint(scoredPoint)
                }}>
                    +1
                </div>
            )
        })
    }
    

    function addPoint() {
        const newPoint: ScoredPoint = {
            id: getUniqueId()
        }
        setScoredPoints(prevValue => [...prevValue, newPoint])
    }

    function removePoint(scoredPoint: ScoredPoint) {
        const filtered = scoredPoints.filter(point=> point.id !== scoredPoint.id)
        setScoredPoints(filtered)
    }
}

export default GameView

import React, { useState } from 'react'
import './GameView.scss';
import Road from './../Road/Road'

interface ScoredPoint {
//    id: string     
}

function GameView() {

    const [scoredPoints, setScoredPoints] = useState<ScoredPoint[]>([])

    return (
        <div className="Background">
            {renderScoredPoints()}
            <Road
                playerPassedObject={scoredPoint}                
            />
        </div>
    )

    function renderScoredPoints() {
        return scoredPoints.map(scoredPoint => {
            return <div className="ScoredPoint">+1</div>
        })
    }

    function scoredPoint() {
        setScoredPoints([...scoredPoints, {}])
        console.log('scored point')
    }
}

export default GameView

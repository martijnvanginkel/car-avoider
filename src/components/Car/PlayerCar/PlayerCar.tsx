import React from 'react'
import './PlayerCar.scss'
import Car from './../Car'
import { Position, Direction } from './../../../hooks/usePlayerPosition'

interface Props {
    position: Position
    crashedIntoSide?: Direction 
}

const PlayerCar: React.FC<Props> = ({ position, crashedIntoSide }) => {
    return (
        <div className="PlayerCar">
            <div className="CenterPlayerCar">
                <div style={getCrashedStyle()}>
                    <Car position={position} />
                </div>
            </div>
        </div>
    )

    function getCrashedStyle() {
        if (!crashedIntoSide) {
            return undefined 
        }
        if (crashedIntoSide === Direction.left) {
            return {
                transform: 'translateX(15%)'
            }
        }
        if (crashedIntoSide === Direction.right) {
            return {
                transform: 'translateX(-15%)'
            }
        }
    }
}

export default PlayerCar 

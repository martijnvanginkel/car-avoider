import React from 'react'
import './PlayerCar.scss'
import Car from './../Car'
import { Position } from './../../../hooks/usePlayerPosition'

interface Props {
    position: Position
    crashed?: 'left' | 'right'
}

const PlayerCar: React.FC<Props> = ({ position, crashed }) => {

    return (
        <div className="PlayerCar">
            <div className="CenterPlayerCar">
                    <Car position={position} />
            </div>
        </div>
    )
//    <div className="crash" style={getCrashedStyle()}>
//    </div>

    function getCrashedStyle() {
        return null
       if (!crashed) {
            return null 
        }
        if (crashed === 'left') {
            return {
                transform: 'translateX(-20%) rotate(-10deg)'
            }
        }
        if (crashed === 'right') {
            return {
                transform: 'translateX(20%) rotate(10deg)'
            }
        }
    }
}

export default PlayerCar 

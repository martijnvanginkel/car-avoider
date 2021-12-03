import React from 'react'
import './PlayerCar.scss'
import Car from './../Car'
import { Position } from './../../../hooks/usePlayerPosition'

interface Props {
    position: Position
}

const PlayerCar: React.FC<Props> = ({ position }) => {

    return (
        <div className="PlayerCar">
            <div className="InnerPlayerCar">
                <Car position={position}/>
            </div>
        </div>
    )
}

export default PlayerCar 

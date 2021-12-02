import React, { useState, useEffect } from 'react'
import './PlayerCar.scss'
import CarPosition from './CarPosition'
import CarLayout from './CarLayout'
import Car from './Car'
import { Position } from './usePlayerPosition'

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

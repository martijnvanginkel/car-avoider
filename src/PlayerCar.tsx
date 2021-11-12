import React from 'react'
import './PlayerCar.scss'
import CarPosition from './CarPosition'
import CarLayout from './CarLayout'
import { Position } from './usePlayerPosition'

interface Props {
    position: Position
}

const PlayerCar: React.FC<Props> = ({ position }) => {
    return (
        <div className="PlayerCar">
            <CarPosition position={position}>
                <CarLayout />
            </CarPosition>
        </div>
    )
}

export default PlayerCar 

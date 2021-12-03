import React from 'react'
import CarPosition from './CarPosition/CarPosition'
import CarLayout from './CarLayout/CarLayout'
import { Position } from './../../hooks/usePlayerPosition'

interface Props {
    position: Position
}

const Car: React.FC<Props> = (props: Props) => {

    

    return (
         <CarPosition position={props.position}>
             <CarLayout/>
        </CarPosition>
    )
}

export default Car 

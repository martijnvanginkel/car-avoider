import React from 'react'
import CarPosition from './CarPosition'
import CarLayout from './CarLayout'
import { Position } from './usePlayerPosition'

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

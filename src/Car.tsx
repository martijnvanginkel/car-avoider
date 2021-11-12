import CarPosition from './CarPosition'
import CarLayout from './CarLayout'
import { Position } from './usePlayerPosition'

interface Props {
    position: Position
}

function Car({ position }) {
    return (
         <CarPosition position={position}>
             <CarLayout/>
        </CarPosition>
    )
}

export default Car 

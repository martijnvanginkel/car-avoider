import './PlayerCar.scss'
import CarPosition from './CarPosition'
import CarLayout from './CarLayout'
import usePlayerPosition, { Position } from './usePlayerPosition'

function PlayerCar() {
    const position: Position = usePlayerPosition() 

    return (
        <div className="PlayerCar">
            <CarPosition position={position}>
                <CarLayout/>
            </CarPosition>
        </div>
    )
}

export default PlayerCar 

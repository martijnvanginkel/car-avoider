import './PlayerCar.scss'
import CarPosition from './CarPosition'
import CarLayout from './CarLayout'
import usePlayerPosition, { Position } from './usePlayerPosition'
import useWindowSize from './useWindowSize'

function PlayerCar() {
    const position: Position = usePlayerPosition() 
    const { height } = useWindowSize()

    return (
        <div className="PlayerCar">
            <CarPosition position={position}>
                <CarLayout/>
            </CarPosition>
        </div>
    )

}

export default PlayerCar 

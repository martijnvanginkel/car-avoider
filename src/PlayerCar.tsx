import './PlayerCar.scss'
import CarPosition from './CarPosition'
import CarLayout from './CarLayout'
import usePlayerPosition, { Position } from './usePlayerPosition'
import useWindowSize from './useWindowSize'

interface Props {
    position: Position
}

function PlayerCar<Props>({ position }) {
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

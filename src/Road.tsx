import { useRef } from 'react'
import './Road.scss'
import Car from './Car'
import { createTrafficSpawner } from './TrafficSpawner'

function Road() {

    const trafficSpawner = useRef(createTrafficSpawner())

//    const [cars, setCars] = useState<any>([])

    return (
        <div className="Road">
            <div className="Traffic">
            </div>
            <Car/>
        </div>
    );
}

export default Road

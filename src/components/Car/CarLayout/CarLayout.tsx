import React, { useState, useEffect } from 'react'
import './CarLayout.scss'
import { getRandomNumber } from './../../../utils/numbers'

const colors = {
    blue: '#3379b2',
    red: '#e91047',
    pink: '#fcb7a3',
    yellow: '#e9c339',
    green: '#8098a8',
    beige: '#feb7a3',
    white: '#72deda'
}

const redCar = {
    red: '#e91047',
    pink: '#aa017e',
    beige: '#feb7a3'
}

const blueCar = {
    lightBlue: '#3379b2',
    blue: '#204498',
    darkBlue: '#10123f',
    white: '#72deda',
    yellow: '#ed9f32'
}

interface CarSpecifications {
    name: string
    colors: {
        main: string
        headlight: string
        racingStripe: string
    }
    hasRacingStripe: boolean
}

const cars: CarSpecifications[] = [
    {
        name: 'Red Car',
        colors: {
            main: colors.red,
            headlight: colors.yellow,
            racingStripe: colors.beige
        },
        hasRacingStripe: true
    },
    {
        name: 'Blue Car',
        colors: {
            main: colors.lightBlue,
            headlight: colors.white,
            racingStripe: colors.blue
        },
        hasRacingStripe: true
    }
]

const CarLayout: React.FC = () => {

    const [carSpecifications, setCarSpecifications] = useState<CarSpecifications>(cars[0])

    useEffect(() => {
        const randomNumber = getRandomNumber(0, cars.length)         
        setCarSpecifications(cars[randomNumber])
    }, [])

    return (
        <div className="BaseLayer" style={setMainColor()}>
            <div className="BaseLayerRacingStripe" style={setRacingStripeColor()}></div>
            <div className="WindowLayer">
                <div className="RoofContainerLayer">
                    <div className="RoofLineTopLeft" style={setMainColor()}></div>
                    <div className="RoofLineTopRight" style={setMainColor()}></div>
                    <div className="RoofLineBottomLeft" style={setMainColor()}></div>
                    <div className="RoofLineBottomRight" style={setMainColor()}></div>
                    <div className="RoofLayer" style={setMainColor()}>
                        <div className="RoofLayerStripeContainer">
                            <div className="RoofLayerRacingStripe" style={setRacingStripeColor()}></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="HeadLightLeft" style={setHeadLightColor()}></div>
            <div className="HeadLightRight" style={setHeadLightColor()}></div>
        </div>
    )

    function setMainColor() {
        return {
            backgroundColor: carSpecifications.colors.main 
        }
    }

    function setHeadLightColor() {
        return {
            backgroundColor: carSpecifications.colors.headlight 
        }
    }

    function setRacingStripeColor() {
        return {
            backgroundColor: carSpecifications.colors.racingStripe
        }
    }
}

export default CarLayout 

import React from 'react'
import './CarLayout.scss'

const colors = {
    blue: '#3379b2',
    red: '#e91047',
    pink: '#fcb7a3',
    yellow: '#e9c339',
    green: '#8098a8'
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

const CarLayout: React.FC = () => {

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
            backgroundColor: colors.red 
        }
    }

    function setHeadLightColor() {
        return {
            backgroundColor: 'pink'
        }
    }

    function setRacingStripeColor() {
        return {
            backgroundColor: colors.pink 
        }
    }
}

export default CarLayout 

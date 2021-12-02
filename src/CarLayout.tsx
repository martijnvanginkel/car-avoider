import React from 'react'
import './CarLayout.scss'

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
            backgroundColor: 'blue'
        }
    }

    function setHeadLightColor() {
        return {
            backgroundColor: 'pink'
        }
    }

    function setRacingStripeColor() {
        return {
            backgroundColor: 'white'
        }
    }
}

export default CarLayout 

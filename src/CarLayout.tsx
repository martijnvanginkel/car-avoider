import React from 'react'
import './CarLayout.scss'

interface Props {
    color: string
}

const CarLayout: React.FC = () => {
    return (
        <div className="BaseLayer">
            <div className="WindowLayer">
                <div className="RoofContainerLayer">
                    <div className="RoofLineTopLeft"></div>
                    <div className="RoofLineTopRight"></div>
                    <div className="RoofLineBottomLeft"></div>
                    <div className="RoofLineBottomRight"></div>
                    <div className="RoofLayer"></div>
                </div>
            </div>
            <div className="HeadLightLeft"></div>
            <div className="HeadLightRight"></div>
        </div>
    )
}

export default CarLayout 

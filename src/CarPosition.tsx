import React from 'react'
import './CarPosition.scss'
import useWindowSize from './useWindowSize'
import usePlayerPosition, { Position }  from './usePlayerPosition'
import CarLayout from './CarLayout'

interface Props {
    children: React.ReactNode    
}

function CarPosition(props: Props) {

    const position: Position = usePlayerPosition() 
    const { width } = useWindowSize()

    return (
        <div className="Wrapper" style={getWrapperStyles(0)}>
            <div className={'Car'} style={getCarContainerHeight()}>
                {props.children}
            </div> 
        </div>
    )

    function getCarPosition(height: number) { 
    }

    function getWrapperStyles(height: number) {
        const horizontal = {
            [Position.right]: 100,
            [Position.center]: 50,
            [Position.left]: 0,
        }

        const xValue = horizontal[position].toString() + '%'
        const yValue = height.toString() + '%'

        return { transform: `translateX(${xValue}) translateY(${yValue})`}
    }

    function getCarContainerHeight() {
        const height = ((width / 2) / 3) * 1.5
        return { height: `${height}px` }
    }

    function renderHorizontalClass() {
        const classes = {
            [Position.right]: "CarRight",
            [Position.center]: "CarCenter",
            [Position.left]: "CarLeft"
        }

        return classes[position]
    }

    function renderWrapperClasses() {
        const classes = {
            [Position.right]: "WrapperRight",
            [Position.center]: "WrapperCenter",
            [Position.left]: "WrapperLeft"
        } 
        return `Wrapper ${classes[position]}`
    }
}

export default CarPosition 

import React, { useEffect } from 'react'
import './TopDownMover.scss'

interface Props {
    id: string
    onAnimationEnd: (id: string) => void
    children: React.ReactNode
}

function TopDownMover(props: Props) {

    useEffect(() => {
        setTimeout(() => {
            console.log('halfway2')
        }, 5000)
        setTimeout(() => {
            console.log('passed')
        }, 7330)
    }, [])

    return (
        <div className="Container">
            <div
                className="MajorMovement"
                onAnimationEnd={(value) => {
                    props.onAnimationEnd(props.id)
                }}>
                    <div className="LayoutMovement">
                        {props.children}
                    </div>
            </div>
        </div>
    )
}

export default TopDownMover 

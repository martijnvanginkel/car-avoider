export const getRoadWidth = (windowWidth: number, windowHeight: number) => {
    let roadWidth = windowHeight / 2
    if (roadWidth < windowWidth) {
        return roadWidth
    }
    roadWidth = (windowWidth / 3) * 2
    return roadWidth
}

export const getCarSize = (windowWidth: number, windowHeight: number) => {
    const roadWidth = getRoadWidth(windowWidth, windowHeight)
    const carWidth = roadWidth / 3
    const carHeight = carWidth * 1.5
    return {
        width: carWidth,
        height: carHeight 
    }
}

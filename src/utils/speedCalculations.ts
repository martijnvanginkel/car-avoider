// in ms
export const getHitZoneTime = (seconds: number) => {
    // speed = 10
    // halfway = 5
    // out of range = 6.5
    
    return {
        enter: (seconds / 2) * 1000,
        exit: ((seconds / 10) * 6.5) * 1000
    }
}

export const getMinInBetweenSpawnTime = (seconds: number) => {
    return (seconds * 0.15) * 1000
}

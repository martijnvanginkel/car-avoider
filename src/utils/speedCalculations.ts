export const getEnterHitZoneTime = (speed: number) => {
    return (speed / 2) * 1000
}

export const getExitHitZoneTime = (speed: number) => {
    const enterTime = getEnterHitZoneTime(speed)
    return enterTime + (((speed / 8) ) * 1000) // (speed / 8) / 2 
}

export const getMinInBetweenSpawnTime = (speed: number) => {
    return (speed / 8) * 1000
}

// speed that is added based on the space the car has in front of him
export const getBonusSpeed = (speed: number, multiplier: number) => {
    // cars with multiplier one have the base speed, no extra speed is added
    if (multiplier <= 1) {
        return 0
    }
    return (speed / 8) * multiplier
}

// random speed that is added to make cars with the same spawn time not go at the exact same speed
// this will have no further impact but will make it look more realistic like real traffic
export const getRandomVarietySpeed = () => {
    // random number between 0 and 0.3 with 3 decimals
    return Number((Math.random() * 0.3).toFixed(3))
}



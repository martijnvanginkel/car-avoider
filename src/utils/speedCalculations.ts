export const getEnterHitZoneTime = (speed: number) => {
    return (speed / 2) * 1000
}

export const getExitHitZoneTime = (speed: number) => {
    const enterTime = getEnterHitZoneTime(speed)
    return enterTime + (((speed / 8) / 2) * 1000)
}

export const getMinInBetweenSpawnTime = (speed: number) => {
    return (speed / 8) * 1000
}

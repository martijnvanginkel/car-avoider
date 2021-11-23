export const getHitZoneTime = (seconds: number) => {
    // speed = 10
    // halfway = 5
    // out of range = 6.5
    
    return {
        enterHitZoneTime: (seconds / 2),
        exitHitZoneTime: ((speed / 10) * 6.5), 
//        minInBetweenSpawnTime: (speed / 5)
    }
}

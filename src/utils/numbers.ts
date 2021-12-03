export const isEvenNumber = (num: number) => {
    return (num % 2) === 0
}

export const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * max) + min 
}

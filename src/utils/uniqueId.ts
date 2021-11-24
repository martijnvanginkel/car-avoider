export const getUniqueId = () => {
    return new Date().getTime().toString() + Math.random()
}


export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state')
        if (serializedState == null) {
            return undefined
        }
        return JSON.parse(serializedState)
    } catch (err) {
        return undefined
    }

}



export const saveState = (state) => {
    try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state',serializedState)}
    catch (err) {}
}


export const loadHeadline = (id,headlineInfo) => {
    try {
        const serializedState = localStorage.getItem(id)
        if (serializedState == null) {
            return headlineInfo
        }
        return JSON.parse(serializedState)
    } catch (err) {
        return headlineInfo
    }

}



export const saveHeadline = (id,headline) => {
    try {
    const serializedState = JSON.stringify(headline)
    localStorage.setItem(id,serializedState)}
    catch (err) {}
}
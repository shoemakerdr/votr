
const saveUserInfo = info => {
    localStorage.setItem('TOKEN', info.token)
    localStorage.setItem('USERNAME', info.username)
    localStorage.setItem('TOKEN_EXPIRATION', info.expiration)
}

const getUsername = () =>
    localStorage.getItem('USERNAME')

const getToken = () =>
    localStorage.getItem('TOKEN')

const getTokenExpiration = () =>
    localStorage.getItem('TOKEN_EXPIRATION')

const clearUserInfo = () => {
    localStorage.removeItem('TOKEN')
    localStorage.removeItem('USERNAME')
    localStorage.removeItem('TOKEN_EXPIRATION')
}

const isTokenExpired = () =>
    getTokenExpiration() < new Date()

const isLoggedIn = () => {
    const token = getToken
    return !!token && !isTokenExpired()
}

export {
    saveUserInfo,
    getUsername,
    getToken,
    getTokenExpiration,
    clearUserInfo,
    isLoggedIn,
}

export const getToken = () => {
    if(localStorage.getItem('access') && localStorage.getItem('refresh')) {
        return {
            refresh: localStorage.getItem('refresh'),
            access: localStorage.getItem('access'),
        }
    }
    return null
}

export const setToken = (access, refresh) => {
    localStorage.setItem('access', access)
    localStorage.setItem('refresh', refresh)
}

export const removeToken = () => {
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
}
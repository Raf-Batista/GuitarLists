const fetchUser = (userId) => {
    return dispatch => {
        dispatch({type: 'USER_SHOW', payload: userId})
    }
}

export default fetchUser
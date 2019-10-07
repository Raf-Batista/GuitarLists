const fetchGuitarToEdit = (userId, guitarId) => {
    return dispatch => {
        dispatch({type: 'FETCH_GUITAR', payload: {userId: userId, guitarId: guitarId}})
    }
}

export default fetchGuitarToEdit
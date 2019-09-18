const fetchSellers = () => {
  return dispatch => {
    return fetch('http://localhost:3000/sellers')
      .then(response => response.json())
      .then(data => {
        dispatch({type: 'ADD_SELLERS', payload: data})
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export default fetchSellers

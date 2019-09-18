const fetchGuitars = () => {
  return dispatch => {
    return fetch('http://localhost:3000/guitars')
      .then(response => response.json())
      .then(data => {
      dispatch({type: 'ADD_GUITARS', payload: data})
    })
    .catch(error => {
      console.log(error)
    })
  }
}

export default fetchGuitars

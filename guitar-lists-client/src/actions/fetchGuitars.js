const fetchGuitars = () => {
  return dispatch => {
    fetch('http://localhost:3000/guitars')
      .then(response => response.json)
      .then(data => {
      dispatch({type: 'ADD_GUITARS', payload: data})
    })
  }
}

export default fetchGuitars

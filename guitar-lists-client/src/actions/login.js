const login = (sellerInfo) => {
  return dispatch => {
    return fetch('http://localhost:3001/login', {
      method: 'POST',
      body: JSON.stringify(sellerInfo),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
    .then(data => {
      console.log(data)
    })
  }
}

export default login

const signup = (userInfo) => {
  return dispatch => {
    return fetch('http://localhost:3000/users', {
      method: 'POST',
      body: JSON.stringify(userInfo),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
    .catch(error => console.log(error))
  }
}

export default signup

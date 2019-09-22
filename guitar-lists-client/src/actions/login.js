const login = (userInfo) => {
  return dispatch => {
    return fetch('http://localhost:3000/login', {
      method: 'POST',
      body: JSON.stringify(userInfo),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
    .then(data => {
      if(data.token){
        localStorage.setItem('token', data.token)
        dispatch({type: 'LOGIN', payload: {id: data.id, email: data.email, username: data.username}})
      } else {
        return alert('invalid credentials')
      }

    })
    .catch(error => console.log(error))
  }
}

export default login

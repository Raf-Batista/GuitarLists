const loginCurrentUser = () => {
  return dispatch => {
    return fetch('http://localhost:3000/session', {
      method: 'POST',
      body: JSON.stringify({token: localStorage.getItem('token')}),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(data => {
        if(data.email && data.username && data.id){
          dispatch({type: 'LOGIN', payload: data})
        } else {
          return data.errors
        }

      })
    .catch(error => console.log(error))
  }
}

export default loginCurrentUser

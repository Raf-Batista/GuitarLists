const signup = (userInfo, history) => {
  return dispatch => {
    return fetch('http://localhost:3000/users', {
      method: 'POST',
      body: JSON.stringify({user: userInfo}),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(data => {
        if(data.email){
          dispatch({type: 'ADD_USER', payload: data})
          dispatch({type: 'LOGIN', payload: data})
        } else {
          return data.errors
        }

      })
    .catch(error => console.log(error))
  }
}

export default signup

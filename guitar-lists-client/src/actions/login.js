const login = (currentUser) => {
  return dispatch => {
    return fetch('http://localhost:3000/login', {
      method: 'POST',
      body: JSON.stringify(currentUser),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
    .then(data => {
      if(data.token){
        // localStorage.setItem('token', data.token)
        // if(location.pathname !== '/'){
        //   history.push('/')
        // }
        // const user = users.find(user => {
        //   if(user.id === data.id) {
        //     return user
        //   }
        // })

        // localStorage.setItem('currentUser', JSON.stringify(user))

        dispatch({type: 'LOGIN', payload: data})
      } else {
        return alert('invalid credentials')
      }

    })
    .catch(error => console.log(error))
  }
}

export default login

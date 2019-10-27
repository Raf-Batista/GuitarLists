const createGuitar = (guitar, currentUser, history) => {
  return dispatch => {
    if(currentUser.token){
      return fetch(`http://localhost:3000/users/${currentUser.id}/guitars`, {
        method: 'POST',
        body: JSON.stringify({guitar: guitar, token: currentUser.token}),
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
        .then(data => {
          if(!data.errors){
          dispatch({type: 'ADD_GUITAR', payload: data});
          history.push(`/users/${data.user_id}/guitars/${data.id}`)
          } else {
            return data.errors
          }

        })
      .catch(error => console.log(error))
    } else {
      console.log('An error has occured')
    }

  }
}

export default createGuitar

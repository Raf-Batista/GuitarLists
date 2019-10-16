const createGuitar = (guitar, currentUser, history) => {
  return dispatch => {
    if(localStorage.getItem('token')){
      return fetch(`http://localhost:3000/users/${currentUser.id}/guitars`, {
        method: 'POST',
        body: JSON.stringify({guitar: guitar, token: localStorage.getItem('token')}),
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
        .then(data => {
          if(!data.errors){
            currentUser.guitars.push(data)
            localStorage.setItem('currentUser', JSON.stringify(currentUser))
            dispatch({type: 'ADD_GUITAR', payload: data});
          history.push(`/users/${data.user_id}/guitars/${data.id}`)
          } else {
            return data.errors
          }

        })
      .catch(error => console.log(error))
    }

  }
}

export default createGuitar

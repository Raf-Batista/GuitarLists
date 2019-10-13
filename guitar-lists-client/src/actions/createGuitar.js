const createGuitar = (guitar, userId, history) => {
  return dispatch => {
    if(localStorage.getItem('token')){
      return fetch(`http://localhost:3000/users/${userId}/guitars`, {
        method: 'POST',
        body: JSON.stringify({guitar: guitar, token: localStorage.getItem('token')}),
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
    }

  }
}

export default createGuitar

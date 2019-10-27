const editGuitar = (guitar, history, currentUser) => {
    return dispatch => {
        if(currentUser.token){
            return fetch(`http://localhost:3000/users/${guitar.user_id}/guitars/${guitar.id}`, {
              method: 'PATCH',
              body: JSON.stringify({guitar, token: currentUser.token}),
              headers:{
                'Content-Type': 'application/json'
              }
            }).then(response => response.json())
              .then(data => {
                if(!data.errors){
                  dispatch({type: 'EDIT_GUITAR', payload: data});
                  history.push(`/users/${data.user_id}/guitars/${data.id}`)
                } else {
                  return data.errors
                }
      
              })
            .catch(error => console.log(error))
          }
      
    }
}

export default editGuitar
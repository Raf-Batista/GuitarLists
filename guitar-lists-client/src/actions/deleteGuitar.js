const deleteGuitar = (currentUser, guitarId, history) => {
    return dispatch => {
        if(currentUser.token){
            return fetch(`http://localhost:3000/users/${currentUser.id}/guitars/${guitarId}`, {
              method: 'DELETE',
              body: JSON.stringify({user_id: currentUser.id, id: guitarId, token: localStorage.getItem('token')}),
              headers:{
                'Content-Type': 'application/json'
              }
            }).then(response => response.json())
              .then(data => {
                if(!data.errors){
                  dispatch({type: 'DELETE_GUITAR', payload: guitarId});
                  history.push(`/users/${currentUser.id}`)
                } else {
                  return data.errors
                }
      
              })
            .catch(error => console.log(error))
          }
      
    }
}

export default deleteGuitar
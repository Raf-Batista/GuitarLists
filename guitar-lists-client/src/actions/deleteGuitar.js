const deleteGuitar = (currentUser, guitarId, history) => {
    return dispatch => {
        if(localStorage.getItem('token')){
            return fetch(`http://localhost:3000/users/${currentUser.id}/guitars/${guitarId}`, {
              method: 'DELETE',
              body: JSON.stringify({user_id: currentUser.id, id: guitarId, token: localStorage.getItem('token')}),
              headers:{
                'Content-Type': 'application/json'
              }
            }).then(response => response.json())
              .then(data => {
                if(!data.errors){
                  // see if there is a better solution this
                  currentUser.guitars = currentUser.guitars.filter(guitar => guitar.id !== guitarId)
                  localStorage.setItem('currentUser', JSON.stringify(currentUser))
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
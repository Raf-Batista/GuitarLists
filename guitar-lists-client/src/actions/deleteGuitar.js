const deleteGuitar = (userId, guitarId, history) => {
    return dispatch => {
        if(localStorage.getItem('token')){
            return fetch(`http://localhost:3000/users/${userId}/guitars/${guitarId}`, {
              method: 'DELETE',
              body: JSON.stringify({user_id: userId, id: guitarId, token: localStorage.getItem('token')}),
              headers:{
                'Content-Type': 'application/json'
              }
            }).then(response => response.json())
              .then(data => {
                if(!data.errors){
                  dispatch({type: 'DELETE_GUITAR', payload: data});
                history.push(`/users/${data.user_id}`)
                } else {
                  return data.errors
                }
      
              })
            .catch(error => console.log(error))
          }
      
    }
}

export default deleteGuitar
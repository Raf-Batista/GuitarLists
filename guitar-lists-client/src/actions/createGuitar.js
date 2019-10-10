const createGuitar = (guitar, userId, history, image) => {
   const formData = new FormData()
   formData.append('image', image, 'guitar.jpeg')
   formData.append('guitar', JSON.stringify({guitar}))
   formData.append('token', localStorage.getItem('token'))
  //  for ( let key in guitar ) {
  //   formData.append(key, guitar[key]);
  //  }
  return dispatch => {
    if(localStorage.getItem('token')){
      return fetch(`http://localhost:3000/users/${userId}/guitars`, {
        method: 'POST',
        body: formData,//JSON.stringify({guitar: guitar, token: localStorage.getItem('token')}),
        // headers:{
        //   'Content-Type': 'application/json'
        // }
      }).then(response => response.json())
        .then(data => {
          if(!data.errors){
            dispatch({type: 'CREATE', payload: data});
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

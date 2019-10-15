const initialState = { 
  currentUser: JSON.parse(localStorage.getItem('currentUser'))
  };

const currentUser = (state = initialState, action) => {
  switch(action.type) {
    case 'LOGIN':
      return action.payload
    case 'LOGOUT':
        return {}
    default:
      return state
  }
}

export default currentUser

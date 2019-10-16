const users = (state = [], action) => {
  switch(action.type) {
    case 'ADD_USERS':
      return action.payload
    case 'ADD_USER':
      return [...state, action.payload]
    case 'UPDATE_USER': 
      const users = state.filter(user => user.id !== action.payload.id)
      return [...users, action.payload]    
    default:
      return state
  }
}

export default users

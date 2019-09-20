const sessions = (state = {}, action) => {
  switch(action.type) {
    case 'LOGIN':
      return {user: action.payload}
    case 'LOGOUT':
        return {}
    default:
      return state
  }
}

export default sessions

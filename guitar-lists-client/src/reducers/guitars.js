const guitars = (state = [], action) => {
  switch(action.type) {
    case 'ADD_GUITARS':
      return action.payload
    default:
      return state
  }
}

export default guitars

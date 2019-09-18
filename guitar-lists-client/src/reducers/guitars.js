const guitars = (state = [], action) => {
  switch(action.type) {
    case 'ADD_GUITARS':
  //  console.log(action)
      return action.payload
    default:
      return state
  }
}

export default guitars

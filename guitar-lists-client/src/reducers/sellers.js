const sellers = (state = [], action) => {
  switch(action.type) {
    case 'ADD_SELLERS':
        return action.payload
    default:
      return state
  }
}

export default sellers

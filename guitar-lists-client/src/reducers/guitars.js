const guitars = (state = [], action) => {
  switch(action.type) {
    case 'ADD_GUITARS':
      return action.payload
    case 'ADD_GUITAR':
      return [...state, action.payload]
    case 'FETCH_GUITAR': 
      return state.find(guitar => {
        if(guitar.userId === action.payload.userId && guitar.id === action.payload.guitarId) {
          return guitar
        }
      })  
    default:
      return state
  }
}

export default guitars

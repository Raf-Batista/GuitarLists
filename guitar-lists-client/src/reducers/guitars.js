const guitars = (state = [], action) => {
  switch(action.type) {
    case 'ADD_GUITARS':
      return action.payload
    case 'ADD_GUITAR':
      return [...state, action.payload]
    case 'EDIT_GUITAR': 
      return state.map(guitar => 
          guitar.id === action.payload.id ? 
            action.payload : 
            guitar
        ) 
    case 'DELETE_GUITAR': 
      return state.map(guitar => 
          guitar.id !== action.payload.id 
        ) 
    default:
      return state
  }
}

export default guitars
const logout = (location, history) => {
  if(location.pathname !== '/'){
    history.push('/')
  }
  return {type: 'LOGOUT'}
}

export default logout

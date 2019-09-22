const logout = (location, history) => {
  localStorage.clear()
  if(location.pathname !== '/'){
    history.push('/')
  }
  return {type: 'LOGOUT'}
}

export default logout

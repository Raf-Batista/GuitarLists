const logout = () => {
  localStorage.clear()
  return {type: 'LOGOUT'}
}

export default logout

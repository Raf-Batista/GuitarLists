import logout from '../../src/actions/logout'

describe('Logout', () => {

  const location = {pathname: '/mock'}
  const history = ['/mock']

  it('creates LOGOUT logging out', () => {

    const expectedActions = { type: 'LOGOUT' } 
    

    expect(logout(location, history)).toEqual(expectedActions)
  })
})


import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import deleteGuitar from '../../src/actions/deleteGuitar'
import fetchMock from 'fetch-mock'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  const mockUser = {id: 1, token: 'mockToken'}
  const mockGuitarId = 1
  const mockHistory = ['mockURL']
  const mockResults = {message: 'Mock Message'}

  it('creates DELETE_GUITAR when fetching guitars', () => {
    fetchMock.deleteOnce(`http://localhost:3000/users/${mockUser.id}/guitars/${mockGuitarId}`, mockResults)

    const expectedActions = [
      {type: 'DELETE_GUITAR', payload: mockGuitarId} 
    ]
    const store = mockStore({ guitars: [] })

    return store.dispatch(deleteGuitar(mockUser, mockGuitarId, mockHistory)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
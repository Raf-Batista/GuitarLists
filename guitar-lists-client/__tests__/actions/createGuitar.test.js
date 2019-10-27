import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import createGuitar from '../../src/actions/createGuitar'
import fetchMock from 'fetch-mock'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  const mockUser = {id: 1, token: 'mockToken'}
  const mockGuitar = {id: 1, model: 'test', user_id: 1}
  const mockResults = {id: 1, model: 'test', user_id: 1, token: mockUser.token}
  const mockHistory = ['mockURL']

  it('creates ADD_GUITARS when fetching guitars', () => {
    fetchMock.postOnce(`http://localhost:3000/users/${mockUser.id}/guitars`, mockResults)

    const expectedActions = [
      { type: 'ADD_GUITAR', payload: mockResults } 
    ]
    const store = mockStore({ guitars: [] })

    return store.dispatch(createGuitar(mockGuitar, mockUser, mockHistory)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
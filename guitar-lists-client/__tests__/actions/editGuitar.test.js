import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import editGuitar from '../../src/actions/editGuitar'
import fetchMock from 'fetch-mock'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  const mockUser = {id: 1, token: 'mockToken'}
  const mockGuitar = {id: 1, model: 'test', user_id: 1}
  const mockResults = {id: 1, model: 'test', user_id: 1}
  const mockHistory = ['mockURL']

  it('creates ADD_GUITARS when fetching guitars', () => {
    fetchMock.patchOnce(`http://localhost:3000/users/${mockGuitar.user_id}/guitars/${mockGuitar.id}`, mockResults)

    const expectedActions = [
      { type: 'EDIT_GUITAR', payload: mockResults } 
    ]
    const store = mockStore({ guitars: [] })

    return store.dispatch(editGuitar(mockGuitar, mockHistory, mockUser)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
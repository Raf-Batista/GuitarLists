import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchUsers from '../../src/actions/fetchUsers'
import fetchMock from 'fetch-mock'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  const mockResults = ['user1', 'user2'] 

  it('creates ADD_USERS when fetching users', () => {
    fetchMock.getOnce('http://localhost:3000/users', mockResults)

    const expectedActions = [
      { type: 'ADD_USERS', payload: mockResults } 
    ]
    const store = mockStore({ users: [] })

    return store.dispatch(fetchUsers()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
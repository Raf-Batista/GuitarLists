import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import login from '../../src/actions/login'
import fetchMock from 'fetch-mock'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  const mockData = {id: 1, username: 'test', token: 'mock_token'}

  it('creates LOGIN when logging in', () => {
    fetchMock.postOnce('http://localhost:3000/login', mockData)

    const expectedActions = [
      { type: 'LOGIN', payload: mockData } 
    ]
    const store = mockStore({ currentUser: {} })

    return store.dispatch(login()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
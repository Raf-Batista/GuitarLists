import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import signup from '../../src/actions/signup'
import fetchMock from 'fetch-mock'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  const mockData = {id: 1, username: 'test', email: 'test@email.com'}

  it('creates SIGNUP when signing up', () => {
    fetchMock.postOnce('http://localhost:3000/users', mockData)

    const expectedActions = [
      { type: 'ADD_USER', payload: mockData },
      { type: 'LOGIN', payload: mockData }
    ]
    const store = mockStore({users: []})

    return store.dispatch(signup()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
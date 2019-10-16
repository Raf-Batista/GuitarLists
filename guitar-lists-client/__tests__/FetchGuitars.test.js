import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchGuitars from '../src/actions/fetchGuitars'
import fetchMock from 'fetch-mock'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('creates ADD_GUITARS when fetching guitars', () => {
    fetchMock.getOnce('http://localhost:3000/guitars', {
      body: { guitars: ['guitars1', 'guitars2'] },
      headers: { 'content-type': 'application/json' }
    })

    const expectedActions = [
      { type: 'ADD_GUITARS', payload: { guitars: ['guitars1', 'guitars2'] } }
    ]
    const store = mockStore({ guitars: [] })

    return store.dispatch(fetchGuitars()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
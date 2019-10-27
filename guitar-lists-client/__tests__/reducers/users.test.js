import reducer from '../../src/reducers/users';

describe('Users Reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual([])
    })

    it('should add users to the state', () => {
        expect(reducer([], {type: 'ADD_USERS', payload: {user: 'test'}})).toEqual({user: 'test'})
    })
})
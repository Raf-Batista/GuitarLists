import reducer from '../../src/reducers/currentUser';

describe('Current Users Reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({})
    })

    it('should add user to the state', () => {
        expect(reducer([], {type: 'LOGIN', payload: {user: 'test'}})).toEqual({user: 'test'})
    })

    it('should remove user from state', () => {
        expect(reducer([{user: 'test'}], {type: 'LOGOUT'})).toEqual({})
    })
})
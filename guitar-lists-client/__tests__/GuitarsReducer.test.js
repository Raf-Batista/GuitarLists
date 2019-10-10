import reducer from '../src/reducers/guitars';

describe('Guitars Reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual([])
    })
})
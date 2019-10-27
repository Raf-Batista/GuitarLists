import reducer from '../../src/reducers/guitars';

describe('Guitars Reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual([])
    })

    it('should add a guitar', () => {
        expect(reducer([], {type: 'ADD_GUITAR', payload: {model: 'test'}})).toEqual([{model: 'test'}])
    })

    it('should edit a guitar', () => {
        expect(reducer([{id: 1, model: 'before'}], {type: 'EDIT_GUITAR', payload: {id: 1, model: 'after'}})).toEqual([{id: 1, model: 'after'}])
    })

    it('should delete a guitar', () => {
        expect(reducer([{id: 1, model: 'delete'}], {type: 'DELETE_GUITAR', payload:  1})).toEqual([])
    })
})
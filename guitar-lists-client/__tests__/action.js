import configureStore from 'redux-mock-store';
import * as fetchSellers from '../src/actions/fetchSellers';
import * as fetchGuitars from '../src/actions/fetchGuitars';

const mockStore = configureStore();
const store = mockStore();

/*
The dispatch() method dispatches an action through the mock store.
The action will be stored in an array inside the instance and executed.
The getActions() method returns the actions of the mock store.
The clearActions() method clears the stored actions. Great for setup and
teardown.
*/

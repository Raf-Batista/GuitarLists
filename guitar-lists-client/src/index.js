import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter} from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import Loader from './Loader';

const persistConfig = {
  key: 'root',
  storage,
}

const middleware = [thunk]
const persistedReducer = persistReducer(persistConfig, rootReducer)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(persistedReducer, composeEnhancers(
  applyMiddleware(...middleware)
));

let persistor = persistStore(store)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <App />
      </PersistGate>  
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
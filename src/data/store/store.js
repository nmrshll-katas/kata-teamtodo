/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { keaSaga, keaReducer, resetKeaCache } from 'kea';

export const getStore = () => {
  resetKeaCache();

  const reducers = combineReducers({
    kea: keaReducer('kea'),
  });

  const sagaMiddleware = createSagaMiddleware();

  const finalCreateStore = compose(
    applyMiddleware(sagaMiddleware),
    typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f,
  )(createStore);

  const store = finalCreateStore(reducers);

  sagaMiddleware.run(keaSaga);

  return store;
};

export default getStore();

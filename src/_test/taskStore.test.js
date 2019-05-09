import { resetKeaCache, keaReducer } from 'kea';
import { keaSaga } from 'kea-saga';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
//
import { getStore } from '../data/store/store';

beforeEach(() => {
  resetKeaCache();
});

test('starts from a clear state', () => {
  const store = getStore();

  expect(store.path).toEqual(['kea', 'taskStore']);
});

import PropTypes from 'prop-types';
import { kea } from 'kea';
import { indexBy, mapObjIndexed, values, compose } from 'ramda';
//
import { randomString } from '../../utils';

const indexById = indexBy(o => o.id);
const indexedToArray = compose(
  values,
  mapObjIndexed((item, id) => ({ id, ...item })),
);

export const taskStore = kea({
  path: () => ['kea', 'taskStore'],
  actions: () => ({
    addTask: title => ({ title }),
    deleteTask: id => ({ id }),
    toggleTaskCompleted: id => ({ id }),
  }),
  reducers: ({ actions }) => ({
    indexedTasks: [
      {
        '67dhjksdf78': { title: 'Features for MVP' },
        '7fgbe89jfdu': { title: 'Launch PPC campaign' },
        '6chbn40g81s': { title: 'Define audience' },
        '0vgbrth9q0f': { title: 'Launch landing page' },
      },
      PropTypes.object,
      {
        [actions.addTask]: (state, { title }) => {
          const localID = randomString();
          return { ...state, [localID]: { localID, title } };
        },
        [actions.deleteTask]: (state, { id }) => {
          const { [id]: _dispose_, ...rest } = state;
          return rest;
        },
        [actions.toggleTaskCompleted]: (state, { id }) => {
          const { [id]: task, ...stateRest } = state;
          task.completed = !task.completed;
          return { ...stateRest, [id]: task };
        },
      },
    ],
  }),
  selectors: ({ selectors }) => ({
    tasks: [
      () => [selectors.indexedTasks],
      indexedTasks => indexedToArray(indexedTasks),
      PropTypes.array,
    ],
  }),
});

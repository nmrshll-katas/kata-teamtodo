import { useState } from "react";
import { schema, normalize, denormalize } from "normalizr";
import { createContainer } from "unstated-next";
import { randomString } from "../../utils";
import { mapObjIndexed, mergeDeepLeft } from "ramda";

const identify = obj => ({ id: obj.id || randomString(), ...obj });

export const TaskSchema = new schema.Entity("tasks", {}, {});
export const TaskListSchema = new schema.Entity("taskLists", {}, {});
const storeSchema = { tasks: [TaskSchema], taskLists: [TaskListSchema] };
const normToSchema = denormObj =>
  normalize(
    mapObjIndexed(
      (item, key) => (Array.isArray(item) && item.map(identify)) || item, // assign ids
      denormObj
    ),
    storeSchema
  ).entities;
// const entities = {
//   tasks: {
//     "1": { id: 1, title: "buy cheese" },
//     "2": { id: 2, title: "more cheese" }
//   }
// };
// const denormalizedData = denormalize({ tasks: [1, 2, 3] }, storeSchema, entities);
// const denormalizedData = denormalize(
//   { tasks: Object.keys(entities.tasks) },
//   storeSchema,
//   entities
// );
// console.log({ NONO: "NONO", denormalizedData });

function useIndexedTasks(
  initialState = normToSchema({
    tasks: [
      { title: "buy cheese" },
      { title: "more cheese" },
      { title: "even more cheese" }
    ],
    taskLists: []
  })
) {
  const [indexedStore, setIndexedStore] = useState(initialState);

  const mergeNewData = newDenormObj =>
    setIndexedStore(mergeDeepLeft(indexedStore, normToSchema(newDenormObj)));

  const saveTask = task => mergeNewData({ tasks: [task].map(identify) });

  const reducers = {
    createTask: title => {
      saveTask({ title });

      // setIndexedStore(normalizedData);
      // const localID = randomString();
      // setIndexedStore({ ...indexedStore, [localID]: { localID, title } });
    },
    editTask: (id, newTitle) => {
      const { [id]: task, ...rest } = indexedStore;
      task.title = newTitle;
      setIndexedStore({ ...rest, [id]: task });
    },
    deleteTask: id => {
      const { [id]: _dispose_, ...rest } = indexedStore;
      setIndexedStore(rest);
    },
    toggleTaskCompleted: id => {
      // const { [id]: task, ...rest } = indexedStore;
      // task.completed = !task.completed;
      // setIndexedStore({ ...rest, [id]: task });
      saveTask({ id });
    }
  };

  const deindexedStore = denormalize(
    { tasks: Object.keys(indexedStore.tasks) },
    storeSchema,
    indexedStore
  );

  // const reselectors = {
  //   tasks: indexedToArray(indexedStore)
  // };

  return { indexedStore, setIndexedStore, ...reducers, ...deindexedStore };
}
export const TasksStore = createContainer(useIndexedTasks);

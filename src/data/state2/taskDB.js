import React, { useState } from "react";
import { schema, normalize, denormalize } from "normalizr";
import { createContainer } from "unstated-next";
// import createDB from "react-use-database";
import { randomString } from "../../utils";
import { mapObjIndexed, values, compose, mergeDeepLeft } from "ramda";

// const indexedToArray = compose(
//   values,
//   mapObjIndexed((item, id) => ({ id, ...item }))
// );
// const indexById = indexBy(o => o.id || randomString());
// const arrayToIndexed = arr =>
//   map((item, idx, arr) => {
//     console.log({ item, idx, arr });
//     return;
//   }, arr);
const identify = obj => ({ id: obj.id || randomString(), ...obj });

export const TaskSchema = new schema.Entity("tasks", {}, {});
export const TaskListSchema = new schema.Entity("taskLists", {}, {});
const mySchema = { tasks: [TaskSchema], taskLists: [TaskListSchema] };
// const entities = {
//   tasks: {
//     "1": { id: 1, title: "buy cheese" },
//     "2": { id: 2, title: "more cheese" }
//   }
// };
// const denormalizedData = denormalize({ tasks: [1, 2, 3] }, mySchema, entities);
// const denormalizedData = denormalize(
//   { tasks: Object.keys(entities.tasks) },
//   mySchema,
//   entities
// );
// console.log({ NONO: "NONO", denormalizedData });

// export let [DatabaseProvider, useDB] = createDB([TaskSchema], {
//   defaultEntities: {
//     Task: {
//       1: {
//         id: 1,
//         title: "buy cheese"
//       }
//     }
//     //   indexById([{ title: "more cheese" }])
//   },
//   storedQueryDefinitions: {
//     Tasks: {
//       schema: [TaskSchema],
//       defaultValue: []
//     }
//   }
// });

// export const queries = {
//   getTaskByID: id => ({
//     schema: TaskSchema,
//     value: id
//   }),
//   getTasksByIDs: ids => ({
//     schema: [TaskSchema],
//     value: [...ids]
//   })
// };

function useIndexedTasks(
  initialState = normalize(
    {
      tasks: [
        { title: "buy cheese" },
        { title: "more cheese" },
        { title: "even more cheese" }
      ].map(identify)
    },
    mySchema
  ).entities
) {
  const [indexedStore, setIndexedStore] = useState(initialState);

  const reducers = {
    // createTask: title => {
    //   const localID = randomString();
    //   setIndexedStore({ ...indexedStore, [localID]: { localID, title } });
    // },
    createTask: title => {
      const newData = {
        tasks: [identify({ title })]
      };
      const normalizedData = mergeDeepLeft(
        indexedStore,
        normalize(newData, mySchema).entities
      );
      console.log({ normalizedData });
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
      const { [id]: task, ...rest } = indexedStore;
      task.completed = !task.completed;
      setIndexedStore({ ...rest, [id]: task });
    }
  };

  const deindexedStore = denormalize(
    { tasks: Object.keys(indexedStore.tasks) },
    mySchema,
    indexedStore
  );

  console.log({ deindexedStore });

  // const reselectors = {
  //   tasks: indexedToArray(indexedStore)
  // };

  return { indexedStore, setIndexedStore, ...reducers, ...deindexedStore };
}
export const TasksStore = createContainer(useIndexedTasks);

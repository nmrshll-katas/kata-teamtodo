import { useState } from "react";
import { schema, normalize, denormalize } from "normalizr";
import { createContainer } from "unstated-next";
import { randomString } from "../../utils";
import { mapObjIndexed, mergeDeepLeft, dissocPath } from "ramda";

const identify = obj => ({ id: obj.id || randomString(), ...obj });

export type Task = {
  id: string;
  title: string;
  completed: boolean;
  taskList: string;
};

export type TaskList = {
  id: string;
  title: string;
};

export const TaskListSchema = new schema.Entity("taskLists", {}, {});
export const TaskSchema = new schema.Entity(
  "tasks",
  { taskList: TaskListSchema },
  {}
);
const storeSchema = { tasks: [TaskSchema], taskLists: [TaskListSchema] };

const normToSchema = denormObj =>
  normalize(
    mapObjIndexed(
      (item, key) => (Array.isArray(item) && item.map(identify)) || item, // assign ids for every array type
      denormObj
    ),
    storeSchema
  ).entities;

//

function useIndexedTasks(
  initialState = normToSchema({
    tasks: [
      { title: "buy cheese" },
      { title: "more cheese" },
      { title: "even more cheese" }
    ],
    taskLists: [
      { id: "1", title: "Team to-do" },
      { id: "2", title: "another list" },
      { id: "3", title: "a third list" }
    ]
  })
) {
  const [indexedStore, setIndexedStore] = useState(initialState);

  const mergeNewData = newDenormObj =>
    setIndexedStore(mergeDeepLeft(normToSchema(newDenormObj), indexedStore));

  const saveTask = task => {
    mergeNewData({ tasks: [task].map(identify) });
  };

  const reducers = {
    createTask: title => {
      saveTask({ title });
    },
    editTask: (id, newTitle) => {
      saveTask({ id, title: newTitle });
    },
    deleteTask: id => {
      setIndexedStore(dissocPath(["tasks", id], indexedStore));
    },
    toggleTaskCompleted: id => {
      const { [id]: task } = indexedStore.tasks;
      saveTask({ id, completed: !task.completed });
    }
  };

  const deindexedStore = denormalize(
    {
      tasks: Object.keys(indexedStore.tasks),
      taskLists: Object.keys(indexedStore.taskLists)
    },
    storeSchema,
    indexedStore
  );

  // const reselectors = {
  //   tasks: indexedToArray(indexedStore)
  // };

  return { indexedStore, setIndexedStore, ...reducers, ...deindexedStore };
}
export const TasksStore = createContainer(useIndexedTasks);

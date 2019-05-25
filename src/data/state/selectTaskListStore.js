import { useState } from "react";
import { createContainer } from "unstated-next";
import { mapObjIndexed, values, compose } from "ramda";
//
import { randomString } from "../../utils";

// const indexById = indexBy(o => o.id);
const indexedToArray = compose(
  values,
  mapObjIndexed((item, id) => ({ id, ...item }))
);

function useIndexedTaskLists(
  initialState = {
    "67dhjksdf78": { title: "Team todo-list" },
    "7fgbe89jfdu": { title: "another one" }
  }
) {
  const [indexedTaskLists, setIndexedTaskLists] = useState(initialState);

  const reducers = {
    createTaskList: title => {
      const localID = randomString();
      setIndexedTaskLists({
        ...indexedTaskLists,
        [localID]: { localID, title }
      });
    },
    editTaskList: (id, newTitle) => {
      const { [id]: task, ...rest } = indexedTaskLists;
      task.title = newTitle;
      setIndexedTaskLists({ ...rest, [id]: task });
    },
    deleteTaskList: id => {
      const { [id]: _dispose_, ...rest } = indexedTaskLists;
      setIndexedTaskLists(rest);
    },
    toggleTaskListCompleted: id => {
      const { [id]: task, ...rest } = indexedTaskLists;
      task.completed = !task.completed;
      setIndexedTaskLists({ ...rest, [id]: task });
    }
  };

  const reselectors = {
    taskLists: indexedToArray(indexedTaskLists)
  };

  return { indexedTaskLists, setIndexedTaskLists, ...reducers, ...reselectors };
}

export const SelectTaskListStore = createContainer(useIndexedTaskLists);
export default SelectTaskListStore;

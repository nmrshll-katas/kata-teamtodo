import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
//
// import { ListView } from "../atoms/ListView";

// const reorder = (list: any[], startIndex: number, endIndex: number): any[] => {
//   const result = Array.from(list);
//   const [removed] = result.splice(startIndex, 1);
//   result.splice(endIndex, 0, removed);
//   return result;
// };

const initialData: any = {
  tasks: {
    "1": { id: "1", title: "task one" },
    "2": { id: "2", title: "task two" },
    "3": { id: "3", title: "task three" },
    "4": { id: "4", title: "task four" },
    "5": { id: "5", title: "task five" },
    "6": { id: "6", title: "task six" },
    "7": { id: "7", title: "task seven" }
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "todo column",
      taskIds: ["1", "2", "3", "4"]
    }
  },
  columnOrder: ["column-1"]
};

const TaskStyled = styled.div`
  padding: 4px;
  background-color: #f2eeff;
  border: 1px solid lightgray;
  border-radius: 2px;
  margin-bottom: 8px;
`;
const Task = ({ task, index }: any) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => {
        return (
          <TaskStyled
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {task.title}
          </TaskStyled>
        );
      }}
    </Draggable>
  );
};

///////////////////

const ColumnStyled = styled.div`
  margin: 8px;
  border: 1px solid lightgray;
  border-radius: 2px;
`;
const TitleStyled = styled.h3`
  padding: 8px;
`;
const TaskListStyled = styled.div`
  padding: 8px;
`;
const Column = ({ column, tasks }: any) => {
  return (
    <ColumnStyled>
      <TitleStyled>{column.title}</TitleStyled>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <TaskListStyled ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.map((task, idx) => (
              <Task key={task.id} task={task} index={idx} />
            ))}
            {provided.placeholder}
          </TaskListStyled>
        )}
      </Droppable>
    </ColumnStyled>
  );
};

export const ReorderableList = () => {
  const [state, setState] = useState(initialData);

  const onDragEnd = ({ source, destination, draggableId }: any) => {
    if (
      !destination || // no destination
      (destination.droppableId === source.droppableId &&
        destination.index === source.index) // dest same as source
    ) {
      return;
    }

    const column = state.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);

    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = { ...column, taskIds: newTaskIds };

    setState({
      ...state,
      columns: {
        // ...state.columns,
        [newColumn.id]: newColumn
      }
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {state.columnOrder.map(columnId => {
        const column = state.columns[columnId];
        const tasks = column.taskIds.map(taskId => state.tasks[taskId]);

        return <Column key={column.id} column={column} tasks={tasks} />;
      })}
    </DragDropContext>
  );
};

///////////////////////////

// export const ReorderableList = ({ onDragEnd: any }) => {
//   const [orderedList, setOrderedList] = useState(initialData);

//   return (
//     <DragDropContext
//       onDragEnd={useCallback(
//         ({ destination, source, ...rest }) => {
//           setOrderedList(reorder(orderedList, source.index, destination.index));
//           console.log({ destination, source, rest, orderedList });
//         },
//         [orderedList]
//       )}
//     >
//       <Droppable droppableId="droppable-1">
//         {(provided, snapshot) => (
//           <div ref={provided.innerRef} {...provided.droppableProps}>
//             {provided.placeholder}
//             {Object.values(orderedList).map((item, idx) => (
//               <Draggable draggableId={`draggable-${item.id}`} index={idx}>
//                 {(provided, snapshot) => (
//                   <div
//                     ref={provided.innerRef}
//                     {...provided.draggableProps}
//                     {...provided.dragHandleProps}
//                   >
//                     <h4>{item.title}</h4>
//                   </div>
//                 )}
//               </Draggable>
//             ))}
//           </div>
//         )}
//       </Droppable>
//     </DragDropContext>
//   );
// };

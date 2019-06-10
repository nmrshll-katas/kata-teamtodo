import React, { useCallback, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
//
import { ListView } from "../atoms/ListView";

const reorder = (list: any[], startIndex: number, endIndex: number): any[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const initialList = [
  { id: "732849", title: "one" },
  { id: "7fydhsjk", title: "two" },
  { id: "644gwhjbfm", title: "three" },
  { id: "jhfd7s", title: "four" },
  { id: "8hbrkf", title: "five" },
  { id: "8hbrkf", title: "six" },
  { id: "8hbrkf", title: "seven" }
];

export const ReorderableList = ({ onDragEnd: any }) => {
  const [orderedList, setOrderedList] = useState(initialList);

  return (
    <DragDropContext
      onDragEnd={useCallback(
        ({ destination, source, ...rest }) => {
          setOrderedList(reorder(orderedList, source.index, destination.index));
          console.log({ destination, source, rest, orderedList });
        },
        [orderedList]
      )}
    >
      <Droppable droppableId="droppable-1">
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {provided.placeholder}
            {Object.values(orderedList).map((item, idx) => (
              <Draggable draggableId={`draggable-${item.id}`} index={idx}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <h4>{item.title}</h4>
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

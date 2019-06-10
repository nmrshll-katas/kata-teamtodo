import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
//
import { TasksStore } from "../../data/state/taskDB";
import IconBin from "../../assets/icons/IconBin";
import { Button } from "../atoms/Button/Button";
import { TextInput } from "../atoms/TextInput";

const TodoItemStyled = styled.div`
  transition: all 0.3s;
  // &:hover,
  // &:focus {
  //   transform: scale3d(1.004, 1.004, 1);
  // }
  height: 2.4rem;
  &:hover {
    background-color: hsl(270, 80%, 94%);
    > .btn-delete {
      display: block;
    }
  }
  > .btn-delete {
    display: none;
  }
`;
const LabelStyled = styled.div`
  color: ${({ completed }) => (completed ? "lightgray" : "inherit")};
  text-decoration: ${({ completed }) =>
    completed ? "line-through" : "inherit"};
`;
const ButtonStyled = styled(Button)`
  &:focus {
    outline: none;
  }
`;
export const TodoItem = ({ task }) => {
  let { deleteTask, toggleTaskCompleted, editTask } = TasksStore.useContainer();
  const [editing, setEditing] = useState(false);

  return (
    <TodoItemStyled className="flex flex-row items-baseline mx-3 px-3 py-2 rounded">
      <input
        className="mr-2"
        checked={task.completed || false}
        type="checkbox"
        onChange={() => {
          toggleTaskCompleted(task.id);
        }}
      />
      {editing ? (
        <TextInput
          className="p-1 rounded outline-none"
          placeholder={task.title}
          onSubmit={text => {
            setEditing(false);
            editTask(task.id, text);
          }}
        />
      ) : (
        <LabelStyled
          completed={task.completed}
          // onClick={() => setEditing(true)}
        >
          {task.title}
        </LabelStyled>
      )}
      <ButtonStyled
        className="btn-delete ml-auto cursor-pointer"
        onClick={() => deleteTask(task.id)}
      >
        <IconBin fill="hsl(270,100%,50%)" />
      </ButtonStyled>
    </TodoItemStyled>
  );
};

TodoItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    completed: PropTypes.bool
  }),
  actions: PropTypes.objectOf(PropTypes.func)
};
TodoItem.defaultPropTypes = {
  task: {
    completed: false
  }
};

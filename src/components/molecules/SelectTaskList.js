import React from "react";
import styled from "styled-components";
//
import { ListView } from "../atoms/ListView";
import IconList from "../../assets/icons/IconList";
//
import SelectTaskListStore from "../../data/state/selectTaskListStore";

const SelectableTaskListStyled = styled.div`
  background-color: hsl(270, 80%, 94%);
`;
const SelectableTaskList = ({ taskList }) => {
  return (
    <SelectableTaskListStyled className="flex flex-row items-center rounded p-2">
      <IconList fill="hsl(270,40%,60%)" className="mr-2" />
      <div>{taskList.title}</div>
    </SelectableTaskListStyled>
  );
};

export const _SelectTaskList = () => {
  let { taskLists } = SelectTaskListStore.useContainer();
  return (
    <ListView
      data={taskLists}
      renderItem={item => <SelectableTaskList taskList={item} />}
    />
  );
};

export const SelectTaskList = () => {
  return (
    <SelectTaskListStore.Provider>
      <_SelectTaskList />
    </SelectTaskListStore.Provider>
  );
};

export default SelectTaskList;

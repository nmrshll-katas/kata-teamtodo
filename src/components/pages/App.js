import React from "react";
import styled from "styled-components";
//
import { ListView } from "../atoms/ListView";
import IconList from "../../assets/icons/IconList";
//
import { TodosSection } from "../organisms/TodosSection";
import { SelectTaskList } from "../molecules/SelectTaskList";
//

const AsideStyled = styled.div`
  box-shadow: 1px 0 6px 1px rgba(0, 0, 0, 0.1);
`;
const App = () => (
  <div className="text-center">
    <div className="flex flex-row items-stretch rounded shadow-lg m-16 overflow-hidden">
      <AsideStyled className="flex flex-col p-6 bg-white relative">
        <div id="account" className="flex flex-row items-center h-16 mb-8">
          <img
            src="https://i.kym-cdn.com/profiles/icons/big/000/234/278/573.jpg"
            alt="profile"
            className="h-12 w-12 rounded-full"
          />
          <p className="ml-2 font-semibold">Guglielmo Dogeini</p>
        </div>
        <SelectTaskList />
      </AsideStyled>

      <TodosSection />
    </div>
  </div>
);

export default App;

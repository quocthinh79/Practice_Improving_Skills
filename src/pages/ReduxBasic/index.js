import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { legacy_createStore as createStore } from "redux";
import { addNewHobby, setActionHobby } from "~/actions/hobby";
import HobbyList from "./HobbyList";

const ReduxBasicPage = () => {
  const hobbyList = useSelector((state) => state.hobby.list);
  const activeId = useSelector((state) => state.hobby.activeId);
  const dispatch = useDispatch();

  const randomNumber = () => Math.trunc(Math.random() * 1000);
  const handleRandomHobbyClick = () => {
    const randomId = randomNumber();
    const newHobby = {
      id: randomId,
      title: `Fake Hobby ${randomId}`,
    };

    const action = addNewHobby(newHobby);
    dispatch(action);
  };

  const handleHobbyItemClick = (hobby) => {
    const action = setActionHobby(hobby);
    dispatch(action);
  };

  return (
    <>
      <div>Redux Page</div>
      <button onClick={handleRandomHobbyClick}>Random hobby click</button>
      <HobbyList
        hobbyList={hobbyList}
        activeId={activeId}
        onHobbyClick={handleHobbyItemClick}
      ></HobbyList>
    </>
  );
};

export default ReduxBasicPage;

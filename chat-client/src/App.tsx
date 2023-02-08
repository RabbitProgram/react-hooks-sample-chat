import React from "react";
import { useApp } from "./useApp";
import { Operation } from "./Operation";
import { Chat2 } from "./Chat2";

export const App = () => {
  const { isEntered, name, onEnterHandler, oLeaveHandler } = useApp();

  return (
    <div>
      <Operation
        onEnter={onEnterHandler}
        onLeave={oLeaveHandler}
        entered={isEntered}
      />
      {isEntered && <Chat2 name={name} />}
    </div>
  );
};

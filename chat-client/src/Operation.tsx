import React from "react";
import { useState } from "react";

type Props = {
  entered: boolean;
  onEnter: ({ name }: { name: string }) => void;
  onLeave: () => void;
};

export const Operation = ({ entered, onEnter, onLeave }: Props) => {
  const [name, setName] = useState("");

  const handleInputChange = (e: any) => {
    setName(e.target.value);
  };

  const handleEnterClick = () => {
    onEnter({ name });
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="名前"
        value={name}
        disabled={entered}
        onChange={handleInputChange}
      />
      {entered ? (
        <>
          <button onClick={onLeave}>退室</button>
        </>
      ) : (
        <button disabled={!name} onClick={handleEnterClick}>
          入室
        </button>
      )}
    </div>
  );
};

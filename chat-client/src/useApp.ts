import { useState } from "react";

export const useApp = () => {
  const [isEntered, setIsEntered] = useState(false);
  const [name, setName] = useState("");

  const onEnterHandler = ({ name }: { name: string }) => {
    setIsEntered(true);
    setName(name);
  };

  const oLeaveHandler = () => {
    setIsEntered(false);
  };

  return { isEntered, name, onEnterHandler, oLeaveHandler };
};

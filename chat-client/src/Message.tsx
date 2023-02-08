import React from "react";

export type MessageProps = {
  name: string;
  text: string;
};

export const Message = ({ name, text }: MessageProps) => {
  return (
    <li>
      <span className="name">{name}</span>
      <span className="text">{text}</span>
    </li>
  );
};

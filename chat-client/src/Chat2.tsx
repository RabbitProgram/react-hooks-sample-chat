import React from "react";
import { useState } from "react";
import { Message } from "./Message";
import { useChatService } from "./useChatService";

type Props = {
  name: string;
};

export const Chat2 = ({ name }: Props) => {
  const { messages, sendMessage } = useChatService({
    name: "管理人",
    text: `ようこそ、${name}さん`,
  });

  const [text, setText] = useState("");

  const handleInputChange = (e: any) => {
    setText(e.target.value);
  };

  const handleButtonClick = (e: any) => {
    sendMessage({ name, text });
    setText("");
  };

  return (
    <div>
      <div className="input">
        <input
          type="text"
          placeholder="メッセージ"
          value={text}
          onChange={handleInputChange}
        />
        <button disabled={!text} onClick={handleButtonClick}>
          送信
        </button>
      </div>
      <ul>
        {messages.map((msg, idx) => {
          return <Message key={idx} name={msg.name} text={msg.text} />;
        })}
      </ul>
    </div>
  );
};

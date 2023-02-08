import React from "react";
import { useState, useEffect, useRef } from "react";
import { io } from "../node_modules/socket.io-client/build/index";
import { Message } from "./Message";

const Chat = ({ name }: { name: string }) => {
  const [messages, setMessages] = useState([
    {
      name: "管理人",
      text: `ようこそ、${name}さん`,
    },
  ]);

  const [text, setText] = useState("");

  const socketRef = useRef(io());

  useEffect(() => {
    console.log("Connectinng..");
    socketRef.current = io();
    socketRef.current.on("broadcast", (payload: any) => {
      console.log("Recieved: " + payload);
      setMessages((prevMessages) => [...prevMessages, payload]);
    });
    return () => {
      console.log("Disconnecting..");
      socketRef.current.disconnect();
    };
  }, []);

  const handleInputChange = (e: any) => {
    setText(e.target.value);
  };

  const handleButtonClick = (e: any) => {
    const aMessage = {
      name: name,
      text: text,
    };
    socketRef.current.emit("send", aMessage);
    setMessages((prevMessages) => [...prevMessages, aMessage]);
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

export default Chat;

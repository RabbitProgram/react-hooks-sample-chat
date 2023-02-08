import { useState, useRef, useEffect } from "react";
import { Socket, io } from "socket.io-client";
import { MessageProps } from "./Message";

export const useChatService = ({ name, text }: MessageProps) => {
  const [messages, setMessages] = useState<MessageProps[]>([{ name, text }]);

  const socketRef = useRef<Socket>();

  useEffect(() => {
    console.log("Connectinng..");
    socketRef.current = io();
    socketRef.current.on("broadcast", (payload: any) => {
      console.log("Recieved: " + payload);
      setMessages((prevMessages) => [...prevMessages, payload]);
    });
    return () => {
      console.log("Disconnecting..");
      if (!socketRef.current) {
        return;
      }
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = (props: MessageProps) => {
    if (!socketRef.current) {
      return;
    }
    const aMessage = {
      name: props.name,
      text: props.text,
    };
    socketRef.current.emit("send", aMessage);
    setMessages((prevMessages) => [...prevMessages, aMessage]);
  };

  return { messages, sendMessage };
};

import React, { useState, useEffect } from "react";
//
import { randomString } from "../../utils";

type Task = {
  id: string;
  title: string;
};

const socket = new WebSocket("wss://echo.websocket.org");

export const WS = () => {
  const [tasks, setTasks] = useState(new Map<string, Task>());

  useEffect(() => {
    socket.onmessage = (ev: MessageEvent) => {
      const task: Task = JSON.parse(ev.data);
      setTasks({ ...tasks, [task.id]: task });
    };
  }, [setTasks, tasks]);

  return (
    <div>
      <button
        onClick={() => {
          socket.send(JSON.stringify({ id: randomString(), title: "nope" }));
        }}
      >
        SEND
      </button>
      {Object.values(tasks).map(task => (
        <div key={task.id}>{JSON.stringify(task)}</div>
      ))}
    </div>
  );
};

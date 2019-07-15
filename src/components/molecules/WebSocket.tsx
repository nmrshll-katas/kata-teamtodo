import React, { useState, useEffect } from "react";
import { connect } from "@holochain/hc-web-client";
// import { ConnectOpts } from "socket.io-client";
// import HttpsProxyAgent from "https-proxy-agent";
//
import { randomString } from "../../utils";
import { useHolo } from "../../data/sources/holochain";

type Task = {
  id: string;
  title: string;
};

const socket = new WebSocket("wss://echo.websocket.org");

export const WS = () => {
  const [tasks, setTasks] = useState(new Map<string, Task>());
  const { createList } = useHolo();
  // console.log(prom);

  // useEffect(() => {
  //   holoConn.ws.onmessage = (ev: MessageEvent) => {
  //     const task: Task = JSON.parse(ev.data);
  //     setTasks({ ...tasks, [task.id]: task });
  //   };
  // }, [setTasks, tasks]);

  // const hc = holo();

  return (
    <div>
      <button onClick={createList}>SEND</button>
      {Object.values(tasks).map(task => (
        <div key={task.id}>{JSON.stringify(task)}</div>
      ))}
    </div>
  );
};

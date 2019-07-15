import { useState, useEffect, useMemo } from "react";
import { connect } from "@holochain/hc-web-client";

// duplicate holochain types
declare type Call = (
  ...segments: Array<string>
) => (params: any) => Promise<any>;
declare type CallZome = (
  instanceId: string,
  zome: string,
  func: string
) => (params: any) => Promise<any>;
declare type OnSignal = (callback: (params: any) => void) => void;
declare type Close = () => Promise<any>;
declare type HoloConn = {
  call: Call;
  callZome: CallZome;
  close: Close;
  onSignal: OnSignal;
  ws: any;
};

const opts = {
  url: "ws://localhost:8888"
  // timeout?: number;
  // wsClient?: any;
};

export const useHolo = () => {
  const [holoConn, setHoloConn] = useState<HoloConn>();
  useEffect(() => {
    (async () => {
      const hConn: HoloConn = await connect(opts);
      setHoloConn(hConn);
    })();
  }, []);

  const [listFuncs, setListFuncs] = useState();
  useEffect(() => {
    if (!!holoConn) {
      setListFuncs({
        call: (funcName: string, params: any) =>
          holoConn.callZome("test-instance", "lists", funcName)(params)
      });
    }
  }, [holoConn]);

  const actions = {
    createList: (title: string) => () => {
      listFuncs
        .call("create_list", {
          list: { name: title }
        })
        .then(result => console.log(JSON.parse(result)));
    },
    addItem: (listAddr: string, title: string) => () => {
      listFuncs.call("add_item", {
        list_item: { text: "Master Holochain", completed: false },
        list_addr: listAddr
      });
    },
    getList: (listAddr: string) => () => {
      listFuncs.call("get_list", {
        list_addr: listAddr
      });
    }
  };

  return { ...actions };
};

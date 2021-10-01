import { useEffect, useState } from "react";
import { interpret } from "robot3";
import { callApi } from "../../utils/api";
import machine from "../machines/defaultMachine";
import useMachine from "../hooks/useMachine";

const INIT = "init";
const LOADING = "loading";
const LOADED = "loaded";

const App = () => {
  const customMachine = machine(callApi);
  const [state, context, send] = useMachine(customMachine);

  const { value } = context?.infos;

  useEffect(() => {
    send("fetch");
  }, []);
  return (
    <div>
      {state === INIT && <div> Init </div>}
      {state === LOADING && <div>Loading ...</div>}

      {state === LOADED && <div>Loaded with value : {value?.toString()}</div>}
    </div>
  );
};

export default App;

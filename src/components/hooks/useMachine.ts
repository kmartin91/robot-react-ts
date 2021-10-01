import { useCallback, useRef, useState } from "react";
import { interpret } from "robot3";

export default (machine, initialContext = {}) => {
  const ref = useRef(null);

  if (ref.current === null) {
    ref.current = interpret(
      machine,
      () => {
        setState(service.machine.current);
        setContext(service.context);
      },
      initialContext
    );
  }

  const service = ref.current;
  const [state, setState] = useState(service.machine.current);
  const [context, setContext] = useState(service.context);

  const send = useCallback(
    (type, params = {}) => {
      service.send({ type, ...params });
    },
    [service]
  );

  return [state, context, send];
};

import { createMachine, invoke, state, transition, reduce } from "robot3";

const context = () => ({
  infos: [],
});

const machine = (cb: any) =>
  createMachine(
    {
      init: state(transition("fetch", "loading")),
      loading: invoke(
        cb,
        transition(
          "done",
          "loaded",
          reduce((ctx: Object, { data }: any) => ({
            ...ctx,
            infos: data?.response,
          }))
        )
      ),
      loaded: state(),
    },
    context
  );

export default machine;

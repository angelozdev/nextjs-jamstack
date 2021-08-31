import { State } from "./types";

const initialState: State = {
  data: {
    items: [],
    limit: 0,
    skip: 0,
    total: 0,
  },
  error: null,
  status: "idle",
};

export default initialState;

import { EnvironmentVariables } from "@constants";
import { initialState } from "./";
import { State, Types, Actions } from "./types";

const { node } = EnvironmentVariables;

function reducer(state: State, action: Actions): State {
  const { type } = action;
  switch (type) {
    case Types.PLANT_SEARCHING_LOADING:
      return {
        ...state,
        status: "loading",
      };
    case Types.PLANT_SEARCHING_SUCCESS:
      return {
        ...state,
        data: {
          ...action.data,
          items: [...state.data.items, ...action.data.items],
        },
        status: "success",
      };

    case Types.PLANT_SEARCHING_FAILED:
      return {
        ...state,
        error: action.error,
        status: "failed",
      };

    case Types.PLANT_SEARCHING_IDLE: {
      return {
        ...initialState,
      };
    }
    default:
      if (node.env === "development") {
        throw new Error(`[SearchState]: ${type} is invalid`);
      }
      return state;
  }
}

export default reducer;

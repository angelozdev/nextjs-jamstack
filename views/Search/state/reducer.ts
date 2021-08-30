import { EnvironmentVariables } from "@constants";
import { initialState } from "./";
import { Types } from "./constants";
import { Actions, State } from "./types";

const {
  PLANT_SEARCHING_FAILED,
  PLANT_SEARCHING_LOADING,
  PLANT_SEARCHING_SUCCESS,
  PLANT_SEARCHING_IDLE,
} = Types;

function reducer(state: State, action: Actions): State {
  const { type } = action;
  switch (type) {
    case PLANT_SEARCHING_LOADING:
      return {
        ...state,
        status: "loading",
      };
    case PLANT_SEARCHING_SUCCESS:
      return {
        ...state,
        data: action.plants,
        status: "success",
      };

    case PLANT_SEARCHING_FAILED:
      return {
        ...state,
        error: action.error,
        status: "failed",
      };

    case PLANT_SEARCHING_IDLE: {
      return {
        ...initialState,
      };
    }
    default:
      if (EnvironmentVariables.node.env === "development") {
        throw new Error(`[SearchState]: ${type} is invalid`);
      }
      return state;
  }
}

export default reducer;

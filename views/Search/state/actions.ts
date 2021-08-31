import { Types } from "./";
import {
  ActionCreatorFailed,
  ActionCreatorIdle,
  ActionCreatorIsLoading,
  ActionCreatorSuccess,
} from "./types";

export const plantSearchingIsLoading: ActionCreatorIsLoading = () => ({
  type: Types.PLANT_SEARCHING_LOADING,
});

export const plantSearchingFailed: ActionCreatorFailed = (error) => ({
  error,
  type: Types.PLANT_SEARCHING_FAILED,
});

export const plantSearchingSuccess: ActionCreatorSuccess = (data) => ({
  type: Types.PLANT_SEARCHING_SUCCESS,
  data,
});

export const plantSearchingIdle: ActionCreatorIdle = () => ({
  type: Types.PLANT_SEARCHING_IDLE,
});

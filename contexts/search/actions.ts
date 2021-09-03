import {
  ActionCreatorFailed,
  ActionCreatorIdle,
  ActionCreatorIsLoading,
  ActionCreatorSuccess,
  Types,
} from "./types";

export const plantSearchingIsLoading: ActionCreatorIsLoading = () => ({
  type: Types.PLANT_SEARCHING_LOADING,
});

export const plantSearchingIdle: ActionCreatorIdle = () => ({
  type: Types.PLANT_SEARCHING_IDLE,
});

export const plantSearchingFailed: ActionCreatorFailed = (error) => ({
  error,
  type: Types.PLANT_SEARCHING_FAILED,
});

export const plantSearchingSuccess: ActionCreatorSuccess = (data) => ({
  type: Types.PLANT_SEARCHING_SUCCESS,
  data,
});

import { ApolloError } from "@apollo/client";

export interface State {
  status: Statuses;
  data: PlantCollection;
  error: Error | null | ApolloError;
}

export interface IContext {
  state: State;
  searchByTerm: (term: string) => Promise<void>;
  nextPage: (term: string) => Promise<void>;
}

export enum Types {
  PLANT_SEARCHING_FAILED = "[Search]: plant searching failed",
  PLANT_SEARCHING_IDLE = "[Search]: initial state",
  PLANT_SEARCHING_LOADING = "[Search]: plants are loading",
  PLANT_SEARCHING_SUCCESS = "[Search]: plants were searched successfully",
}

export interface IsLoadingAction {
  type: Types.PLANT_SEARCHING_LOADING;
}

interface FailedAction {
  type: Types.PLANT_SEARCHING_FAILED;
  error: NonNullable<State["error"]>;
}

interface SuccessAction {
  type: Types.PLANT_SEARCHING_SUCCESS;
  data: State["data"];
}

interface IdleAction {
  type: Types.PLANT_SEARCHING_IDLE;
}

export type ActionCreatorIsLoading = () => IsLoadingAction;
export type ActionCreatorFailed = (
  error: NonNullable<State["error"]>
) => FailedAction;
export type ActionCreatorSuccess = (data: State["data"]) => SuccessAction;
export type ActionCreatorIdle = () => IdleAction;

export type Actions =
  | IsLoadingAction
  | FailedAction
  | SuccessAction
  | IdleAction;

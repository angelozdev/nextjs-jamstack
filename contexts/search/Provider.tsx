import { useCallback, useMemo, useReducer } from "react";

import { Context, reducer, initialState, actions } from "./";
import { getPlantsByPlantName } from "@api/services/plants";

// types
import type { PropsWithChildren } from "react";
import type { IContext } from "./types";

const MAX_PLANTS_FOR_PAGE = 8;

function Provider({ children }: PropsWithChildren<{}>) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { data } = state;
  const { limit, skip, total } = data;

  const searchByTerm = useCallback(async (term: string) => {
    if (!term || term.length < 3) {
      return dispatch(actions.plantSearchingIdle());
    }

    dispatch(actions.plantSearchingIdle());
    dispatch(actions.plantSearchingIsLoading());

    try {
      const data = await getPlantsByPlantName(term, {
        limit: MAX_PLANTS_FOR_PAGE,
      });
      dispatch(actions.plantSearchingSuccess(data));
    } catch (error) {
      dispatch(actions.plantSearchingFailed(error as Error));
    }
  }, []);

  const nextPage = useCallback(
    async (term: string) => {
      if (limit + skip > total) return;
      const nextSkip = skip + MAX_PLANTS_FOR_PAGE;

      dispatch(actions.plantSearchingIsLoading());
      try {
        const data = await getPlantsByPlantName(term, {
          limit: MAX_PLANTS_FOR_PAGE,
          skip: nextSkip,
        });
        dispatch(actions.plantSearchingSuccess(data));
      } catch (error) {
        dispatch(actions.plantSearchingFailed(error as Error));
      }
    },
    [skip, total, limit]
  );

  const value: IContext = useMemo(
    () => ({ state, searchByTerm, nextPage }),
    [state, searchByTerm, nextPage]
  );
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export default Provider;

import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { Alert, Pane, Paragraph, SearchInput } from "evergreen-ui";
import { useDebounce, useIntersectionObserver } from "hooks";
import { useTranslation } from "next-i18next";
import { getPlantsByPlantName } from "@services/plants";
import { Loader, PlantList, Wrapper } from "@components";
import { initialState, actions, reducer } from "./state";

// types
import type { ChangeEvent } from "react";

const LIMIT = 8;

function SearchView() {
  // hooks
  const [{ data, status, error }, disptach] = useReducer(reducer, initialState);
  const { t } = useTranslation("search");
  const [value, setValue] = useState("");
  const debounceValue = useDebounce(value, 500);
  const visor = useRef<HTMLDivElement>(null);

  const { items: plants } = data;
  const isLoading = status === "loading";
  const areTherePlants = status !== "idle" && plants.length > 0;
  const plantsNotFound = status === "success" && plants.length === 0;
  const { isVisible } = useIntersectionObserver(areTherePlants ? visor : null);

  const handleChangeValue = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { target } = event;
      const { value: newValue } = target;
      setValue(newValue);
    },
    []
  );

  useEffect(() => {
    if (debounceValue && debounceValue.length > 2) {
      disptach(actions.plantSearchingIdle());
      disptach(actions.plantSearchingIsLoading());
      getPlantsByPlantName(debounceValue, { limit: LIMIT })
        .then((plants) => {
          disptach(actions.plantSearchingSuccess(plants));
        })
        .catch((error) => {
          disptach(actions.plantSearchingFailed(error));
        });
    } else {
      disptach(actions.plantSearchingIdle());
    }
  }, [debounceValue]);

  useEffect(() => {
    const skip = data.skip + LIMIT;
    if (!isVisible || !debounceValue || data.total < skip) return;
    disptach(actions.plantSearchingIsLoading());
    getPlantsByPlantName(debounceValue, {
      limit: LIMIT,
      skip,
    }).then((data) => {
      disptach(actions.plantSearchingSuccess(data));
    });
  }, [isVisible, debounceValue, data.skip, data.total]);

  return (
    <Pane is="section">
      <Wrapper maxWidth="1280px">
        <Pane paddingY="2rem" textAlign="center">
          <SearchInput
            onChange={handleChangeValue}
            value={value}
            height={40}
            maxWidth="600px"
            width="100%"
            placeholder={t("input.placeholder")}
          />
        </Pane>

        <Pane>
          {status === "failed" && error && (
            <Alert intent="danger" title={`[${error.name.toUpperCase()}]`}>
              {error.message}
            </Alert>
          )}

          {plantsNotFound && (
            <Paragraph>
              {t("plants_not_found")} &quot;{debounceValue}&quot;
            </Paragraph>
          )}

          {areTherePlants && (
            <Pane borderTop>
              <PlantList plants={plants} />
              <Pane width="100%" height="1rem" ref={visor} />
            </Pane>
          )}

          {isLoading && <Loader minHeight="2rem" paddingY="2rem" />}
        </Pane>
      </Wrapper>
    </Pane>
  );
}

export default SearchView;

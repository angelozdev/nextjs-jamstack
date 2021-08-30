import { useCallback, useEffect, useReducer, useState } from "react";
import { Pane, Paragraph, SearchInput } from "evergreen-ui";
import { useDebounce } from "hooks";
import { useTranslation } from "next-i18next";
import { getPlantsByPlantName } from "@services/plants";
import { Loader, PlantList, Wrapper } from "@components";
import { initialState, actions, reducer } from "./state";

// types
import type { ChangeEvent } from "react";

function SearchView() {
  // hooks
  const [{ data: plants, status }, disptach] = useReducer(
    reducer,
    initialState
  );
  const { t } = useTranslation("search");
  const [value, setValue] = useState("");
  const debounceValue = useDebounce(value, 500);

  const isLoading = status === "loading";
  const areTherePlants = status === "success" && plants.length > 0;
  const plantsNotFound = status === "success" && plants.length === 0;

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
      disptach(actions.plantSearchingIsLoading());
      getPlantsByPlantName(debounceValue, { limit: 8 })
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

  return (
    <Pane minHeight="70vh" is="section">
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
          {isLoading && <Loader />}

          {plantsNotFound && (
            <Paragraph>
              {t("plants_not_found")} &quot;{debounceValue}&quot;
            </Paragraph>
          )}

          {areTherePlants && (
            <Pane borderTop>
              <PlantList plants={plants} />
            </Pane>
          )}
        </Pane>
      </Wrapper>
    </Pane>
  );
}

export default SearchView;

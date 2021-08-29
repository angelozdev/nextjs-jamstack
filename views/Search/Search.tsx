import { useCallback, useEffect, useState } from "react";
import { Pane, Paragraph, SearchInput } from "evergreen-ui";
import { useDebounce } from "hooks";
import { useTranslation } from "next-i18next";
import { getPlantsByPlantName } from "@services/plants";
import { Loader, PlantList, Wrapper } from "@components";

// types
import type { ChangeEvent } from "react";

function SearchView() {
  // hooks
  const { t } = useTranslation("search");
  const [plants, setPlants] = useState<Plant[] | null>(null);
  const [value, setValue] = useState("");
  const debounceValue = useDebounce(value, 500);

  const isLoading = plants === null && value;
  const areTherePlants = !!plants && plants?.length > 0;
  const plantsNotFound =
    !isLoading && !areTherePlants && value && debounceValue;

  const handleChangeValue = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { target } = event;
      const { value: newValue } = target;
      setValue(newValue);
    },
    []
  );

  useEffect(() => {
    if (debounceValue) {
      setPlants(null);
      getPlantsByPlantName(debounceValue, { limit: 8 })
        .then(setPlants)
        .catch(() => setPlants([]));
    } else {
      setPlants(null);
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

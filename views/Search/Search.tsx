import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Alert, Pane, Paragraph, SearchInput } from "evergreen-ui";
import { useTranslation } from "next-i18next";

import { useDebounce, useIntersectionObserver } from "@utils/hooks";
import { Loader, PlantList, Wrapper } from "@components";
import { useSearchContext } from "@contexts/search";

// types
import type { ChangeEvent } from "react";

function SearchView() {
  // hooks
  const { searchByTerm, state, nextPage } = useSearchContext();
  const { t } = useTranslation("search");
  const [value, setValue] = useState("");
  const debounceValue = useDebounce(value, 500);
  const visorRef = useRef<HTMLDivElement>(null);

  const { data, error, status } = state;
  const { items: plants } = data;
  const isLoading = status === "loading";
  const areTherePlants = plants.length > 0;
  const plantsNotFound = status === "success" && plants.length === 0;
  const { isVisible } = useIntersectionObserver(
    areTherePlants ? visorRef : null,
    { rootMargin: "200px" }
  );

  const handleChangeValue = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { target } = event;
      const { value: newValue } = target;
      setValue(newValue);
    },
    []
  );

  useEffect(() => {
    searchByTerm(debounceValue);
  }, [debounceValue, searchByTerm]);

  useEffect(() => {
    if (isVisible && debounceValue) {
      nextPage(debounceValue);
    }
  }, [isVisible, debounceValue, nextPage]);

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
          {plantsNotFound && (
            <Paragraph>
              {t("plants_not_found")} &quot;{debounceValue}&quot;
            </Paragraph>
          )}

          {areTherePlants && (
            <Pane borderTop>
              <PlantList plants={plants} />
              <Pane width="100%" height="1rem" ref={visorRef} />
            </Pane>
          )}

          {status === "failed" && error && (
            <Alert intent="danger" title={error.name}>
              {error.message}
            </Alert>
          )}

          {isLoading && <Loader minHeight="2rem" paddingY="2rem" />}
        </Pane>
      </Wrapper>
    </Pane>
  );
}

export default memo(SearchView);

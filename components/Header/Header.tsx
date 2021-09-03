import { memo } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import {
  Badge,
  Heading,
  IconButton,
  Link,
  Pane,
  SearchIcon,
  TreeIcon,
} from "evergreen-ui";

import { useSearchContext } from "@contexts/search";
import { Languages, Wrapper } from "@components";
import { Routes } from "@utils/constants";

function Header() {
  const { t } = useTranslation("header");
  const router = useRouter();
  const { state } = useSearchContext();
  const { status, data } = state;
  const { locales } = router;

  const dataLength = data.items.length;
  const isSearchRoute = router.pathname === Routes.SEARCH;

  return (
    <Pane is="header" elevation={1}>
      <Wrapper maxWidth="1280px">
        <Pane
          paddingY=".5rem"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Pane>
            <NextLink href={Routes.HOME} passHref>
              <Link paddingY="1rem" display="inline-block" cursor="pointer">
                <Heading is="h1" display="flex" gap=".5rem">
                  <TreeIcon color="green500" />
                  Treepedia
                  <Badge color="green">{t("badge")}</Badge>
                </Heading>
              </Link>
            </NextLink>
          </Pane>

          <Pane display="flex" gap="1rem">
            {!!locales?.length && <Languages />}

            <NextLink href={Routes.SEARCH} passHref>
              <IconButton
                disabled={isSearchRoute}
                intent="success"
                appearance="minimal"
                is="a"
                icon={
                  isSearchRoute ? () => <Badge>{dataLength}</Badge> : SearchIcon
                }
                isLoading={status === "loading"}
              />
            </NextLink>
          </Pane>
        </Pane>
      </Wrapper>
    </Pane>
  );
}

export default memo(Header);

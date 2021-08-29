import NextLink from "next/link";
import { Routes } from "@constants";
import {
  Heading,
  TreeIcon,
  Pane,
  Link,
  Badge,
  Button,
  IconButton,
  SearchIcon,
} from "evergreen-ui";
import { Languages, Wrapper } from "@components";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

function Header() {
  const { t } = useTranslation("header");
  const router = useRouter();
  const { locales } = router;

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
                intent="warning"
                appearance="primary"
                is="a"
                icon={SearchIcon}
              />
            </NextLink>
          </Pane>
        </Pane>
      </Wrapper>
    </Pane>
  );
}

export default Header;

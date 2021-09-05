import NextLink from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import {
  Avatar,
  Badge,
  Heading,
  IconButton,
  Link,
  LogInIcon,
  LogOutIcon,
  Menu,
  Pane,
  Popover,
  SearchIcon,
  TreeIcon,
} from "evergreen-ui";
import { signIn, signOut, useSession } from "next-auth/client";

import { useSearchContext } from "@contexts/search";
import { Languages, Wrapper } from "@components";
import { Routes } from "@utils/constants";

function Header() {
  // hooks
  const { t } = useTranslation("header");
  const router = useRouter();
  const { state } = useSearchContext();
  const [session, isLoading] = useSession();

  const { status, data } = state;
  const { locales } = router;
  const dataLength = data.items.length;
  const isSearchRoute = router.pathname === Routes.SEARCH;
  const { name, email, image } = session?.user || {};

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
                </Heading>
              </Link>
            </NextLink>
          </Pane>

          <Pane display="flex" gap=".5rem">
            {!!locales?.length && <Languages />}

            <NextLink href={Routes.SEARCH} passHref>
              <IconButton
                disabled={isSearchRoute}
                intent="none"
                appearance="minimal"
                is="a"
                icon={
                  isSearchRoute ? () => <Badge>{dataLength}</Badge> : SearchIcon
                }
                isLoading={status === "loading"}
              />
            </NextLink>

            <Pane display="flex" placeContent="center">
              {session ? (
                <Popover
                  content={
                    <Menu>
                      <Menu.Group title={email || name}>
                        <Menu.Item onClick={() => signOut()} icon={LogOutIcon}>
                          {t("logout")}
                        </Menu.Item>
                      </Menu.Group>
                    </Menu>
                  }
                >
                  <Avatar
                    cursor="pointer"
                    src={image || ""}
                    size={32}
                    name={name || email || "unknown user"}
                  />
                </Popover>
              ) : (
                <IconButton
                  borderRadius="50%"
                  backgroundColor="transparent"
                  border="none"
                  isLoading={isLoading}
                  icon={LogInIcon}
                  onClick={() => signIn()}
                />
              )}
            </Pane>
          </Pane>
        </Pane>
      </Wrapper>
    </Pane>
  );
}

export default Header;

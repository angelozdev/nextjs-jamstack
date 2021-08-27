import NextLink from "next/link";
import { Routes } from "@constants";
import { Heading, TreeIcon, Pane, Link, Combobox } from "evergreen-ui";
import { Wrapper } from "@components";
import { useRouter } from "next/router";
import { useCallback } from "react";

function Header() {
  const router = useRouter();
  const { locale, locales } = router;

  const handleOnChangeLocale = useCallback((value: string) => {
    window
      .fetch(`/api/language`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale: value }),
      })
      .catch(console.error)
      .finally(() => window.location.replace("/"));
  }, []);

  if (!locales || !locale) {
    return null;
  }

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

          {!!locales.length && (
            <Pane>
              <Combobox
                initialSelectedItem={locale}
                items={locales}
                width={120}
                onChange={handleOnChangeLocale}
              />
            </Pane>
          )}
        </Pane>
      </Wrapper>
    </Pane>
  );
}

export default Header;

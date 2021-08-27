import { useCallback } from "react";
import NextLink from "next/link";
import { Routes } from "@constants";
import { Heading, TreeIcon, Pane, Link, SegmentedControl } from "evergreen-ui";
import { Wrapper } from "@components";
import { useRouter } from "next/router";

// types
interface Option {
  label: string;
  value: Locales;
}

const localeList: Option[] = [
  {
    label: "ES",
    value: "es",
  },
  {
    label: "EN",
    value: "en-US",
  },
];

function Header() {
  const router = useRouter();
  const { locale, locales, asPath } = router;

  const handleOnChangeLocale = useCallback(
    (value: Locales) => {
      if (locale === value) return;
      window
        .fetch(`/api/language`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ locale: value }),
        })
        .catch(console.error)
        .finally(() => {
          router.replace(asPath, undefined, { locale: value });
        });
    },
    [locale, asPath, router]
  );

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
              <SegmentedControl
                options={localeList}
                value={locale}
                onChange={(value) => handleOnChangeLocale(value as Locales)}
              />
            </Pane>
          )}
        </Pane>
      </Wrapper>
    </Pane>
  );
}

export default Header;

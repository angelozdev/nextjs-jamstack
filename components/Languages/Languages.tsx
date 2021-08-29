import React, { useCallback, useMemo } from "react";
import { EnvironmentVariables, Locales } from "@constants";
import { Button, Pane, TranslateIcon } from "evergreen-ui";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

// types
interface Option {
  label: string;
  value: Locales;
}

function Languages() {
  const { t } = useTranslation("header");
  const router = useRouter();
  const { locale, asPath } = router;

  const localeList: Option[] = useMemo(() => {
    return [
      {
        label: t("language.es"),
        value: Locales.SPANISH,
      },
      {
        label: t("language.en"),
        value: Locales.ENGLISH,
      },
    ];
  }, [t]);

  const handleOnChangeLocale = useCallback(
    (value: Locales) => {
      if (locale === value) return;
      window
        .fetch(`/api/language`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ locale: value }),
        })
        .catch((error) => {
          if (EnvironmentVariables.node.env === "development") {
            console.error(error);
          }
        })
        .finally(() => {
          router.replace(asPath, undefined, { locale: value });
        });
    },
    [locale, asPath, router]
  );

  return (
    <Pane>
      {localeList.map(({ label, value }) => {
        const isActive = value === locale;
        if (isActive) return;
        return (
          <Button
            iconBefore={<TranslateIcon />}
            intent="info"
            appearance="minimal"
            onClick={() => handleOnChangeLocale(value)}
            key={value}
          >
            <sup>{label}</sup>
          </Button>
        );
      })}
    </Pane>
  );
}

export default Languages;

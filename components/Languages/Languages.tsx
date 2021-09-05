import React, { Fragment, useCallback } from "react";
import { Button, Pane, TranslateIcon } from "evergreen-ui";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { EnvironmentVariables, Locales } from "@utils/constants";

// types
interface Option {
  label: string;
  value: Locales;
}

function Languages() {
  const { t } = useTranslation("header");
  const router = useRouter();
  const { locale: currentLocale } = router;

  const localeList: Option[] = [
    {
      label: t("language.es"),
      value: Locales.SPANISH,
    },
    {
      label: t("language.en"),
      value: Locales.ENGLISH,
    },
  ];

  return (
    <Pane display="flex" alignItems="center">
      {localeList.map(({ label, value }) => {
        const isActive = value === currentLocale;
        if (isActive) return;
        return (
          <Pane key={value} is="form" method="POST" action="/api/language">
            <input name="locale" type="hidden" value={value} />
            <Button
              type="submit"
              iconBefore={<TranslateIcon />}
              intent="info"
              appearance="minimal"
              size="small"
            >
              {label}
            </Button>
          </Pane>
        );
      })}
    </Pane>
  );
}

export default Languages;

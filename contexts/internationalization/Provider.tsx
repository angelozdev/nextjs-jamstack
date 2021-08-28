import { useCallback, useMemo } from "react";
import { Context } from "./";
import { NextRouter, useRouter } from "next/router";
import { Locales } from "@constants";

// translations
import esMessages from "@locales/es/index.json";
import enMessages from "@locales/en-US/index.json";

// types
import type { PropsWithChildren } from "react";
import type { Translate } from "./types";

interface INextRouter extends NextRouter {
  locale: Locales;
  defaultLocale: Locales;
}

const locales: Record<Locales, Record<string, string | undefined>> = {
  "en-US": enMessages,
  es: esMessages,
};

function Provider({ children }: PropsWithChildren<{}>) {
  const { locale, defaultLocale } = useRouter() as INextRouter;

  const translate: Translate = useCallback(
    ({ id, defaultMessage }) => {
      if (!defaultLocale) {
        throw new Error(
          "[InternationalizationProvider]: invalid defaultLocale"
        );
      }

      const meesageById = locales[locale][id];
      const messageByDefaultLocale = locales[defaultLocale][id];
      const message = meesageById || defaultMessage || messageByDefaultLocale;

      if (!message) {
        throw new Error("[InternationalizationProvider]: message invalid");
      }

      return message;
    },
    [defaultLocale, locale]
  );

  const value = useMemo(() => {
    return {
      t: translate,
      currentLocale: locale,
    };
  }, [locale, translate]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export default Provider;

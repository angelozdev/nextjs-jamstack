import { useCallback, useMemo } from "react";
import { Context } from "./";
import { useRouter } from "next/router";
import { Locales } from "@constants";

// translations
import esMessages from "@locales/es/index.json";
import enMessages from "@locales/en-US/index.json";

// types
import type { PropsWithChildren } from "react";
import type { Translate } from "./types";

type Message = string | undefined;

const locales: Record<Locales, any> = {
  "en-US": enMessages,
  es: esMessages,
};

function Provider({ children }: PropsWithChildren<{}>) {
  const { locale, defaultLocale } = useRouter();

  const translate: Translate = useCallback(
    ({ id, defaultMessage }) => {
      const message = (locales[locale as Locales][id] ||
        locales[defaultLocale as Locales][id] ||
        defaultMessage) as Message;

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
      currentLocale: locale as Locales,
    };
  }, [locale, translate]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export default Provider;

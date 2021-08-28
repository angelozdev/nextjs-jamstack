import { Locales } from "@constants";
import { createContext } from "react";
import { Translate } from "./types";

interface Context {
  t: Translate;
  currentLocale: Locales;
}

const InternationalizationContext = createContext<Context | null>(null);

InternationalizationContext.displayName = "InternationalizationContext";

export default InternationalizationContext;

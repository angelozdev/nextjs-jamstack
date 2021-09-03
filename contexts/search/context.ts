import { createContext } from "react";
import { IContext } from "./types";

const SearchContext = createContext<null | IContext>(null);

SearchContext.displayName = "SearchContext";

export default SearchContext;

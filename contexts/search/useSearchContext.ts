import { useContext } from "react";
import { Context } from "@contexts/search";

function useSearchContext() {
  const data = useContext(Context);
  if (!data) throw new Error("[useSearchContext]: Provider is missing");
  return data;
}

export default useSearchContext;

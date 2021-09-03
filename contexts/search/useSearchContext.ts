import { Context } from "contexts/search";
import { useContext } from "react";

function useSearchContext() {
  const data = useContext(Context);
  if (!data) throw new Error("[useSearchContext]: Provider is missing");
  return data;
}

export default useSearchContext;

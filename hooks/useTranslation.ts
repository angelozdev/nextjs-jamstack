import { useContext } from "react";
import { Context } from "contexts/internationalization";

function useTranslation() {
  const context = useContext(Context);

  if (!context) {
    throw new Error("[useTranslation]: missing provider");
  }

  return context;
}

export default useTranslation;

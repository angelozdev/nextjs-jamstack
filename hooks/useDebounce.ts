import { useEffect, useState } from "react";

function useDebounce(value: string, delay: number = 100) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [delay, value]);

  return debounceValue;
}

export default useDebounce;

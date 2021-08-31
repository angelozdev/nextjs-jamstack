import { useEffect, useState } from "react";

function useDebounce(value: string, delay: number = 100): string {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceValue(value.trim());
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [delay, value]);

  return debounceValue;
}

export default useDebounce;

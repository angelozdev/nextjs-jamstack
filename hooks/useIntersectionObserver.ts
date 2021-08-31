import { useCallback, useEffect, useState } from "react";

// types
import type { RefObject } from "react";

function useIntersectionObserver(
  element: RefObject<HTMLElement> | null,
  options?: IntersectionObserverInit
) {
  const [isVisible, setIsVisible] = useState(false);

  const callback: IntersectionObserverCallback = useCallback((entries) => {
    const [firstElement] = entries;
    setIsVisible(firstElement.isIntersecting);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);

    if (element?.current) {
      observer.observe(element.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [element, options, callback]);

  return { isVisible };
}

export default useIntersectionObserver;

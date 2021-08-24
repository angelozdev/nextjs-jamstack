function formatQueryParams<T>(object: T | Object): string {
  const formatedParams = Object.entries(object)
    .sort()
    .reduce((accu, [key, value], index) => {
      if (value === null || value === undefined) return accu;
      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent(value);
      if (index === 0) return accu + `?${encodedKey}=${encodedValue}`;

      return accu + `&${encodedKey}=${encodedValue}`;
    }, "");

  return formatedParams;
}

export default formatQueryParams;

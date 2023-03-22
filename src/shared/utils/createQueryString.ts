import qs from "query-string";

export function createQueryString(
  base: string,
  query = {},
  options?: qs.StringifyOptions
) {
  return `${base.slice(-base.length) === "?" ? base : base + "?"}${qs.stringify(
    query,
    options
  )}`;
}

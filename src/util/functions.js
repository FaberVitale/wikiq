//flow
export const noop: (...args: Array<mixed>) => void = () => {};

/* noop if:
 * - in production
 * - server side
 * - someone has deleted the reference to console
 * - console.warn is a function
 */
export const warn: (...args: Array<mixed>) => void =
  process.env.NODE_ENV !== "production" &&
  typeof window !== "undefined" &&
  window.console != null &&
  typeof window.console.warn === "function"
    ? window.console.warn
    : noop;

export const nothing: (...args: Array<mixed>) => null = () => null;

/* see: https://reactjs.org/docs/higher-order-components.html#convention-wrap-the-display-name-for-easy-debugging
 */
export const getDisplayName = (hocName: string, Comp: any) =>
  `With${hocName}(${Comp.displayName || Comp.name || "Component"})`;

export type ComputeChangedBitsFactory<C: {}> = (
  prop: Array<$Keys<C>>
) => ComputeChangedBits<C>;

export type ComputeChangedBits<Context> = (
  prev: Context,
  next: Context
) => number;

export const computeChangedBitsFactory: ComputeChangedBitsFactory<
  *
> = properties => {
  if (properties.length > 31) {
    throw new Error(
      "computeChangedBitsFactory: context api computeChangedBits supports " +
        `up to 31 properties, got an array with length ${properties.length}`
    );
  }

  return (prev, next) => {
    let res = 0;

    for (let i = 0, len = properties.length; i < len; i++) {
      let prop = properties[i];

      if (prev[prop] !== next[prop]) {
        res |= 1 << i;
      }
    }
    return res;
  };
};

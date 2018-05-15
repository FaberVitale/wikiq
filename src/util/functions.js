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

/* applies text ellipsis if text.length is higher than the expected length
 * or len (2nd argument) is lower than 0 or len is not a safe integer.
 * For performance reasons it uses text.length instead of taking into account
 * surrogate pairs.
 * 
 * it returns just the ellipsis if len is NaN
 */
export const ellipsableChar = new Set("\u0020\r\n\t\f\v.,:;"); //\s + punctuation chars

export const applyEllipsis = (len: number, text: string) => {
  if (text.length <= len || len < 0) {
    return text;
  }

  let lastCharIndex = len >>> 0;
  let char;
  let times = 10;

  while (lastCharIndex-- && times--) {
    char = text[lastCharIndex];

    if (ellipsableChar.has(char)) {
      break;
    }
  }

  return text.slice(0, lastCharIndex) + "...";
};

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

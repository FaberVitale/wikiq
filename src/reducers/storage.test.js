import storage from "./storage";

describe("src/reducers/storage", () => {
  const mockStorage = {
    _cache: Object.create(null),
    _throw: false,

    getItem(key) {
      if (this._throw) {
        throw new Error("storage err");
      }

      if (Object.prototype.hasOwnProperty.call(this._cache, key)) {
        return this._cache[key];
      }
      return null;
    },
    setItem(key, val) {
      if (this._throw) {
        throw new Error("storage err");
      }
      this._cache[key] = val;
    },

    clear() {
      this._cache = Object.create(null);
    },

    _reset() {
      this._throw = false;
      this.clear();
    },
  };

  const throwIt = () => {
    throw new Error("err");
  };

  const initState = { init: true };
  const key = "track";
  const mockReducer = jest.fn((state = initState, action) => state);

  beforeEach(() => {
    mockReducer.mockClear();
    mockStorage._reset();
  });

  describe("higher order reducer", () => {
    it("sets initState to the value retrieved if present", () => {
      let val = { r: "r" };

      mockStorage.setItem(key, JSON.stringify(val));

      const reducer = storage(mockReducer, key, { storage: mockStorage });

      expect(reducer(undefined, {})).toEqual(val);
      expect(mockReducer.mock.calls).toHaveLength(1);
    });

    it("sets initState to the reducer initState if it is not present", () => {
      const reducer = storage(mockReducer, "not", { storage: mockStorage });

      expect(reducer(undefined, {})).toBe(initState);
      expect(mockReducer.mock.calls).toHaveLength(2);
    });

    it("rejects item retrieved if it is not valid", () => {
      const item = null;
      const isValid = (val) => val !== null;

      mockStorage.setItem(key, JSON.stringify(item));

      const reducer = storage(mockReducer, key, {
        storage: mockStorage,
        isValid,
      });

      expect(reducer(undefined, {})).toBe(initState);
      expect(mockReducer.mock.calls).toHaveLength(2);
    });

    it("returns the initState if localStorage.getItem throws", () => {
      mockStorage.setItem(key, "rt");

      mockStorage._throw = true;

      const reducer = storage(mockReducer, key, { storage: mockStorage });

      expect(reducer(undefined, {})).toBe(initState);
    });

    it("returns the initState if isValid throws", () => {
      mockStorage.setItem(key, "rt");

      const reducer = storage(mockReducer, key, {
        storage: mockStorage,
        isValid: throwIt,
      });

      expect(reducer(undefined, initState)).toBe(initState);
    });

    it("returns the initState if onValue throws", () => {
      mockStorage.setItem(key, "rty");

      const reducer = storage(mockReducer, key, {
        storage: mockStorage,
        onValue: throwIt,
      });

      expect(reducer(undefined, {})).toBe(initState);
    });

    it("transforms the value received using onValue", () => {
      const value = 2;
      mockStorage.setItem(key, value.toString());

      const reducer = storage(mockReducer, key, {
        storage: mockStorage,
        onValue: (a) => parseInt(a, 10) * 2,
      });

      expect(reducer(undefined, {})).toBe(value * 2);
    });
  });

  describe("reducer", () => {
    const reducer = storage(mockReducer, "rep");

    it("it returns the initial state if it is not provided", () => {
      expect(reducer(undefined, {})).toBe(initState);
    });

    it("returns the passed state if the action is not known", () => {
      let r = {};

      expect(reducer(r, { type: "@@TEST" })).toBe(r);
    });
  });
});

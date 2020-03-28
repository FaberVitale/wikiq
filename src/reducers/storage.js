//@flow
import type { Reducer } from "redux";
import { $localStorage } from "../util/dom";

/* higher order reducer that retrieves the initial state from the local storage
 * If the item is present is
 * transformed using a user-defined function onValue that defaults to JSON.parse,
 *
 * It is possible to validate the result passing a function that given an input
 *
 * signature:
 *  reducer: a valid reducer,
 *  key: used to request the initial State,
 *  options:
 *    storage: an object that has getItem function,
 *      defaults to localStore if present
 *    onValue: a function that given the string value recieved applies
 *      a transformation in order to deserialize the state,
 *      defaults to JSON.parse
 *    isValid: afunction that given the rehidrated value, validates it
 *      defaults to (val: S) => true
 */
interface GetItem {
  +getItem: (key: string) => ?string;
}

type Options<S> = {
  storage: GetItem,
  isValid: (value: S) => boolean,
  onValue: (value: string) => S,
};

const fauxStorage: GetItem = {
  getItem() {
    return null;
  },
};

const defOptions: Options<any> = {
  storage: $localStorage != null ? $localStorage : fauxStorage,
  isValid: (anyVal) => true,
  onValue: JSON.parse,
};
const storageType = "@@STORAGE_INIT";

export default <S, A>(
  reducer: Reducer<S, A>,
  key: string,
  options?: $Shape<Options<S>>
) => {
  const optionsMerged: Options<S> = Object.assign({}, defOptions, options);

  let storageValue: ?string = null;
  let initState;
  let hasAcquiredInitState = false;

  try {
    storageValue = optionsMerged.storage.getItem(key);
  } catch (e) {}

  if (storageValue != null) {
    try {
      let extractedValue = optionsMerged.onValue(storageValue);

      if (optionsMerged.isValid(extractedValue)) {
        hasAcquiredInitState = true;
        initState = extractedValue;
      }
    } catch (e) {}
  }

  if (!hasAcquiredInitState) {
    initState = reducer(undefined, { action: storageType });
  }

  return (state: S = initState, action: A) => reducer(state, action);
};

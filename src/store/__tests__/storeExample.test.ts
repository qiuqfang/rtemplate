import { describe, expect, test } from "@jest/globals";
import {
  changeStoreObject,
  changeStoreObjectAProp,
  changeStoreObjectBProp,
  useStoreExample,
} from "../storeExample";

describe("test storeExample.ts", () => {
  test("test changeStoreObject", () => {
    changeStoreObject({ a: 1, b: { a: 2, b: 3 } });
    const storeExample = useStoreExample.getState();
    expect(storeExample.storeObject).toStrictEqual({ a: 1, b: { a: 2, b: 3 } });
  });

  test("test changeStoreObjectAProp", () => {
    changeStoreObjectAProp(2000);
    const storeExample = useStoreExample.getState();
    expect(storeExample.storeObject.a).toBe(2000);
  });

  test("test changeStoreObjectBProp", () => {
    changeStoreObjectBProp({ a: 222, b: 1 });
    const storeExample = useStoreExample.getState();
    expect(storeExample.storeObject.b).toStrictEqual({ a: 222, b: 1 });
  });
});

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type StoreExampleProps = {
  storeObject: { a: number; b: { a: number; b: number } };
};

export const useStoreExample = create<StoreExampleProps>()(
  immer((set) => ({
    storeObject: {
      a: 1,
      b: { a: 1, b: 1 },
    },
  }))
);

export const changeStoreObject = (data: StoreExampleProps["storeObject"]) => {
  useStoreExample.setState((state) => {
    state.storeObject = data;
  });
};

export const changeStoreObjectAProp = (value: number) => {
  useStoreExample.setState((state) => {
    state.storeObject.a = value;
  });
};

export const changeStoreObjectBProp = (value: StoreExampleProps["storeObject"]["b"]) => {
  useStoreExample.setState((state) => {
    state.storeObject.b = value;
  });
};

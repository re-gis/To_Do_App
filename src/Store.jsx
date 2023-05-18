import { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
  data: localStorage.getItem("data")
    ? JSON.parse(localStorage.getItem("data"))
    : null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE":
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}

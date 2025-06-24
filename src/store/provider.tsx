"use client";

import AuthInitializer from "./authInitializer";
import { store } from "./index";
import { Provider } from "react-redux";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <AuthInitializer>{children}</AuthInitializer>
    </Provider>
  );
}

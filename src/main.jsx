import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { route } from "./route.jsx";
import { addUser } from "./features/user/userSlice";
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <Provider store={store}>
      {(() => {
        try {
          const raw = localStorage.getItem("USER");
          if (raw) {
            const parsed = JSON.parse(raw);
            store.dispatch(addUser(parsed));
          }
        } catch (e) {
          console.error("Failed to hydrate user from localStorage", e);
        }
        return null;
      })()}
      <RouterProvider router={route}>
        <App />
      </RouterProvider>
    </Provider>
  // </React.StrictMode>
);

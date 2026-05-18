import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router";
import { TodosPage } from "./page/TodosPage.tsx";
import { UserProfile } from "./components/UserProfile/UserProfile.tsx";
import { MainLayout } from "./components/MainLayout/MainLayout.tsx";
import ErrorBoundary from "antd/es/alert/ErrorBoundary";
import { loadTodos, todosActions } from "./page/TodosPage.data.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <TodosPage />,
        loader: loadTodos,
        action: todosActions,
      },
      {
        path: "profile",
        element: <UserProfile />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

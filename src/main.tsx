import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { MainLayout } from "./lyaouts/MainLayout/MainLayout";
import { TodosPage } from "./page/TodosPage/TodosPage";
import { UserProfile } from "./page/UserProfilePage/UserProfilePage";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { AuthLayout } from "./lyaouts/AuthLayout/AuthLayout";
import { SignUpPage } from "./page/SignUpPage/SignUpPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<SignUpPage />} />
          </Route>
          <Route path="/todos" element={<MainLayout />}>
            <Route index element={<TodosPage />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);

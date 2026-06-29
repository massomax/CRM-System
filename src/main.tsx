import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { MainLayout } from "./components/MainLayout/MainLayout";
import { TodosPage } from "./page/TodosPage";
import { UserProfile } from "./components/UserProfile/UserProfile";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<TodosPage />} />
          <Route path="profile" element={<UserProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);

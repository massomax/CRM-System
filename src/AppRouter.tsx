import { Navigate, Route, Routes } from "react-router";
import { AuthLayout } from "./lyaouts/AuthLayout/AuthLayout";
import { SignUpPage } from "./page/SignUpPage/SignUpPage";
import { SignInPage } from "./page/SignInPage/SignInPage";
import { MainLayout } from "./lyaouts/MainLayout/MainLayout";
import { TodosPage } from "./page/TodosPage";
import { UserProfilePage } from "./page/UserProfilePage/UserProfilePage";
import type { JSX } from "react";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { EntryRoute } from "./routes/EntryRoute";

export function AppRouter(): JSX.Element {
  return (
    <Routes>
      <Route element={<EntryRoute />}>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Navigate to="signin" replace />} />
          <Route path="signin" element={<SignInPage />} />
          <Route path="signup" element={<SignUpPage />} />
        </Route>
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/todos" element={<TodosPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
        </Route>
      </Route>
    </Routes>
  );
}

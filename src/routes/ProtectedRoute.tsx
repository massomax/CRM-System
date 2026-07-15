import { selectAuthStatus } from "@/store/auth/authSelectors";
import { useAppSelector } from "@/store/hooks";
import type { JSX } from "react";
import { Navigate, Outlet } from "react-router";

export function ProtectedRoute(): JSX.Element {
  const status = useAppSelector(selectAuthStatus);

  if (status === "initializtion") {
    return <div>Загрузка...</div>;
  }
  if (status === "unauthenticated") {
    return <Navigate to="/signin" replace />;
  }
  return <Outlet />;
}

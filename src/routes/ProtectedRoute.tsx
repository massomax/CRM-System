import { selectAuthStatus } from "@/store/auth/authSelectors";
import { useAppSelector } from "@/store/hooks";
import type { JSX } from "react";
import { Navigate, Outlet } from "react-router";

export function ProtectedRoute(): JSX.Element {
  const isAuthorizaed = useAppSelector(selectAuthStatus);

  if (!isAuthorizaed) {
    return <Navigate to="/signin" replace />;
  }
  return <Outlet />;
}

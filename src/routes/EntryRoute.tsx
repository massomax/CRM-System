import { selectAuthStatus } from "@/store/auth/authSelectors";
import { useAppSelector } from "@/store/hooks";
import type { JSX } from "react";
import { Navigate, Outlet } from "react-router";

export function EntryRoute(): JSX.Element {
  const status = useAppSelector(selectAuthStatus);
  if (status === "initializtion") {
    return <div>Загрузка...</div>;
  }
  if (status === "authenticated") {
    return <Navigate to="/todos" replace />;
  }
  return <Outlet />;
}

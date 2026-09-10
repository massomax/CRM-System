import {
  selectAuthStatus,
  selectCurrentUser,
  selectCurrentUserStatus,
} from "@/store/auth/authSelectors";
import { useAppSelector } from "@/store/hooks";
import type { Role } from "@/types/users";
import type { JSX } from "react";
import { Navigate, Outlet } from "react-router";

interface ProtectedRouteProps {
  allowedRoles?: Role[];
}

export function ProtectedRoute({
  allowedRoles,
}: ProtectedRouteProps): JSX.Element {
  const isAuthorizaed = useAppSelector(selectAuthStatus);
  const currentUser = useAppSelector(selectCurrentUser);
  const currentUserStatus = useAppSelector(selectCurrentUserStatus);

  if (!isAuthorizaed) {
    return <Navigate to="/signin" replace />;
  }

  if (allowedRoles) {
    if (currentUserStatus === "idle" || currentUserStatus === "pending") {
      return <div>Загрузка...</div>;
    }

    if (!currentUser) {
      return <Navigate to="/todos" replace />;
    }

    const hasAllowedRole = currentUser.roles.some((role: Role) =>
      allowedRoles.includes(role),
    );

    if (!hasAllowedRole) {
      return <Navigate to="/todos" replace />;
    }
  }
  return <Outlet />;
}

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectUsers,
  selectUsersError,
  selectUsersStatus,
  selectUsersTotal,
} from "@/store/users/usersSelectors";
import { getUserListThunk } from "@/store/users/usersThunks";
import type {
  GetUserListParams,
  Role,
  SortDirection,
  UserSortField,
} from "@/types/auth";
import type { TableProps } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { User } from "@/types/auth";

const isRole = (value: unknown): value is Role => {
  return (
    value === "user" ||
    value === "manager" ||
    value === "moderator" ||
    value === "admin"
  );
};

export function useUsersTable() {
  const dispatch = useAppDispatch();

  const users = useAppSelector(selectUsers);
  const usersTotal = useAppSelector(selectUsersTotal);
  const usersStatus = useAppSelector(selectUsersStatus);
  const usersError = useAppSelector(selectUsersError);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const [pageSize, setPageSize] = useState<number>(20);

  const [searchValue, setSearchValue] = useState<string>("");

  const [search, setSearch] = useState<string>("");

  const [sortField, setSortField] = useState<UserSortField>();

  const [sortDirection, setSortDirection] = useState<SortDirection>();

  const [selectedRoles, setSelectedRoles] = useState<Role[]>([]);

  const requestParams = useMemo<GetUserListParams>(() => {
    return {
      limit: pageSize,
      offset: (currentPage - 1) * pageSize,

      search: search.length > 0 ? search : undefined,

      orderBy: sortField,
      orderDir: sortDirection,

      roles: selectedRoles.length > 0 ? selectedRoles : undefined,
    };
  }, [currentPage, pageSize, search, sortField, sortDirection, selectedRoles]);

  useEffect(() => {
    dispatch(getUserListThunk(requestParams));
  }, [dispatch, requestParams]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setCurrentPage(1);
      setSearch(searchValue.trim());
    }, 1000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [searchValue]);

  const handlePaginationChange = useCallback(
    (page: number, size: number): void => {
      setCurrentPage(page);
      setPageSize(size);
    },
    [],
  );

  const handleTableChange: TableProps<User>["onChange"] = (
    _pagination,
    filters,
    sorter,
    extra,
  ) => {
    if (extra.action === "filter") {
      const rolesFilter = filters.roles;

      const roles = rolesFilter ? rolesFilter.filter(isRole) : [];

      setSelectedRoles(roles);
      setCurrentPage(1);

      return;
    }

    if (extra.action === "sort") {
      const currentSorter = Array.isArray(sorter) ? sorter[0] : sorter;

      const field = currentSorter.field;

      if (field !== "userName" && field !== "email") {
        setSortField(undefined);
        setSortDirection(undefined);
        setCurrentPage(1);

        return;
      }

      if (currentSorter.order === "ascend") {
        setSortField(field);
        setSortDirection("asc");
      } else if (currentSorter.order === "descend") {
        setSortField(field);
        setSortDirection("desc");
      } else {
        setSortField(undefined);
        setSortDirection(undefined);
      }

      setCurrentPage(1);
    }
  };

  const handleUserDeleted = (): void => {
    if (users.length === 1 && currentPage > 1) {
      setCurrentPage((page) => page - 1);
      return;
    }

    dispatch(getUserListThunk(requestParams));
  };

  return {
    users,
    usersTotal,
    usersStatus,
    usersError,

    currentPage,
    pageSize,

    searchValue,
    setSearchValue,

    selectedRoles,

    sortField,
    sortDirection,

    handlePaginationChange,
    handleTableChange,
    handleUserDeleted,
  };
}

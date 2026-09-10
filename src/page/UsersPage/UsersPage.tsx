import { UserActions } from "@/components/users/UserActions/UserActions";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectUsers,
  selectUsersError,
  selectUsersStatus,
  selectUsersTotal,
} from "@/store/users/usersSelectors";
import { getUserListThunk } from "@/store/users/usersThunks";
import {
  type Role,
  type SortDirection,
  type User,
  type UserSortField,
} from "@/types/auth";
import { Button, Flex, Input, Table, Tag, type TableProps } from "antd";
import { useEffect, useState, type JSX } from "react";
import { useNavigate, type NavigateFunction } from "react-router";

const getColumns = (
  navigate: NavigateFunction,
  onDeleted: () => void,
  selectedRoles: Role[],
): TableProps<User>["columns"] => {
  return [
    {
      title: "Имя",
      dataIndex: "userName",
      key: "userName",
      sorter: true,
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
      sorter: true,
    },
    {
      title: "Дата регистрации",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) =>
        new Date(createdAt).toLocaleDateString("ru-RU"),
    },
    {
      title: "Блокировка",
      dataIndex: "isBlocked",
      key: "isBlocked",
      render: (isBlocked: boolean) => (
        <Tag>{isBlocked ? "Заблокирован" : "Активен"}</Tag>
      ),
    },
    {
      title: "Права доступа",
      dataIndex: "roles",
      key: "roles",
      filters: [
        { text: "User", value: "user" },
        { text: "Manager", value: "manager" },
        { text: "Moderator", value: "moderator" },
        { text: "Admin", value: "admin" },
      ],

      filteredValue: selectedRoles.length > 0 ? selectedRoles : null,

      render: (roles: User["roles"]) => (
        <Flex gap="small" align="center" wrap>
          {roles.map((role) => {
            const color =
              role === "user"
                ? "green"
                : role === "moderator"
                  ? "blue"
                  : role === "manager"
                    ? "yellow"
                    : role === "admin"
                      ? "red"
                      : "white";

            return (
              <Tag key={role} color={color}>
                {role.toUpperCase()}
              </Tag>
            );
          })}
        </Flex>
      ),
    },
    {
      title: "Номер телефона",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Действия",
      key: "actions",
      render: (_: unknown, user: User) => (
        <Flex gap={8}>
          <Button onClick={() => navigate(`/users/${user.id}`)}>
            Перейти к профилю
          </Button>

          <UserActions user={user} variant="table" onDeleted={onDeleted} />
        </Flex>
      ),
    },
  ];
};

export function UsersPage(): JSX.Element {
  const navigate = useNavigate();
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
  const handleUserDeleted = (): void => {
    if (users.length === 1 && currentPage > 1) {
      setCurrentPage((page) => page - 1);
      return;
    }

    const offset = (currentPage - 1) * pageSize;

    dispatch(
      getUserListThunk({
        limit: pageSize,
        offset,
        search: search || undefined,
        orderBy: sortField,
        orderDir: sortDirection,
        roles: selectedRoles.length > 0 ? selectedRoles : undefined,
      }),
    );
  };

  const columns = getColumns(navigate, handleUserDeleted, selectedRoles);

  const handleTableChange: TableProps<User>["onChange"] = (
    _pagination,
    filters,
    sorter,
    extra,
  ) => {
    const rolesFilter = filters.roles;

    const roles = rolesFilter ? rolesFilter.map((role) => role as Role) : [];

    setSelectedRoles(roles);

    const currentSorter = Array.isArray(sorter) ? sorter[0] : sorter;

    const field = currentSorter.field;

    if (field === "userName" || field === "email") {
      setSortField(field);

      if (currentSorter.order === "ascend") {
        setSortDirection("asc");
      } else if (currentSorter.order === "descend") {
        setSortDirection("desc");
      } else {
        setSortField(undefined);
        setSortDirection(undefined);
      }
    } else {
      setSortField(undefined);
      setSortDirection(undefined);
    }

    if (extra.action === "filter" || extra.action === "sort") {
      setCurrentPage(1);
    }
  };

  useEffect(() => {
    const offset = (currentPage - 1) * pageSize;

    dispatch(
      getUserListThunk({
        limit: pageSize,
        offset,
        search: search || undefined,
        orderBy: sortField,
        orderDir: sortDirection,
        roles: selectedRoles.length > 0 ? selectedRoles : undefined,
      }),
    );
  }, [
    dispatch,
    currentPage,
    pageSize,
    search,
    sortField,
    sortDirection,
    selectedRoles,
  ]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setCurrentPage(1);
      setSearch(searchValue.trim());
    }, 1000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [searchValue]);

  return (
    <>
      {usersError ? (
        <p>{usersError}</p>
      ) : (
        <Flex vertical gap={16} style={{ width: "100%" }}>
          <Input
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="Поиск по имени или email"
            allowClear
            style={{ width: "50vh", marginTop: 16 }}
          />
          <Table<User>
            columns={columns}
            dataSource={users}
            rowKey="id"
            onChange={handleTableChange}
            loading={usersStatus === "pending"}
            style={{ width: "100%" }}
            locale={{
              emptyText: "Пользователи не найдены",
            }}
            pagination={{
              current: currentPage,
              pageSize,
              total: usersTotal,
              showSizeChanger: true,
              onChange: (page, size) => {
                setCurrentPage(page);
                setPageSize(size);
              },
            }}
          />
        </Flex>
      )}
    </>
  );
}

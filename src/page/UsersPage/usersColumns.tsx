import { UserActions } from "@/components/users/UserActions/UserActions";
import type { Role, SortDirection, User, UserSortField } from "@/types/auth";
import { Button, Flex, Tag, type TableProps } from "antd";
import type { NavigateFunction } from "react-router";

const roleColors: Record<Role, string> = {
  user: "green",
  manager: "yellow",
  moderator: "blue",
  admin: "red",
};

const roleFilters = [
  { text: "User", value: "user" },
  { text: "Manager", value: "manager" },
  { text: "Moderator", value: "moderator" },
  { text: "Admin", value: "admin" },
];

interface GetUsersColumnsParams {
  navigate: NavigateFunction;
  onDeleted: () => void;
  selectedRoles: Role[];
  sortField?: UserSortField;
  sortDirection?: SortDirection;
}

export const getUsersColumns = ({
  navigate,
  onDeleted,
  selectedRoles,
  sortField,
  sortDirection,
}: GetUsersColumnsParams): TableProps<User>["columns"] => {
  const getSortOrder = (field: UserSortField): "ascend" | "descend" | null => {
    if (sortField !== field) {
      return null;
    }

    if (sortDirection === "asc") {
      return "ascend";
    }

    if (sortDirection === "desc") {
      return "descend";
    }

    return null;
  };

  return [
    {
      title: "Имя",
      dataIndex: "userName",
      key: "userName",
      sorter: true,
      sortOrder: getSortOrder("userName"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: true,
      sortOrder: getSortOrder("email"),
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
      filters: roleFilters,
      filteredValue: selectedRoles.length > 0 ? selectedRoles : null,
      render: (roles: User["roles"]) => (
        <Flex gap="small" align="center" wrap>
          {roles.map((role) => (
            <Tag key={role} color={roleColors[role]}>
              {role.toUpperCase()}
            </Tag>
          ))}
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

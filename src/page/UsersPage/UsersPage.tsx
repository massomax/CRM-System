import { getUserList } from "@/api/usersApi";
import { type User } from "@/types/auth";
import { Flex, Table, Tag, type TableProps } from "antd";
import { useEffect, useState, type JSX } from "react";

const columns: TableProps<User>["columns"] = [
  {
    title: "Имя",
    dataIndex: "userName",
    key: "userName",
  },
  {
    title: "email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Дата регитрации",
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
];

export function UsersPage(): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [total, setTotal] = useState<number>(0);
  const offset = (currentPage - 1) * pageSize;

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const loadUsers = async (): Promise<void> => {
      try {
        const response = await getUserList({ limit: pageSize, offset });
        setUsers(response.data);
        setTotal(response.total);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Неизвестная ошибка при загрузке списка пользователей!");
        }
      } finally {
        setIsLoading(false);
      }
    };
    loadUsers();
  }, [currentPage, pageSize, offset]);

  return (
    <>
      {error && <p>{error}</p>}

      <Table<User>
        columns={columns}
        dataSource={users}
        rowKey="id"
        loading={isLoading}
        style={{ width: "100%" }}
        pagination={{
          current: currentPage,
          pageSize,
          total,
          showSizeChanger: true,
          onChange: (page, size) => {
            setCurrentPage(page);
            setPageSize(size);
          },
        }}
      />
    </>
  );
}

import { UserActions } from "@/components/users/UserActions/UserActions";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectUsers,
  selectUsersError,
  selectUsersStatus,
  selectUsersTotal,
} from "@/store/users/usersSelectors";
import { getUserListThunk } from "@/store/users/usersThunks";
import { type User } from "@/types/auth";
import { Button, Flex, Table, Tag, type TableProps } from "antd";
import { useEffect, useState, type JSX } from "react";
import { useNavigate, type NavigateFunction } from "react-router";

const getColumns = (
  navigate: NavigateFunction,
): TableProps<User>["columns"] => {
  return [
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

          <UserActions user={user} variant="table" />
        </Flex>
      ),
    },
  ];
};

export function UsersPage(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const columns = getColumns(navigate);

  const users = useAppSelector(selectUsers);
  const usersTotal = useAppSelector(selectUsersTotal);
  const usersStatus = useAppSelector(selectUsersStatus);
  const usersError = useAppSelector(selectUsersError);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);

  useEffect(() => {
    const offset = (currentPage - 1) * pageSize;

    dispatch(
      getUserListThunk({
        limit: pageSize,
        offset,
      }),
    );
  }, [dispatch, currentPage, pageSize]);

  return (
    <>
      {usersError ? (
        <p>{usersError}</p>
      ) : (
        <Table<User>
          columns={columns}
          dataSource={users}
          rowKey="id"
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
      )}
    </>
  );
}

import { Flex, Input, Table } from "antd";
import type { JSX } from "react";
import { useNavigate } from "react-router";
import { getUsersColumns } from "./usersColumns";
import { useUsersTable } from "./useUsersTable";

export function UsersPage(): JSX.Element {
  const navigate = useNavigate();

  const {
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
  } = useUsersTable();

  const columns = getUsersColumns({
    navigate,
    onDeleted: handleUserDeleted,
    selectedRoles,
    sortField,
    sortDirection,
  });

  if (usersError) {
    return <p>{usersError}</p>;
  }

  return (
    <Flex vertical gap={16} style={{ width: "100%" }}>
      <Input
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        placeholder="Поиск по имени или email"
        allowClear
        style={{
          width: "50vh",
          marginTop: 16,
        }}
      />

      <Table
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
          onChange: handlePaginationChange,
        }}
      />
    </Flex>
  );
}

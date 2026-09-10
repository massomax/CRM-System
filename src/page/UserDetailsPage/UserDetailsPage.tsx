import { ConfirmModal } from "@/components/ConfirmModal/ConfirmModal";
import { selectCurrentUser } from "@/store/auth/authSelectors";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectBlockUserError,
  selectBlockUserStatus,
  selectDeleteUserError,
  selectDeleteUserStatus,
  selectSelectedUser,
  selectSelectedUserError,
  selectSelectedUserStatus,
  selectUpdateUserError,
  selectUpdateUserRolesError,
  selectUpdateUserRolesStatus,
  selectUpdateUserStatus,
} from "@/store/users/usersSelectors";
import {
  deleteUserThunk,
  getUserByIdThunk,
  setUserBlockStatusThunk,
  updateUserRolesThunk,
  updateUserThunk,
} from "@/store/users/usersSlice";
import type { Role, UserUpdateRequest } from "@/types/auth";
import { LeftOutlined, UserOutlined } from "@ant-design/icons";
import {
  Alert,
  Avatar,
  Button,
  Flex,
  Form,
  Input,
  Select,
  Spin,
  Tag,
  Typography,
} from "antd";
import { useEffect, useState, type JSX } from "react";
import { useNavigate, useParams } from "react-router";

const { Title, Text } = Typography;

type EditUserFormValues = {
  userName: string;
  email: string;
  phoneNumber: string;
};

type BlockActionType = "block" | "unblock" | null;

type RolesDraft = {
  userId: number;
  roles: Role[];
};

type UserDetailsMode = "view" | "edit" | "roles";

const roleOptions: { label: string; value: Role }[] = [
  { label: "User", value: "user" },
  { label: "Manager", value: "manager" },
  { label: "Moderator", value: "moderator" },
  { label: "Admin", value: "admin" },
];

export function UserDetailsPage(): JSX.Element {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [mode, setMode] = useState<UserDetailsMode>("view");
  const [form] = Form.useForm<EditUserFormValues>();

  const selectedUser = useAppSelector(selectSelectedUser);
  const selectedUserStatus = useAppSelector(selectSelectedUserStatus);
  const selectedUserError = useAppSelector(selectSelectedUserError);
  const currentUser = useAppSelector(selectCurrentUser);

  const updateUserStatus = useAppSelector(selectUpdateUserStatus);
  const updateUserError = useAppSelector(selectUpdateUserError);

  const deleteUserStatus = useAppSelector(selectDeleteUserStatus);
  const deleteUserError = useAppSelector(selectDeleteUserError);

  const blockUserStatus = useAppSelector(selectBlockUserStatus);
  const blockUserError = useAppSelector(selectBlockUserError);

  const updateUserRolesStatus = useAppSelector(selectUpdateUserRolesStatus);
  const updateUserRolesError = useAppSelector(selectUpdateUserRolesError);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [blockAction, setBlockAction] = useState<BlockActionType>(null);
  const [rolesDraft, setRolesDraft] = useState<RolesDraft | null>(null);
  const [isRolesModalOpen, setIsRolesModalOpen] = useState<boolean>(false);

  const handleOpenDeleteModal = (): void => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = (): void => {
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = async (): Promise<void> => {
    if (!selectedUser) {
      return;
    }

    try {
      await dispatch(deleteUserThunk(selectedUser.id)).unwrap();

      setIsDeleteModalOpen(false);
      navigate("/users");
    } catch {
      // Ошибка обработана через redux
    }
  };

  const handleOpenBlockModal = (
    action: Exclude<BlockActionType, null>,
  ): void => {
    setBlockAction(action);
  };

  const handleCloseBlockModal = (): void => {
    setBlockAction(null);
  };

  const handleConfirmBlockAction = async (): Promise<void> => {
    if (!selectedUser || blockAction === null) {
      return;
    }

    const isBlocked = blockAction === "block";

    try {
      await dispatch(
        setUserBlockStatusThunk({
          id: selectedUser.id,
          isBlocked,
        }),
      ).unwrap();

      setBlockAction(null);
    } catch {
      // Ошибка уже сохранена в Redux
    }
  };
  const handleOpenRolesModal = (): void => {
    if (selectedRoles.length === 0) {
      return;
    }

    setIsRolesModalOpen(true);
  };

  const handleCloseRolesModal = (): void => {
    setIsRolesModalOpen(false);
  };

  const handleConfirmRoles = async (): Promise<void> => {
    if (!selectedUser || selectedRoles.length === 0) {
      return;
    }

    try {
      await dispatch(
        updateUserRolesThunk({
          id: selectedUser.id,
          roles: selectedRoles,
        }),
      ).unwrap();

      setIsRolesModalOpen(false);
      setRolesDraft(null);
      setMode("view");
    } catch {
      // Ошибка уже сохранена в updateUserRolesError
    }
  };

  const userId = Number(id);

  const handleSave = async (values: EditUserFormValues): Promise<void> => {
    if (!selectedUser) {
      return;
    }

    const newUserData: UserUpdateRequest = {
      userName: values.userName,
      email: values.email,
      phoneNumber: values.phoneNumber,
      birthday: selectedUser.birthday,
    };

    try {
      await dispatch(
        updateUserThunk({
          id: selectedUser.id,
          data: newUserData,
        }),
      ).unwrap();

      setMode("view");
    } catch {
      // Ошибка уже сохранена в usersSlice через updateUserThunk.rejected
    }
  };

  useEffect(() => {
    if (!id || Number.isNaN(userId)) {
      return;
    }

    dispatch(getUserByIdThunk(userId));
  }, [id, userId, dispatch]);

  if (!id || Number.isNaN(userId)) {
    return <Alert type="error" title="Некорректный id пользователя" showIcon />;
  }

  if (selectedUserStatus === "idle" || selectedUserStatus === "pending") {
    return (
      <Flex justify="center" align="center" style={{ minHeight: 300 }}>
        <Spin size="large" />
      </Flex>
    );
  }

  if (selectedUserStatus === "rejected") {
    return (
      <Alert
        type="error"
        title="Не удалось загрузить пользователя"
        description={selectedUserError}
        showIcon
      />
    );
  }

  if (!selectedUser) {
    return <Alert type="warning" title="Пользователь не найден" showIcon />;
  }

  const isAdmin = currentUser?.roles.includes("admin") ?? false;
  const isModerator = currentUser?.roles.includes("moderator") ?? false;

  const canBlockUser = !selectedUser.isBlocked && (isAdmin || isModerator);

  const canUnblockUser = selectedUser.isBlocked && isAdmin;

  const selectedRoles =
    rolesDraft?.userId === selectedUser.id
      ? rolesDraft.roles
      : selectedUser.roles;

  return (
    <Flex
      vertical
      gap={32}
      style={{
        width: "100%",
        padding: 32,
        background: "#ffffff",
        borderRadius: 8,
      }}
    >
      <Flex justify="space-between" align="center">
        <Flex align="center" gap={16}>
          <Button icon={<LeftOutlined />} onClick={() => navigate("/users")}>
            Назад
          </Button>

          <Title level={2} style={{ margin: 0 }}>
            Профиль пользователя
          </Title>
        </Flex>

        <Flex gap={8}>
          {mode === "view" && (
            <>
              <Button type="primary" onClick={() => setMode("edit")}>
                Редактировать
              </Button>

              {isAdmin && (
                <Button onClick={() => setMode("roles")}>Изменить роли</Button>
              )}

              {canBlockUser && (
                <Button danger onClick={() => handleOpenBlockModal("block")}>
                  Заблокировать
                </Button>
              )}

              {canUnblockUser && (
                <Button onClick={() => handleOpenBlockModal("unblock")}>
                  Разблокировать
                </Button>
              )}

              {isAdmin && (
                <Button danger onClick={handleOpenDeleteModal}>
                  Удалить
                </Button>
              )}
            </>
          )}
        </Flex>
      </Flex>

      <Flex align="flex-start" gap={32}>
        <Avatar size={120} icon={<UserOutlined />} />

        {mode === "edit" ? (
          <Form<EditUserFormValues>
            form={form}
            layout="vertical"
            initialValues={{
              userName: selectedUser.userName,
              email: selectedUser.email,
              phoneNumber: selectedUser.phoneNumber,
            }}
            onFinish={handleSave}
            disabled={updateUserStatus === "pending"}
            style={{ width: 400 }}
          >
            {updateUserError && (
              <Alert
                type="error"
                title="Не удалось сохранить изменения"
                description={updateUserError}
                showIcon
                style={{ marginBottom: 16 }}
              />
            )}

            <Form.Item label="Имя" name="userName">
              <Input />
            </Form.Item>

            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>

            <Form.Item label="Номер телефона" name="phoneNumber">
              <Input />
            </Form.Item>

            <Flex gap={8}>
              <Button
                type="primary"
                htmlType="submit"
                loading={updateUserStatus === "pending"}
              >
                Сохранить
              </Button>

              <Button onClick={() => setMode("view")}>Отмена</Button>
            </Flex>
          </Form>
        ) : mode === "roles" ? (
          <Flex vertical gap={16} style={{ width: 400 }}>
            <div>
              <Title level={3} style={{ margin: 0 }}>
                {selectedUser.userName}
              </Title>

              <Text type="secondary">Управление ролями пользователя</Text>
            </div>

            <Flex vertical gap={8}>
              <Text strong>Роли</Text>

              <Select<Role[]>
                mode="multiple"
                value={selectedRoles}
                options={roleOptions}
                onChange={(roles) => {
                  setRolesDraft({
                    userId: selectedUser.id,
                    roles,
                  });
                }}
                placeholder="Выберите роли"
                style={{ width: "100%" }}
              />
            </Flex>

            <Flex gap={8}>
              <Button
                type="primary"
                disabled={selectedRoles.length === 0}
                onClick={handleOpenRolesModal}
              >
                Сохранить роли
              </Button>

              <Button
                onClick={() => {
                  setRolesDraft(null);
                  setMode("view");
                }}
              >
                Отмена
              </Button>
            </Flex>
          </Flex>
        ) : (
          <Flex vertical gap={12}>
            <Title level={3} style={{ margin: 0 }}>
              {selectedUser.userName}
            </Title>

            <Text>{selectedUser.email}</Text>

            <Text>{selectedUser.phoneNumber}</Text>

            <Flex align="center" gap={8}>
              <Text strong>Роли:</Text>

              <Flex gap={4} wrap>
                {selectedUser.roles.map((role) => (
                  <Tag key={role}>{role}</Tag>
                ))}
              </Flex>
            </Flex>
          </Flex>
        )}
      </Flex>
      <ConfirmModal
        open={isDeleteModalOpen}
        title="Удаление пользователя"
        description={`Вы действительно хотите удалить пользователя ${selectedUser.userName}?`}
        confirmText="Удалить"
        danger
        isLoading={deleteUserStatus === "pending"}
        error={deleteUserError}
        onConfirm={handleConfirmDelete}
        onCancel={handleCloseDeleteModal}
      />
      <ConfirmModal
        open={blockAction !== null}
        title={
          blockAction === "block"
            ? "Блокировка пользователя"
            : "Разблокировка пользователя"
        }
        description={
          blockAction === "block"
            ? `Вы действительно хотите заблокировать пользователя ${selectedUser.userName}?`
            : `Вы действительно хотите разблокировать пользователя ${selectedUser.userName}?`
        }
        confirmText={
          blockAction === "block" ? "Заблокировать" : "Разблокировать"
        }
        danger={blockAction === "block"}
        isLoading={blockUserStatus === "pending"}
        error={blockUserError}
        onConfirm={handleConfirmBlockAction}
        onCancel={handleCloseBlockModal}
      />
      <ConfirmModal
        open={isRolesModalOpen}
        title="Изменение ролей"
        description={`Вы действительно хотите изменить роли пользователя ${selectedUser.userName} на: ${selectedRoles.join(", ")}?`}
        confirmText="Изменить роли"
        isLoading={updateUserRolesStatus === "pending"}
        error={updateUserRolesError}
        onConfirm={handleConfirmRoles}
        onCancel={handleCloseRolesModal}
      />
    </Flex>
  );
}

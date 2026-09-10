import { ConfirmModal } from "@/components/ConfirmModal/ConfirmModal";
import { useAppDispatch } from "@/store/hooks";
import { updateUserRolesThunk } from "@/store/users/usersThunks";
import type { Role, User } from "@/types/auth";
import { Flex, Select, Typography } from "antd";
import { useState, type JSX } from "react";

const { Text } = Typography;

const roleOptions: { label: string; value: Role }[] = [
  { label: "User", value: "user" },
  { label: "Manager", value: "manager" },
  { label: "Moderator", value: "moderator" },
  { label: "Admin", value: "admin" },
];

interface ChangeUserRolesActionProps {
  user: User;
  open: boolean;
  onClose: () => void;
}

export function ChangeUserRolesAction({
  user,
  open,
  onClose,
}: ChangeUserRolesActionProps): JSX.Element {
  const dispatch = useAppDispatch();

  const [rolesDraft, setRolesDraft] = useState<Role[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const selectedRoles = rolesDraft ?? user.roles;

  const handleClose = (): void => {
    setRolesDraft(null);
    setError(null);
    onClose();
  };

  const handleConfirm = async (): Promise<void> => {
    if (selectedRoles.length === 0) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await dispatch(
        updateUserRolesThunk({
          id: user.id,
          roles: selectedRoles,
        }),
      ).unwrap();

      setRolesDraft(null);
      onClose();
    } catch (error) {
      if (error) {
        setError(String(error));
      } else {
        setError("Неизвестная ошибка при изменении роли пользователя.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ConfirmModal
      open={open}
      title="Изменение ролей"
      description={`Измените роли пользователя ${user.userName}`}
      confirmText="Сохранить роли"
      confirmDisabled={selectedRoles.length === 0}
      isLoading={isLoading}
      error={error}
      onConfirm={handleConfirm}
      onCancel={handleClose}
    >
      <Flex vertical gap={8}>
        <Text strong>Роли</Text>

        <Select<Role[]>
          mode="multiple"
          value={selectedRoles}
          options={roleOptions}
          onChange={setRolesDraft}
          disabled={isLoading}
          placeholder="Выберите роли"
          style={{ width: "100%" }}
        />
      </Flex>
    </ConfirmModal>
  );
}

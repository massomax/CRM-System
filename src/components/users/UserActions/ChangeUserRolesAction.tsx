import { ConfirmModal } from "@/components/ConfirmModal/ConfirmModal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectUpdateUserRolesError,
  selectUpdateUserRolesStatus,
} from "@/store/users/usersSelectors";
import { updateUserRolesThunk } from "@/store/users/usersSlice";
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

  const updateUserRolesStatus = useAppSelector(selectUpdateUserRolesStatus);

  const updateUserRolesError = useAppSelector(selectUpdateUserRolesError);

  const [rolesDraft, setRolesDraft] = useState<Role[] | null>(null);

  const selectedRoles = rolesDraft ?? user.roles;

  const handleClose = (): void => {
    setRolesDraft(null);
    onClose();
  };

  const handleConfirm = async (): Promise<void> => {
    if (selectedRoles.length === 0) {
      return;
    }

    try {
      await dispatch(
        updateUserRolesThunk({
          id: user.id,
          roles: selectedRoles,
        }),
      ).unwrap();

      setRolesDraft(null);
      onClose();
    } catch {
      // Ошибка уже сохранена в Redux
    }
  };

  return (
    <ConfirmModal
      open={open}
      title="Изменение ролей"
      description={`Измените роли пользователя ${user.userName}`}
      confirmText="Сохранить роли"
      isLoading={updateUserRolesStatus === "pending"}
      error={updateUserRolesError}
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
          placeholder="Выберите роли"
          style={{ width: "100%" }}
        />
      </Flex>
    </ConfirmModal>
  );
}

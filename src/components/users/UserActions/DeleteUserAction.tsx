import { ConfirmModal } from "@/components/ConfirmModal/ConfirmModal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectDeleteUserError,
  selectDeleteUserStatus,
} from "@/store/users/usersSelectors";
import { deleteUserThunk } from "@/store/users/usersSlice";
import type { User } from "@/types/auth";
import type { JSX } from "react";

interface DeleteUserActionProps {
  user: User;
  open: boolean;
  onClose: () => void;
  onDeleted?: () => void;
}

export function DeleteUserAction({
  user,
  open,
  onClose,
  onDeleted,
}: DeleteUserActionProps): JSX.Element {
  const dispatch = useAppDispatch();

  const deleteUserStatus = useAppSelector(selectDeleteUserStatus);
  const deleteUserError = useAppSelector(selectDeleteUserError);

  const handleConfirm = async (): Promise<void> => {
    try {
      await dispatch(deleteUserThunk(user.id)).unwrap();

      onClose();
      onDeleted?.();
    } catch {
      // Ошибка уже сохранена в Redux
    }
  };

  return (
    <ConfirmModal
      open={open}
      title="Удаление пользователя"
      description={`Вы действительно хотите удалить пользователя ${user.userName}?`}
      confirmText="Удалить"
      danger
      isLoading={deleteUserStatus === "pending"}
      error={deleteUserError}
      onConfirm={handleConfirm}
      onCancel={onClose}
    />
  );
}

import { ConfirmModal } from "@/components/ConfirmModal/ConfirmModal";
import { useAppDispatch } from "@/store/hooks";
import { deleteUserThunk } from "@/store/users/usersThunks";
import type { User } from "@/types/users";
import { useState, type JSX } from "react";

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

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      await dispatch(deleteUserThunk(user.id)).unwrap();

      onClose();
      onDeleted?.();
    } catch (error) {
      if (error) {
        setError(String(error));
      } else {
        setError("Неизсвестная ошибка при удалении пользователя.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ConfirmModal
      open={open}
      title="Удаление пользователя"
      description={`Вы действительно хотите удалить пользователя ${user.userName}?`}
      confirmText="Удалить"
      danger
      isLoading={isLoading}
      error={error}
      onConfirm={handleConfirm}
      onCancel={onClose}
    />
  );
}

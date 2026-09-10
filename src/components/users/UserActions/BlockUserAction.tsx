import { ConfirmModal } from "@/components/ConfirmModal/ConfirmModal";
import { useAppDispatch } from "@/store/hooks";
import { setUserBlockStatusThunk } from "@/store/users/usersThunks";
import type { User } from "@/types/users";
import { useState, type JSX } from "react";

type BlockActionType = "block" | "unblock";

interface BlockUserActionProps {
  user: User;
  action: BlockActionType;
  open: boolean;
  onClose: () => void;
}

export function BlockUserAction({
  user,
  action,
  open,
  onClose,
}: BlockUserActionProps): JSX.Element {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const isBlockAction = action === "block";

  const handleConfirm = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      await dispatch(
        setUserBlockStatusThunk({
          id: user.id,
          isBlocked: isBlockAction,
        }),
      ).unwrap();

      onClose();
    } catch (error) {
      if (error) {
        setError(String(error));
      } else {
        setError(
          "Неизвестная ошибка при блокировки или разблокировки пользователя.",
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ConfirmModal
      open={open}
      title={
        isBlockAction ? "Блокировка пользователя" : "Разблокировка пользователя"
      }
      description={
        isBlockAction
          ? `Вы действительно хотите заблокировать пользователя ${user.userName}?`
          : `Вы действительно хотите разблокировать пользователя ${user.userName}?`
      }
      confirmText={isBlockAction ? "Заблокировать" : "Разблокировать"}
      danger={isBlockAction}
      isLoading={isLoading}
      error={error}
      onConfirm={handleConfirm}
      onCancel={onClose}
    />
  );
}

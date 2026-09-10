import { ConfirmModal } from "@/components/ConfirmModal/ConfirmModal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectBlockUserError,
  selectBlockUserStatus,
} from "@/store/users/usersSelectors";
import { setUserBlockStatusThunk } from "@/store/users/usersSlice";
import type { User } from "@/types/auth";
import type { JSX } from "react";

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

  const blockUserStatus = useAppSelector(selectBlockUserStatus);
  const blockUserError = useAppSelector(selectBlockUserError);

  const isBlockAction = action === "block";

  const handleConfirm = async (): Promise<void> => {
    try {
      await dispatch(
        setUserBlockStatusThunk({
          id: user.id,
          isBlocked: isBlockAction,
        }),
      ).unwrap();

      onClose();
    } catch {
      // Ошибка уже сохранена в Redux
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
      isLoading={blockUserStatus === "pending"}
      error={blockUserError}
      onConfirm={handleConfirm}
      onCancel={onClose}
    />
  );
}

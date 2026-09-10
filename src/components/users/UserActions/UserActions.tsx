import { selectCurrentUser } from "@/store/auth/authSelectors";
import { useAppSelector } from "@/store/hooks";
import type { User } from "@/types/auth";
import { MoreOutlined } from "@ant-design/icons";
import { Button, Dropdown, Flex, type MenuProps } from "antd";
import { useState, type JSX } from "react";
import { BlockUserAction } from "./BlockUserAction";
import { ChangeUserRolesAction } from "./ChangeUserRolesAction";
import { DeleteUserAction } from "./DeleteUserAction";

type UserActionsVariant = "profile" | "table";

type UserActionType = "delete" | "block" | "unblock" | "roles" | null;

interface UserActionsProps {
  user: User;
  variant: UserActionsVariant;
  onDeleted?: () => void;
}

export function UserActions({
  user,
  variant,
  onDeleted,
}: UserActionsProps): JSX.Element | null {
  const currentUser = useAppSelector(selectCurrentUser);

  const [activeAction, setActiveAction] = useState<UserActionType>(null);

  const isAdmin = currentUser?.roles.includes("admin") ?? false;

  const isModerator = currentUser?.roles.includes("moderator") ?? false;

  const isCurrentUser = currentUser?.id === user.id;

  const canDelete = isAdmin && !isCurrentUser;

  const canChangeRoles = isAdmin && !isCurrentUser;

  const canBlock =
    !isCurrentUser && !user.isBlocked && (isAdmin || isModerator);

  const canUnblock = !isCurrentUser && user.isBlocked && isAdmin;

  const handleCloseAction = (): void => {
    setActiveAction(null);
  };

  const menuItems: MenuProps["items"] = [];

  if (canChangeRoles) {
    menuItems.push({
      key: "roles",
      label: "Изменить роли",
    });
  }

  if (canBlock) {
    menuItems.push({
      key: "block",
      label: "Заблокировать",
      danger: true,
    });
  }

  if (canUnblock) {
    menuItems.push({
      key: "unblock",
      label: "Разблокировать",
    });
  }

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "roles" || key === "block" || key === "unblock") {
      setActiveAction(key);
    }
  };

  if (!canDelete && !canChangeRoles && !canBlock && !canUnblock) {
    return null;
  }

  return (
    <>
      {variant === "profile" ? (
        <Flex gap={8}>
          {canChangeRoles && (
            <Button onClick={() => setActiveAction("roles")}>
              Изменить роли
            </Button>
          )}

          {canBlock && (
            <Button danger onClick={() => setActiveAction("block")}>
              Заблокировать
            </Button>
          )}

          {canUnblock && (
            <Button onClick={() => setActiveAction("unblock")}>
              Разблокировать
            </Button>
          )}

          {canDelete && (
            <Button danger onClick={() => setActiveAction("delete")}>
              Удалить
            </Button>
          )}
        </Flex>
      ) : (
        <Flex gap={8}>
          {canDelete && (
            <Button danger onClick={() => setActiveAction("delete")}>
              Удалить
            </Button>
          )}

          {menuItems.length > 0 && (
            <Dropdown
              menu={{
                items: menuItems,
                onClick: handleMenuClick,
              }}
              trigger={["click"]}
            >
              <Button icon={<MoreOutlined />} aria-label="Другие действия" />
            </Dropdown>
          )}
        </Flex>
      )}

      {activeAction === "delete" && (
        <DeleteUserAction
          user={user}
          open
          onClose={handleCloseAction}
          onDeleted={onDeleted}
        />
      )}

      {activeAction === "block" && (
        <BlockUserAction
          user={user}
          action="block"
          open
          onClose={handleCloseAction}
        />
      )}

      {activeAction === "unblock" && (
        <BlockUserAction
          user={user}
          action="unblock"
          open
          onClose={handleCloseAction}
        />
      )}

      {activeAction === "roles" && (
        <ChangeUserRolesAction user={user} open onClose={handleCloseAction} />
      )}
    </>
  );
}

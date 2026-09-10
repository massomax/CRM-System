import { logoutUser } from "@/api/userApi";
import { tokenManager } from "@/services/tokenManager";
import { selectCurrentUser } from "@/store/auth/authSelectors";
import { authLoggedOut } from "@/store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import type { Todo } from "@/types/todos";
import {
  ContainerOutlined,
  LogoutOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import type { MenuItemType } from "antd/es/menu/interface";
import { useState, type JSX } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import styles from "./MainLayout.module.css";

const { Content, Sider } = Layout;

type ItemType = MenuItemType;

export function MainLayout(): JSX.Element {
  const [isCollapsed, setIsCollapsed] = useState<Todo["isDone"]>(false);

  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const currentUser = useAppSelector(selectCurrentUser);

  const canViewUsers =
    currentUser?.roles.includes("admin") ||
    currentUser?.roles.includes("moderator");

  const items: ItemType[] = [
    {
      label: <Link to="/todos">Список задач</Link>,
      key: "/todos",
      icon: <ContainerOutlined />,
    },
    {
      label: <Link to="/profile">Профиль</Link>,
      key: "/profile",
      icon: <UserOutlined />,
    },
  ];

  if (canViewUsers) {
    items.push({
      label: <Link to="/users">Пользователи</Link>,
      key: "/users",
      icon: <TeamOutlined />,
    });
  }

  const selectedMenuKey = location.pathname.startsWith("/users")
    ? "/users"
    : location.pathname;

  const handleLogoutUser = async (): Promise<void> => {
    try {
      await logoutUser();
    } catch {
      // Локальный выход должен завершиться, даже если сервер уже недоступен.
    } finally {
      tokenManager.clearTokens();
      dispatch(authLoggedOut());
      navigate("/signin", { replace: true });
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={isCollapsed}
        onCollapse={(value) => setIsCollapsed(value)}
      >
        <div className={styles.siderContent}>
          <Menu
            theme="dark"
            mode="inline"
            items={items}
            selectedKeys={[selectedMenuKey]}
          />

          <div className={styles.siderFooter}>
            <Button
              block
              danger
              type="text"
              icon={<LogoutOutlined />}
              onClick={() => handleLogoutUser()}
            >
              {!isCollapsed && "Выйти из профиля"}
            </Button>
          </div>
        </div>
      </Sider>

      <Layout>
        <Content style={{ margin: "0 16px" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

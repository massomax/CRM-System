import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { useState, type JSX } from "react";
import styles from "./MainLayout.module.css";

import {
  ContainerOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import type { MenuItemType } from "antd/es/menu/interface";
import type { Todo } from "@/types/todos";
import { logoutUser } from "@/api/userApi";
import { clearTokens } from "@/utils/tokenStorage";
import { useAppDispatch } from "@/store/hooks";
import { authLoggedOut } from "@/store/auth/authSlice";
const { Content, Sider } = Layout;

type ItemType = MenuItemType;

const items: ItemType[] = [
  {
    label: <Link to="/todos">Список задач</Link>,
    key: "/todos",
    icon: <ContainerOutlined />,
  },
  {
    label: <Link to="/todos/profile">Профиль</Link>,
    key: "/todos/profile",
    icon: <UserOutlined />,
  },
];

export function MainLayout(): JSX.Element {
  const [isCollapsed, setIsCollapsed] = useState<Todo["isDone"]>(false);
  const location = useLocation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogoutUser = async (): Promise<void> => {
    try {
      await logoutUser();
    } catch (error) {
      console.log("Не удлось выйти из профиля", error);
    } finally {
      clearTokens();
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
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
            selectedKeys={[location.pathname]}
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

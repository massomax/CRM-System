import { Link, Outlet, useLocation } from "react-router";
import { useState, type JSX } from "react";

import { ContainerOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import type { MenuItemType } from "antd/es/menu/interface";
import type { Todo } from "@/types/todos";
const { Content, Sider } = Layout;

type ItemType = MenuItemType;

const items: ItemType[] = [
  {
    label: <Link to="/">Список задач</Link>,
    key: "/",
    icon: <ContainerOutlined />,
  },
  {
    label: <Link to="/profile">Профиль</Link>,
    key: "/profile",
    icon: <UserOutlined />,
  },
];

export function MainLayout(): JSX.Element {
  const [isCollapsed, setIsCollapsed] = useState<Todo["isDone"]>(false);
  const location = useLocation();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={isCollapsed}
        onCollapse={(value) => setIsCollapsed(value)}
      >
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          selectedKeys={[location.pathname]}
        />
      </Sider>
      <Layout>
        <Content style={{ margin: "0 16px" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

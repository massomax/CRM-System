import { Flex } from "antd";
import { Content } from "antd/es/layout/layout";
import styles from "./UserProfilePage.module.css";

export function UserProfile() {
  return (
    <Content
      style={{
        padding: "32px 16px",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Flex
        vertical
        align="center"
        gap={14}
        style={{ width: "100%", maxWidth: 640 }}
      >
        <h1 className={styles.title}>Профиль</h1>
        <p>Привет!</p>
      </Flex>
    </Content>
  );
}

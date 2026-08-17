import { getProfile } from "@/api/userApi";
import type { Profile } from "@/types/auth";
import {
  Alert,
  Card,
  Descriptions,
  Flex,
  Layout,
  Spin,
  Typography,
  type DescriptionsProps,
} from "antd";
import { useEffect, useState, type JSX } from "react";

import styles from "./UserProfilePage.module.css";

const { Content } = Layout;
const { Text, Title } = Typography;

export function UserProfilePage(): JSX.Element {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUserProfile = async (): Promise<void> => {
      try {
        setError(null);

        const profileData = await getProfile();

        setProfile(profileData);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Не удалось получить данные профиля");
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadUserProfile();
  }, []);

  const profileItems: DescriptionsProps["items"] = profile
    ? [
        {
          key: "username",
          label: "Имя пользователя",
          children: profile.username,
        },
        {
          key: "email",
          label: "Электронная почта",
          children: profile.email,
        },
        {
          key: "phoneNumber",
          label: "Номер телефона",
          children: profile.phoneNumber || (
            <Text type="secondary">Не указан</Text>
          ),
        },
      ]
    : [];

  return (
    <Content
      style={{
        minHeight: "100%",
        padding: "32px 16px",
      }}
    >
      <Flex
        vertical
        gap={24}
        style={{
          width: "100%",
          maxWidth: 720,
          margin: "0 auto",
        }}
      >
        <Title level={1} className={styles.title}>
          Личный кабинет
        </Title>

        {isLoading && (
          <Card>
            <Flex
              vertical
              align="center"
              justify="center"
              gap={16}
              style={{ minHeight: 200 }}
            >
              <Spin size="large" />
              <Text type="secondary">Загружаем данные профиля...</Text>
            </Flex>
          </Card>
        )}

        {!isLoading && error && (
          <Alert
            type="error"
            title="Не удалось загрузить профиль"
            description={error}
            showIcon
          />
        )}

        {!isLoading && !error && profile && (
          <Card title="Данные пользователя">
            <Descriptions bordered column={1} items={profileItems} />
          </Card>
        )}

        {!isLoading && !error && !profile && (
          <Alert type="warning" title="Данные профиля не найдены" showIcon />
        )}
      </Flex>
    </Content>
  );
}

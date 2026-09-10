import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectSelectedUser,
  selectSelectedUserError,
  selectSelectedUserStatus,
  selectUpdateUserError,
  selectUpdateUserStatus,
} from "@/store/users/usersSelectors";
import { getUserByIdThunk, updateUserThunk } from "@/store/users/usersSlice";
import type { UserUpdateRequest } from "@/types/auth";
import { LeftOutlined, UserOutlined } from "@ant-design/icons";
import {
  Alert,
  Avatar,
  Button,
  Flex,
  Form,
  Input,
  Spin,
  Typography,
} from "antd";
import { useEffect, useState, type JSX } from "react";
import { useNavigate, useParams } from "react-router";

const { Title, Text } = Typography;

type EditUserFormValues = {
  userName: string;
  email: string;
  phoneNumber: string;
};

export function UserDetailsPage(): JSX.Element {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [form] = Form.useForm<EditUserFormValues>();

  const selectedUser = useAppSelector(selectSelectedUser);
  const selectedUserStatus = useAppSelector(selectSelectedUserStatus);
  const selectedUserError = useAppSelector(selectSelectedUserError);

  const updateUserStatus = useAppSelector(selectUpdateUserStatus);
  const updateUserError = useAppSelector(selectUpdateUserError);

  const userId = Number(id);

  const handleSave = async (values: EditUserFormValues): Promise<void> => {
    if (!selectedUser) {
      return;
    }

    const newUserData: UserUpdateRequest = {
      userName: values.userName,
      email: values.email,
      phoneNumber: values.phoneNumber,
      birthday: selectedUser.birthday,
    };

    try {
      await dispatch(
        updateUserThunk({
          id: selectedUser.id,
          data: newUserData,
        }),
      ).unwrap();

      setIsEditing(false);
    } catch {
      // Ошибка уже сохранена в usersSlice через updateUserThunk.rejected
    }
  };

  useEffect(() => {
    if (!id || Number.isNaN(userId)) {
      return;
    }

    dispatch(getUserByIdThunk(userId));
  }, [id, userId, dispatch]);

  if (!id || Number.isNaN(userId)) {
    return <Alert type="error" title="Некорректный id пользователя" showIcon />;
  }

  if (selectedUserStatus === "idle" || selectedUserStatus === "pending") {
    return (
      <Flex justify="center" align="center" style={{ minHeight: 300 }}>
        <Spin size="large" />
      </Flex>
    );
  }

  if (selectedUserStatus === "rejected") {
    return (
      <Alert
        type="error"
        title="Не удалось загрузить пользователя"
        description={selectedUserError}
        showIcon
      />
    );
  }

  if (!selectedUser) {
    return <Alert type="warning" title="Пользователь не найден" showIcon />;
  }

  return (
    <Flex
      vertical
      gap={32}
      style={{
        width: "100%",
        padding: 32,
        background: "#ffffff",
        borderRadius: 8,
      }}
    >
      <Flex justify="space-between" align="center">
        <Flex align="center" gap={16}>
          <Button icon={<LeftOutlined />} onClick={() => navigate("/users")}>
            Назад
          </Button>

          <Title level={2} style={{ margin: 0 }}>
            Профиль пользователя
          </Title>
        </Flex>

        {!isEditing && (
          <Button type="primary" onClick={() => setIsEditing(true)}>
            Редактировать
          </Button>
        )}
      </Flex>

      <Flex align="center" gap={32}>
        <Avatar size={120} icon={<UserOutlined />} />

        {isEditing ? (
          <Form<EditUserFormValues>
            form={form}
            layout="vertical"
            initialValues={{
              userName: selectedUser.userName,
              email: selectedUser.email,
              phoneNumber: selectedUser.phoneNumber,
            }}
            onFinish={handleSave}
            disabled={updateUserStatus === "pending"}
            style={{ width: 400 }}
          >
            {updateUserError && (
              <Alert
                type="error"
                title="Не удалось сохранить изменения"
                description={updateUserError}
                showIcon
                style={{ marginBottom: 16 }}
              />
            )}

            <Form.Item label="Имя" name="userName">
              <Input />
            </Form.Item>

            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>

            <Form.Item label="Номер телефона" name="phoneNumber">
              <Input />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              loading={updateUserStatus === "pending"}
            >
              Сохранить
            </Button>
          </Form>
        ) : (
          <Flex vertical gap={8}>
            <Title level={3} style={{ margin: 0 }}>
              {selectedUser.userName}
            </Title>

            <Text>{selectedUser.email}</Text>
            <Text>{selectedUser.phoneNumber}</Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}

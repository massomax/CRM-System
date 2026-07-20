import { signIn } from "@/api/authApi";
import { authLoggedIn } from "@/store/auth/authSlice";
import { useAppDispatch } from "@/store/hooks";
import type { AuthData } from "@/types/auth";
import { saveTokens } from "@/utils/tokenStorage";
import { loginRules, passwordRules } from "@/utils/userValidationRules";
import { Alert, Button, Checkbox, Form, Input, Typography } from "antd";
import { useState, type JSX } from "react";
import { Link, useNavigate } from "react-router";

const { Title, Text } = Typography;

type SignInFormValues = {
  login: string;
  password: string;
  isRememberMe: boolean;
};

export function SignInPage(): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleFinish = async (values: SignInFormValues): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      const payload: AuthData = {
        login: values.login.trim(),
        password: values.password,
      };

      const tokens = await signIn(payload);

      saveTokens(tokens, values.isRememberMe);

      dispatch(authLoggedIn());

      navigate("/todos", {
        replace: true,
      });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Не удалось войти в аккаунт");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div>
        <Title level={1}>Войти в аккаунт</Title>
        <Text type="secondary">
          Введите логин и пароль, чтобы продолжить работу.
        </Text>
      </div>

      <Form<SignInFormValues>
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{ isRememberMe: false }}
      >
        <Form.Item<SignInFormValues>
          label="Логин"
          name="login"
          rules={loginRules}
        >
          <Input placeholder="Введите логин" />
        </Form.Item>

        <Form.Item<SignInFormValues>
          label="Пароль"
          name="password"
          rules={passwordRules}
        >
          <Input.Password placeholder="Введите пароль" />
        </Form.Item>

        <Form.Item<SignInFormValues>
          valuePropName="checked"
          name="isRememberMe"
        >
          <Checkbox>Запомнить меня</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading} block>
            Войти
          </Button>
        </Form.Item>
      </Form>
      {error && <Alert type="error" title={error} showIcon />}

      <Text type="secondary">
        Нет аккаунта? <Link to="/signup">Зарегистрироваться</Link>
      </Text>
    </>
  );
}

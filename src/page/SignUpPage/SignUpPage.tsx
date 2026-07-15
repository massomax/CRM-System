import { signUp } from "@/api/authApi";
import { InputPhone } from "@/components/auth/InputPhone/InputPhone";
import type { UserRegistration } from "@/types/auth";
import {
  emailRules,
  loginRules,
  passwordRules,
  phoneRules,
  usernameRules,
} from "@/utils/userValidationRules";
import { Alert, Button, Form, Input } from "antd";
import { useState, type JSX } from "react";
import { useNavigate } from "react-router";

type SignUpFormValues = {
  username: string;
  login: string;
  password: string;
  confirmPassword: string;
  email: string;
  phoneNumber?: string;
};

export function SignUpPage(): JSX.Element {
  const [form] = Form.useForm<SignUpFormValues>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleFinish = async (values: SignUpFormValues): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      const phoneNumber = values.phoneNumber?.trim();

      const payload: UserRegistration = {
        username: values.username.trim(),
        login: values.login.trim(),
        password: values.password,
        email: values.email.trim(),
        ...(phoneNumber && { phoneNumber }),
      };
      console.log(payload);
      await signUp(payload);

      form.resetFields();

      navigate("/signin", {
        replace: true,
        state: {
          registrationSuccess: true,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        return;
      } else {
        setError("Не удалось зарегистрировать аккаунт");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div>
        <h1>Зарегистрировать аккаунт</h1>
        <p>Заполните форму регистрации, чтобы получить аккаунт.</p>
      </div>
      {error && <Alert type="error" title={error} showIcon />}
      <Form<SignUpFormValues>
        onFinish={handleFinish}
        form={form}
        layout={"vertical"}
      >
        <Form.Item<SignUpFormValues>
          label="Имя пользователя"
          name="username"
          rules={usernameRules}
        >
          <Input placeholder="Введите имя пользователя" />
        </Form.Item>

        <Form.Item<SignUpFormValues>
          label="Логин"
          name="login"
          rules={loginRules}
        >
          <Input placeholder="Придумайте уникальный логин" />
        </Form.Item>

        <Form.Item<SignUpFormValues>
          label="Пароль"
          name="password"
          rules={passwordRules}
        >
          <Input.Password placeholder="Придумайте пароль" />
        </Form.Item>

        <Form.Item<SignUpFormValues>
          label="Повторите пароль"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Повторите пароль",
            },
            ({ getFieldValue }) => ({
              validator(_, value: string | undefined) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error("Пароли не совпадают"));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Повторите пароль" />
        </Form.Item>

        <Form.Item<SignUpFormValues>
          label="Почтовый адрес"
          name="email"
          rules={emailRules}
        >
          <Input type={"email"} placeholder="Введите адрес электронной почты" />
        </Form.Item>

        <Form.Item<SignUpFormValues>
          name="phoneNumber"
          label="Телефон"
          rules={phoneRules}
        >
          <InputPhone />
        </Form.Item>
        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" loading={isLoading} block>
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

import type { UserRegistration } from "@/types/auth";
import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import type { JSX } from "react/jsx-runtime";

// type SignUpFormValue = {

// }

export function SignUpPage(): JSX.Element {
  const [form] = useForm();

  const handleFinish = () => {};
  return (
    <>
      <div>
        <h1>Зарегистрировать аккаунт</h1>
        <p>Заполните форму регистрации что бы получить аккаунт.</p>
      </div>
      <Form<UserRegistration>
        onFinish={handleFinish}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        form={form}
        layout={"horizontal"}
      >
        <Form.Item
          label="Имя пользователя"
          name="username"
          style={{
            display: "block",
            width: "100%",
          }}
        >
          <Input placeholder="Введите текст задачи" />
        </Form.Item>
        <Form.Item
          label="Логин"
          name="login"
          style={{
            width: "100%",
          }}
        >
          <Input placeholder="Введите текст задачи" />
        </Form.Item>
        <Form.Item
          label="Пароль"
          name="password"
          style={{
            width: "100%",
          }}
        >
          <Input.Password placeholder="Введите текст задачи" />
        </Form.Item>
        <Form.Item
          label="Повторите пароль"
          name="confirmPassword"
          style={{
            width: "100%",
          }}
        >
          <Input.Password placeholder="Введите текст задачи" />
        </Form.Item>
        <Form.Item
          label="Почтовый адрес"
          name="email"
          style={{
            width: "100%",
          }}
        >
          <Input type={"email"} placeholder="Введите текст задачи" />
        </Form.Item>
        <Form.Item
          label="Телефон"
          name="phone"
          style={{
            width: "100%",
          }}
        >
          <Input type={"tel"} placeholder="Введите текст задачи" />
        </Form.Item>
        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

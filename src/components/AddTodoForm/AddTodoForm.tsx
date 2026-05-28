import { type JSX } from "react";
import { Button, Form, Input, Alert, Space } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useActionData, useNavigation, useRevalidator } from "react-router";
import { createTodo } from "@/api/todosApi";
import type { Todo } from "@/types/todos";

type AddTodoFormValue = {
  title: string;
};
interface AddTodoFormProps {
  setIsLoading: (isLoading: boolean) => void;
}
export function AddTodoForm({ setIsLoading }: AddTodoFormProps): JSX.Element {
  const [form] = Form.useForm<AddTodoFormValue>();
  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";
  const actionData = useActionData();
  const revalidator = useRevalidator();

  const handleAddTodo = async (value: AddTodoFormValue): Promise<Todo> => {
    try {
      setIsLoading(true);
      const result = await createTodo({ title: value.title });
      form.resetFields();
      revalidator.revalidate();
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Неизвестная ошибка");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Form<AddTodoFormValue>
        onFinish={handleAddTodo}
        form={form}
        layout="vertical"
        style={{
          width: "100%",
          maxWidth: 640,
        }}
      >
        <Space.Compact block>
          <Form.Item
            name="title"
            style={{
              width: "100%",
            }}
            rules={[
              {
                required: true,
                message: "Это поле не может быть пустым",
              },
              {
                min: 2,
                message: "Минимальная длина текста 2 символа",
              },
              {
                max: 64,
                message: "Максимальная длина текста 64 символа",
              },
            ]}
          >
            <Input placeholder="Введите текст задачи" />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<PlusCircleOutlined />}
            disabled={isLoading}
          />
        </Space.Compact>
      </Form>
      {actionData?.error && <Alert type="error" title={actionData?.error} />}
    </>
  );
}

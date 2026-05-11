import { useState, type JSX } from "react";
import { createTodo } from "@/api/todosApi";
import {
  Button as AntButton,
  Form,
  Input as AntInput,
  Alert,
  Space,
} from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

interface AddTodoFormProps {
  setLoading: (loading: boolean) => void;
  loadTodos: () => Promise<void>;
}
type AddTodoFormValue = {
  title: string;
};

export function AddTodoForm({
  setLoading,
  loadTodos,
}: AddTodoFormProps): JSX.Element {
  const [error, setError] = useState<string | null>(null);
  const [form] = Form.useForm<AddTodoFormValue>();
  const handleAddTodo = async (value: AddTodoFormValue) => {
    try {
      const clearTitle = value.title.trim();
      setLoading(true);
      setError(null);

      await createTodo({ title: clearTitle });

      form.resetFields();

      await loadTodos();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Неизвествная ошибка");
      }
    } finally {
      setLoading(false);
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
            <AntInput placeholder="Введите текст задачи" />
          </Form.Item>
          <AntButton
            type="primary"
            htmlType="submit"
            icon={<PlusCircleOutlined />}
          />
        </Space.Compact>
      </Form>
      {error && <Alert type="error" title={error} />}
    </>
  );
}

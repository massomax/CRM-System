import { type JSX } from "react";
import { Alert, Button, Form, Input, Space } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { createTodo } from "@/api/todosApi";
import { todoTitleRules } from "@/utils/todoValidationRules";

type AddTodoFormValue = {
  title: string;
};
interface AddTodoFormProps {
  isLoading: boolean;
  error: string | null;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  loadTodos: () => Promise<void>;
}
export function AddTodoForm({
  isLoading,
  error,
  setIsLoading,
  setError,
  loadTodos,
}: AddTodoFormProps): JSX.Element {
  const [form] = Form.useForm<AddTodoFormValue>();

  const handleAddTodo = async (value: AddTodoFormValue): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      await createTodo({ title: value.title.trim() });
      form.resetFields();
      await loadTodos();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Неизвестная ошибка");
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
            rules={todoTitleRules}
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
      {error && <Alert type="error" title={error} />}
    </>
  );
}

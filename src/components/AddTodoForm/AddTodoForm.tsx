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
}
export function AddTodoForm({
  isLoading,
  error,
}: AddTodoFormProps): JSX.Element {
  const [form] = Form.useForm<AddTodoFormValue>();

  const handleAddTodo = async (value: AddTodoFormValue): Promise<void> => {
    await createTodo({ title: value.title.trim() });
    form.resetFields();
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

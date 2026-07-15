import { useState, type JSX } from "react";
import { Alert, Button, Form, Input, Space } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { todoTitleRules } from "@/utils/todoValidationRules";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectFilterTodos } from "@/store/todos/todosSelectors";
import { createTodoThunk, loadTodosThunk } from "@/store/todos/todosSlice";

type AddTodoFormValue = {
  title: string;
};

export function AddTodoForm(): JSX.Element {
  const [form] = Form.useForm<AddTodoFormValue>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const filter = useAppSelector(selectFilterTodos);

  const dispatch = useAppDispatch();

  const handleAddTodo = async (value: AddTodoFormValue): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      await dispatch(createTodoThunk({ title: value.title.trim() })).unwrap();
      form.resetFields();
      await dispatch(loadTodosThunk(filter)).unwrap();
    } catch (error) {
      if (typeof error === "string") {
        setError(error);
        return;
      }
      if (error instanceof Error) {
        setError(error.message);
        return;
      }
      setError("Не известная ошибка");
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

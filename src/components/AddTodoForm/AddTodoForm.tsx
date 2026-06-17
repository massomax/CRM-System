import { type JSX } from "react";
import { Alert, Button, Form, Input, Space } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { todoTitleRules } from "@/utils/todoValidationRules";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectFilterTodos,
  selectTodosError,
  selectTodosStatus,
} from "@/store/todos/selectors";
import { createTodoThunk, loadTodosThunk } from "@/store/todos/todosSlice";

type AddTodoFormValue = {
  title: string;
};

export function AddTodoForm(): JSX.Element {
  const [form] = Form.useForm<AddTodoFormValue>();
  const error = useAppSelector(selectTodosError);
  const status = useAppSelector(selectTodosStatus);
  const isLoading = status === "pending";
  const filter = useAppSelector(selectFilterTodos);

  const dispatch = useAppDispatch();

  const handleAddTodo = async (value: AddTodoFormValue): Promise<void> => {
    const title = value.title.trim();
    if (!title) {
      return;
    }
    try {
      await dispatch(createTodoThunk({ title: value.title.trim() })).unwrap();
      form.resetFields();
      await dispatch(loadTodosThunk(filter)).unwrap();
    } catch {
      // Оштбка обработана в Redux
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

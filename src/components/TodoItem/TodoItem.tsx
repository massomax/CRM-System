import { useState, type JSX } from "react";
import styles from "./TodoItem.module.css";
import type { Todo } from "@/types/todos";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Space,
  type CheckboxChangeEvent,
} from "antd";
import {
  CloseOutlined,
  DeleteOutlined,
  FileAddOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { deleteTodo, updateTodo } from "@/api/todosApi";
import { todoTitleRules } from "@/utils/todoValidationRules";

interface TodoItemProps {
  todo: Todo;
  loadTodos: () => Promise<void>;
}

export function TodoItem({ todo, loadTodos }: TodoItemProps): JSX.Element {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [form] = Form.useForm<{ newTitle: string }>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDeleteTodo = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      await deleteTodo(todo.id);
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

  const handleSaveTitle = async (newTitle: string): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      await updateTodo(todo.id, { title: newTitle.trim() });

      await loadTodos();

      form.resetFields();
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
  const handleToggleIsDone = async (
    event: CheckboxChangeEvent,
  ): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      await updateTodo(todo.id, { isDone: event.target.checked });
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

  const onFinish = async (values: { newTitle: string }): Promise<void> => {
    await handleSaveTitle(values.newTitle);
  };

  const handleCancelEdit = () => {
    setIsEdit(false);
    form.resetFields();
    setError(null);
  };

  const handleStartEdit = () => {
    form.setFieldsValue({ newTitle: todo.title });
    setIsEdit(true);
    setError(null);
  };

  return isEdit ? (
    <li className={styles.item}>
      <Form<{ newTitle: string }>
        onFinish={onFinish}
        form={form}
        initialValues={{ newTitle: todo.title }}
        style={{
          width: "100%",
          maxWidth: 640,
          padding: 0,
        }}
        layout="vertical"
      >
        <Space.Compact block>
          <Form.Item
            name="newTitle"
            rules={todoTitleRules}
            style={{
              width: "100%",
            }}
          >
            <Input type="text" />
          </Form.Item>

          <Button
            htmlType="button"
            icon={<CloseOutlined />}
            onClick={handleCancelEdit}
            style={{
              marginInline: 4,
            }}
            disabled={isLoading}
            danger
          />
          <Button
            htmlType="submit"
            icon={<FileAddOutlined />}
            disabled={isLoading}
            style={{
              marginInline: 4,
            }}
          />
        </Space.Compact>
      </Form>
      {error && <p className={styles.error}>{error}</p>}
    </li>
  ) : (
    <li className={styles.item}>
      <Checkbox checked={todo.isDone} onChange={handleToggleIsDone} />
      <span className={styles.title}>{todo.title}</span>
      <Button
        htmlType="button"
        icon={<DeleteOutlined />}
        onClick={handleDeleteTodo}
        disabled={isLoading}
        danger
      />
      <Button
        htmlType="button"
        icon={<FormOutlined />}
        onClick={handleStartEdit}
        disabled={isLoading}
      />

      {error && <p className={styles.error}>{error}</p>}
    </li>
  );
}

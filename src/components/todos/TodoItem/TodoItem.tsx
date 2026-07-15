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
import { todoTitleRules } from "@/utils/todoValidationRules";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  deleteTodoThunk,
  loadTodosThunk,
  updateTodoThunk,
} from "@/store/todos/todosSlice";
import { selectFilterTodos } from "@/store/todos/todosSelectors";

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps): JSX.Element {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [form] = Form.useForm<{ newTitle: string }>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const currentFilterTodos = useAppSelector(selectFilterTodos);

  const handleDeleteTodo = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      await dispatch(deleteTodoThunk(todo.id)).unwrap();
      dispatch(loadTodosThunk(currentFilterTodos));
    } catch (error) {
      if (typeof error === "string") {
        setError(error);
        return;
      }
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

      await dispatch(
        updateTodoThunk({ id: todo.id, data: { title: newTitle.trim() } }),
      ).unwrap();
      form.resetFields();
      setIsEdit(false);

      dispatch(loadTodosThunk(currentFilterTodos));
    } catch (error) {
      if (typeof error === "string") {
        setError(error);
        return;
      }
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
      await dispatch(
        updateTodoThunk({
          id: todo.id,
          data: { isDone: event.target.checked },
        }),
      ).unwrap();
      dispatch(loadTodosThunk(currentFilterTodos));
    } catch (error) {
      if (typeof error === "string") {
        setError(error);
        return;
      }
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

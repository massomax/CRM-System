import { useState, type JSX } from "react";
import styles from "./TodoItem.module.css";
import type { Todo, TodoRequest } from "@/types/todos";
import { Button, Checkbox, Form, Input } from "antd";
import {
  CloseOutlined,
  DeleteOutlined,
  FileAddOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { useActionData, useNavigation, useRevalidator } from "react-router";
import { useForm } from "antd/es/form/Form";
import { deleteTodo, updateTodo } from "@/api/todosApi";

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps): JSX.Element {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [form] = useForm();
  const navigation = useNavigation();
  const actionData = useActionData();
  const isLoading = navigation.state === "submitting";
  const revalidator = useRevalidator();

  const handleDeleteTodo = async (id: Todo["id"]) => {
    try {
      await deleteTodo(id);
      form.resetFields();
      revalidator.revalidate();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Неизвестная ошибка");
      }
    }
  };

  const handleSaveTitle = async (
    id: Todo["id"],
    newTitle: TodoRequest["title"],
  ): Promise<Todo> => {
    try {
      const result = await updateTodo(id, { title: newTitle });
      form.resetFields();
      revalidator.revalidate();
      setIsEdit(false);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Неизвестная ошибка");
      }
    }
  };
  const handleToggleIsDone = async (
    id: Todo["id"],
    isDone: boolean,
  ): Promise<Todo> => {
    try {
      const result = await updateTodo(id, { isDone });
      form.resetFields();
      revalidator.revalidate();
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Неизвестная ошибка");
      }
    }
  };

  const onFinish = async (values: { newTitle: string }) => {
    await handleSaveTitle(todo.id, values.newTitle);
  };

  const handleCancelEdit = () => {
    setIsEdit(false);
    form.resetFields();
  };

  const handleStartEdit = () => {
    form.resetFields();
    setIsEdit(true);
  };

  return isEdit ? (
    <div>
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
        >
          <Form.Item
            name="newTitle"
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
            <Input type="text" />
          </Form.Item>
        </Form>
        <Button icon={<CloseOutlined />} onClick={handleCancelEdit} danger />
        <Button
          htmlType="submit"
          icon={<FileAddOutlined />}
          onClick={() => form.submit()}
          disabled={isLoading}
        />
      </li>
      {actionData?.error && <p className={styles.error}>{actionData?.error}</p>}
    </div>
  ) : (
    <li className={styles.item}>
      <Checkbox
        checked={todo.isDone}
        onChange={(e) => handleToggleIsDone(todo.id, e.target.checked)}
      />
      <span className={styles.title}>{todo.title}</span>
      <Button
        icon={<DeleteOutlined />}
        onClick={() => handleDeleteTodo(todo.id)}
        danger
      />
      <Button
        icon={<FormOutlined />}
        onClick={handleStartEdit}
        disabled={isLoading}
      />
    </li>
  );
}

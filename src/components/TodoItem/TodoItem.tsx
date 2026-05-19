import { useState, type JSX } from "react";
import styles from "./TodoItem.module.css";
import type { Todo } from "@/types/todos";
import { Button as AntButton, Checkbox, Form, Input } from "antd";
import {
  CloseOutlined,
  DeleteOutlined,
  FileAddOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { useActionData, useNavigation, useSubmit } from "react-router";
import { useForm } from "antd/es/form/Form";

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps): JSX.Element {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [form] = useForm();
  const navigation = useNavigation();
  const actionData = useActionData();
  const isLoading = navigation.state === "submitting";
  const submit = useSubmit();

  const handleDeleteTodos = async (id: Todo["id"]) => {
    submit(
      { id, intent: "delete" },
      {
        method: "post",
      },
    );
  };

  const handleSaveTitles = async (id: Todo["id"], newTitle: string) => {
    submit(
      {
        id,
        title: newTitle || "",
        intent: "update",
      },
      { method: "post" },
    );
    form.resetFields();
  };

  const handleToggleIsDones = async (id: Todo["id"], isDone: boolean) => {
    submit(
      {
        id,
        completed: isDone,
        intent: "update",
      },
      { method: "post" },
    );
  };

  const onFinish = (values: { newTitle: string }) => {
    handleSaveTitles(todo.id, values.newTitle);
    setIsEdit(false);
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
        <Form
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
        <AntButton icon={<CloseOutlined />} onClick={handleCancelEdit} danger />
        <AntButton
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
        onChange={(e) => handleToggleIsDones(todo.id, e.target.checked)}
      />
      <span className={styles.title}>{todo.title}</span>
      <AntButton
        icon={<DeleteOutlined />}
        onClick={() => handleDeleteTodos(todo.id)}
        danger
      />
      <AntButton
        icon={<FormOutlined />}
        onClick={handleStartEdit}
        disabled={isLoading}
      />
    </li>
  );
}

import { type JSX } from "react";
import {
  Button as AntButton,
  Form,
  Input as AntInput,
  Alert,
  Space,
} from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useActionData, useNavigation, useSubmit } from "react-router";

type AddTodoFormValue = {
  title: string;
};

export function AddTodoForm(): JSX.Element {
  const [form] = Form.useForm<AddTodoFormValue>();
  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";
  const actionData = useActionData();
  const submit = useSubmit();

  const handleAddTodos = async (value: AddTodoFormValue) => {
    const result = submit({ ...value, intent: "create" }, { method: "post" });
    form.resetFields();
    return result;
  };
  return (
    <>
      <Form<AddTodoFormValue>
        onFinish={handleAddTodos}
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
            disabled={isLoading}
          />
        </Space.Compact>
      </Form>
      {actionData?.error && <Alert type="error" title={actionData?.error} />}
    </>
  );
}

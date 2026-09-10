import { Alert, Modal, Typography } from "antd";
import type { JSX, ReactNode } from "react";

const { Paragraph } = Typography;

interface ConfirmModalProps {
  open: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  danger?: boolean;
  error?: string | null;
  children?: ReactNode;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
}

export function ConfirmModal({
  open,
  title,
  description,
  confirmText = "Подтвердить",
  cancelText = "Отмена",
  isLoading = false,
  danger = false,
  error = null,
  children,
  onConfirm,
  onCancel,
}: ConfirmModalProps): JSX.Element {
  return (
    <Modal
      open={open}
      title={title}
      okText={confirmText}
      cancelText={cancelText}
      confirmLoading={isLoading}
      okButtonProps={{
        danger,
      }}
      onOk={onConfirm}
      onCancel={onCancel}
    >
      <Paragraph
        style={{
          marginBottom: children || error ? 16 : 0,
        }}
      >
        {description}
      </Paragraph>

      {children}

      {error && (
        <Alert
          type="error"
          title="Не удалось выполнить действие"
          description={error}
          showIcon
          style={{ marginTop: children ? 16 : 0 }}
        />
      )}
    </Modal>
  );
}

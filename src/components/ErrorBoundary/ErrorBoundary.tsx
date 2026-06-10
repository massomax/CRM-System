import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router";
import { Button, Result } from "antd";
import type { JSX } from "react";

export function ErrorBoundary(): JSX.Element {
  const error = useRouteError();
  const navigate = useNavigate();

  if (isRouteErrorResponse(error)) {
    return (
      <Result
        status={error.status === 404 ? "404" : "500"}
        title={error.status}
        subTitle={error.data?.message || error.statusText}
        extra={
          <Button type="primary" onClick={() => navigate("/")}>
            Вернуться на главную
          </Button>
        }
      />
    );
  }

  return (
    <Result
      status="error"
      title="Произошла ошибка"
      subTitle={error instanceof Error ? error.message : "Неизвестная ошибка"}
      extra={
        <Button type="primary" onClick={() => window.location.reload()}>
          Обновить страницу
        </Button>
      }
    />
  );
}

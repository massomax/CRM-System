import { Input, Space } from "antd";
import type { ChangeEvent, JSX } from "react";

type InputPhoneProps = {
  value?: string;
  onChange?: (value: string) => void;
};

const COUNTRY_CODE = "+7";
const PHONE_LENGTH = 10;

export function InputPhone({
  value = "",
  onChange,
}: InputPhoneProps): JSX.Element {
  const phoneWithoutCode = value.replace(COUNTRY_CODE, "");
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const digits = event.target.value.replace(/\D/g, "").slice(0, PHONE_LENGTH);

    const fullPhone = digits ? `${COUNTRY_CODE}${digits}` : "";

    onChange?.(fullPhone);
  };

  return (
    <Space.Compact block>
      <Input value={COUNTRY_CODE} readOnly style={{ width: 60 }} />

      <Input
        value={phoneWithoutCode}
        onChange={handleChange}
        placeholder="9998887755"
        inputMode="numeric"
      />
    </Space.Compact>
  );
}

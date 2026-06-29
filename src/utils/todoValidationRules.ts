import type { Rule } from "antd/es/form";

export const TODO_TITLE_MIN_LENGTH = 2;
export const TODO_TITLE_MAX_LENGTH = 64;

export const todoTitleRules: Rule[] = [
  {
    required: true,
    whitespace: true,
    message: "Это поле не может быть пустым",
  },
  {
    min: TODO_TITLE_MIN_LENGTH,
    message: `Минимальная длина текста ${TODO_TITLE_MIN_LENGTH} символа`,
  },
  {
    max: TODO_TITLE_MAX_LENGTH,
    message: `Максимальная длина текста ${TODO_TITLE_MAX_LENGTH} символа`,
  },
];

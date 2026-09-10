import type { Rule } from "antd/es/form";

const USERNAME_MIN_LENGTH = 1;
const USERNAME_MAX_LENGTH = 60;

const LOGIN_MIN_LENGTH = 2;
const LOGIN_MAX_LENGTH = 60;

const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_MAX_LENGTH = 60;

const USERNAME_ALPHABET_REGEXP = /^[A-Za-zА-Яа-яЁё]+$/u;
const LOGIN_LATIN_REGEXP = /^[A-Za-z-]+$/;

const PHONE_REGEXP = /^\+7\d{10}$/;

export const usernameRules: Rule[] = [
  {
    required: true,
    message: "Введите имя пользователя",
  },
  {
    min: USERNAME_MIN_LENGTH,
    message: `Имя пользователя должно быть не короче ${USERNAME_MIN_LENGTH} символа`,
  },
  {
    max: USERNAME_MAX_LENGTH,
    message: `Имя пользователя должно быть не длиннее ${USERNAME_MAX_LENGTH} символов`,
  },
  {
    pattern: USERNAME_ALPHABET_REGEXP,
    message:
      "Имя пользователя может содержать только русские или латинские буквы",
  },
];

export const loginRules: Rule[] = [
  {
    required: true,
    message: "Введите логин",
  },
  {
    min: LOGIN_MIN_LENGTH,
    message: `Логин должен быть не короче ${LOGIN_MIN_LENGTH} символов`,
  },
  {
    max: LOGIN_MAX_LENGTH,
    message: `Логин должен быть не длиннее ${LOGIN_MAX_LENGTH} символов`,
  },
  {
    pattern: LOGIN_LATIN_REGEXP,
    message: "Логин может содержать только латинские буквы и дефис",
  },
];

export const passwordRules: Rule[] = [
  {
    required: true,
    message: "Введите пароль",
  },
  {
    min: PASSWORD_MIN_LENGTH,
    message: `Пароль должен быть не короче ${PASSWORD_MIN_LENGTH} символов`,
  },
  {
    max: PASSWORD_MAX_LENGTH,
    message: `Пароль должен быть не длиннее ${PASSWORD_MAX_LENGTH} символов`,
  },
];

export const emailRules: Rule[] = [
  {
    required: true,
    message: "Введите почтовый адрес",
  },
  {
    type: "email",
    message: "Введите корректный почтовый адрес",
  },
];

export const phoneRules: Rule[] = [
  {
    validator(_, value: string | undefined) {
      const phone = value?.trim();

      if (!phone) {
        return Promise.resolve();
      }

      if (!PHONE_REGEXP.test(phone)) {
        return Promise.reject(new Error("Введите 10 цифр мобильного номера"));
      }

      return Promise.resolve();
    },
  },
];

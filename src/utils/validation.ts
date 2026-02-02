export type TodoTitleValidationResult =
  | { ok: true; value: string }
  | { ok: false; error: string };

const minValue = 2;
const maxValue = 64;

export function validateTodoTitle(title: string): TodoTitleValidationResult {
  const clearTitle = title.trim();
  if (!clearTitle) {
    return { ok: false, error: "Название задачи не может быть пустым" };
  }
  if (clearTitle.length < minValue || clearTitle.length > maxValue) {
    return {
      ok: false,
      error: "Название задачи должно содержать от 2 до 64 символов",
    };
  }
  return { ok: true, value: clearTitle };
}

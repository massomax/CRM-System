const minValue = 2;
const maxValue = 64;

export function validateTodoTitle(title: string): string {
    if (!title) throw new Error("Название задачи не может быть пустым");
    if (title.length < minValue) throw new Error(`Название задачи должно быть не меньше ${minValue} символов`);
    if (title.length > maxValue) throw new Error(`Название задачи должно быть не больше ${maxValue} символов`);
    return title;
}
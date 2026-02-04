type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

type RequestOptions<TBody> = { method?: HttpMethod; body?: TBody };

export async function requestJson<TResponse, TBody = undefined>(
  path: string,
  options?: RequestOptions<TBody>,
): Promise<TResponse> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const init: RequestInit = {
    method: options?.method ?? "GET",
  };

  if (options?.body !== undefined) {
    init.body = JSON.stringify(options.body);
    init.headers = { "Content-Type": "application/json" };
  }

  const response = await fetch(`${baseUrl}${path}`, init);

  if (!response.ok) {
    const message = await response.text();
    throw new Error(
      `HTTP error! status: ${response.status}, ${response.statusText} message: ${message}`,
    );
  }

  const contentType = response.headers.get("content-type");

  if (contentType === null || !contentType.includes("application/json")) {
    return undefined as TResponse;
  }
  return (await response.json()) as TResponse;
}

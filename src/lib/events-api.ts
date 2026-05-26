import funcUrls from "../../backend/func2url.json";

export type EventItem = {
  id?: number;
  date: string;
  time: string;
  title: string;
  place: string;
  resp: string;
  count: number;
  age: string;
  paid: boolean;
  sort_order?: number;
};

const EVENTS_URL = (funcUrls as Record<string, string>).events;
const AUTH_URL = (funcUrls as Record<string, string>).auth;

export async function fetchEvents(): Promise<EventItem[]> {
  const res = await fetch(EVENTS_URL);
  if (!res.ok) throw new Error("Не удалось загрузить мероприятия");
  const data = await res.json();
  return data.events || [];
}

export async function createEvent(token: string, item: EventItem): Promise<void> {
  const res = await fetch(EVENTS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Auth-Token": token },
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error("Не удалось создать мероприятие");
}

export async function updateEvent(token: string, item: EventItem): Promise<void> {
  const res = await fetch(EVENTS_URL, {
    method: "PUT",
    headers: { "Content-Type": "application/json", "X-Auth-Token": token },
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error("Не удалось обновить мероприятие");
}

export async function deleteEvent(token: string, id: number): Promise<void> {
  const res = await fetch(`${EVENTS_URL}?id=${id}`, {
    method: "DELETE",
    headers: { "X-Auth-Token": token },
  });
  if (!res.ok) throw new Error("Не удалось удалить мероприятие");
}

export async function loginAdmin(password: string): Promise<string> {
  const res = await fetch(AUTH_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Ошибка входа" }));
    throw new Error(err.error || "Неверный пароль");
  }
  const data = await res.json();
  return data.token as string;
}

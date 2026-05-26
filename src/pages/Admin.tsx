import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import {
  EventItem,
  createEvent,
  deleteEvent,
  fetchEvents,
  loginAdmin,
  updateEvent,
} from "@/lib/events-api";

const TOKEN_KEY = "admin_token";

const emptyForm: EventItem = {
  date: "",
  time: "",
  title: "",
  place: "",
  resp: "",
  count: 0,
  age: "",
  paid: false,
  sort_order: 0,
};

const LoginScreen = ({ onSuccess }: { onSuccess: (token: string) => void }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const token = await loginAdmin(password);
      localStorage.setItem(TOKEN_KEY, token);
      onSuccess(token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка входа");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "#0f0c0a" }}>
      <form
        onSubmit={submit}
        className="w-full max-w-sm bg-white/[0.03] border border-yellow-600/20 rounded-sm p-8"
      >
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto mb-3 rounded-sm bg-red-900/30 border border-red-800/30 flex items-center justify-center">
            <Icon name="Lock" size={20} className="text-red-400" />
          </div>
          <h1 className="font-['Cormorant_Garamond'] text-2xl text-white/90">Вход для работников</h1>
          <p className="text-white/40 text-xs mt-1">Управление афишей ДК</p>
        </div>

        <label className="block text-yellow-600/70 text-xs uppercase tracking-wider mb-2">Пароль</label>
        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-black/30 border border-white/10 rounded-sm px-3 py-2 text-white/90 text-sm focus:outline-none focus:border-yellow-600/50"
          placeholder="Введите пароль"
        />

        {error && <p className="text-red-400 text-xs mt-3">{error}</p>}

        <button
          type="submit"
          disabled={loading || !password}
          className="w-full mt-5 py-2.5 bg-red-700 hover:bg-red-600 disabled:opacity-50 text-white text-sm tracking-wider uppercase transition-all"
        >
          {loading ? "Проверка..." : "Войти"}
        </button>

        <a href="/" className="block text-center text-white/30 hover:text-white/60 text-xs mt-4 transition-colors">
          ← на сайт
        </a>
      </form>
    </div>
  );
};

const EventForm = ({
  initial,
  onSubmit,
  onCancel,
  submitLabel,
}: {
  initial: EventItem;
  onSubmit: (data: EventItem) => Promise<void>;
  onCancel: () => void;
  submitLabel: string;
}) => {
  const [form, setForm] = useState<EventItem>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const update = <K extends keyof EventItem>(key: K, value: EventItem[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      await onSubmit(form);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка сохранения");
    } finally {
      setSaving(false);
    }
  };

  const field = (label: string, key: keyof EventItem, type: "text" | "number" = "text", placeholder = "") => (
    <div>
      <label className="block text-yellow-600/70 text-xs uppercase tracking-wider mb-1">{label}</label>
      <input
        type={type}
        value={form[key] as string | number}
        onChange={(e) =>
          update(
            key,
            (type === "number" ? Number(e.target.value) : e.target.value) as EventItem[typeof key]
          )
        }
        placeholder={placeholder}
        className="w-full bg-black/30 border border-white/10 rounded-sm px-3 py-2 text-white/90 text-sm focus:outline-none focus:border-yellow-600/50"
      />
    </div>
  );

  return (
    <form onSubmit={submit} className="bg-white/[0.03] border border-yellow-600/20 rounded-sm p-5 mb-4">
      <div className="grid md:grid-cols-2 gap-3">
        {field("Дата", "date", "text", "01 Пн")}
        {field("Время", "time", "text", "18:00")}
      </div>
      <div className="mt-3">{field("Название", "title", "text", "Название мероприятия")}</div>
      <div className="mt-3">{field("Место", "place", "text", "Концертный зал")}</div>
      <div className="mt-3">{field("Ответственные", "resp", "text", "Иванов И.И.")}</div>
      <div className="grid md:grid-cols-3 gap-3 mt-3">
        {field("Кол-во участников", "count", "number")}
        {field("Возраст", "age", "text", "0+, 6+, 12+, 18+")}
        {field("Порядок сортировки", "sort_order", "number")}
      </div>
      <label className="flex items-center gap-2 mt-4 text-white/80 text-sm cursor-pointer">
        <input
          type="checkbox"
          checked={form.paid}
          onChange={(e) => update("paid", e.target.checked)}
          className="w-4 h-4 accent-yellow-600"
        />
        Платное мероприятие
      </label>

      {error && <p className="text-red-400 text-xs mt-3">{error}</p>}

      <div className="flex gap-2 mt-5">
        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2 bg-red-700 hover:bg-red-600 disabled:opacity-50 text-white text-sm tracking-wider uppercase transition-all"
        >
          {saving ? "Сохранение..." : submitLabel}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2 border border-white/10 hover:border-white/30 text-white/60 text-sm tracking-wider uppercase transition-all"
        >
          Отмена
        </button>
      </div>
    </form>
  );
};

const AdminPanel = ({ token, onLogout }: { token: string; onLogout: () => void }) => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const reload = async () => {
    setLoading(true);
    try {
      const list = await fetchEvents();
      setEvents(list);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reload();
  }, []);

  const handleCreate = async (data: EventItem) => {
    await createEvent(token, data);
    setCreating(false);
    await reload();
  };

  const handleUpdate = async (data: EventItem) => {
    await updateEvent(token, data);
    setEditingId(null);
    await reload();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Удалить мероприятие?")) return;
    await deleteEvent(token, id);
    await reload();
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0f0c0a", color: "#f0e8d8" }}>
      <div className="border-b border-yellow-600/10 bg-black/30">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="ShieldCheck" size={18} className="text-yellow-500/70" />
            <h1 className="font-['Cormorant_Garamond'] text-xl text-white/90">Админ-панель — Афиша</h1>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" className="text-white/40 hover:text-yellow-400 text-xs tracking-wider uppercase transition-colors">
              На сайт
            </a>
            <button
              onClick={onLogout}
              className="text-white/40 hover:text-red-400 text-xs tracking-wider uppercase transition-colors"
            >
              Выйти
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {!creating && editingId === null && (
          <button
            onClick={() => setCreating(true)}
            className="mb-5 px-5 py-2.5 bg-yellow-700/80 hover:bg-yellow-600 text-white text-sm tracking-wider uppercase transition-all inline-flex items-center gap-2"
          >
            <Icon name="Plus" size={16} />
            Добавить мероприятие
          </button>
        )}

        {creating && (
          <EventForm
            initial={emptyForm}
            onSubmit={handleCreate}
            onCancel={() => setCreating(false)}
            submitLabel="Создать"
          />
        )}

        {loading ? (
          <p className="text-white/50 text-sm">Загрузка...</p>
        ) : (
          <div className="space-y-2">
            {events.length === 0 && (
              <p className="text-white/40 text-sm text-center py-10">Мероприятий пока нет — добавьте первое.</p>
            )}
            {events.map((e) =>
              editingId === e.id ? (
                <EventForm
                  key={e.id}
                  initial={e}
                  onSubmit={handleUpdate}
                  onCancel={() => setEditingId(null)}
                  submitLabel="Сохранить"
                />
              ) : (
                <div
                  key={e.id}
                  className={`flex items-start gap-4 p-4 border rounded-sm ${
                    e.paid ? "border-yellow-700/40 bg-yellow-900/5" : "border-white/10 bg-white/[0.02]"
                  }`}
                >
                  <div className="text-center min-w-[60px]">
                    <div className="text-yellow-500 font-['Cormorant_Garamond'] text-xl font-bold leading-none">
                      {e.date.split(" ")[0]}
                    </div>
                    <div className="text-white/40 text-xs">{e.date.split(" ")[1]}</div>
                    <div className="text-white/60 text-sm mt-1 font-medium">{e.time}</div>
                  </div>
                  <div className="flex-1 border-l border-yellow-600/20 pl-4">
                    <div className="flex flex-wrap gap-1 mb-1">
                      {e.age && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border bg-white/5 text-white/50 border-white/10">
                          {e.age}
                        </span>
                      )}
                      {e.paid && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border bg-yellow-900/40 text-yellow-400 border-yellow-700/50">
                          Платно
                        </span>
                      )}
                    </div>
                    <p className="text-white/90 text-sm font-medium">{e.title}</p>
                    <p className="text-white/40 text-xs mt-1">{e.place}</p>
                    <p className="text-white/30 text-xs mt-0.5">{e.resp}</p>
                  </div>
                  <div className="text-right text-white/40 text-xs whitespace-nowrap">
                    Участников: {e.count}
                  </div>
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => setEditingId(e.id ?? null)}
                      className="px-3 py-1.5 border border-white/10 hover:border-yellow-600/50 text-white/60 hover:text-yellow-400 text-xs tracking-wider uppercase transition-all"
                    >
                      <Icon name="Pencil" size={12} />
                    </button>
                    <button
                      onClick={() => e.id && handleDelete(e.id)}
                      className="px-3 py-1.5 border border-white/10 hover:border-red-700/50 text-white/60 hover:text-red-400 text-xs tracking-wider uppercase transition-all"
                    >
                      <Icon name="Trash2" size={12} />
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const Admin = () => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  };

  if (!token) return <LoginScreen onSuccess={setToken} />;
  return <AdminPanel token={token} onLogout={logout} />;
};

export default Admin;

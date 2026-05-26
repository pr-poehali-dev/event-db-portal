import { useState } from "react";
import Icon from "@/components/ui/icon";
import { EventItem } from "@/lib/events-api";
import { Badge, GoldDivider } from "./constants";

const EventsSection = ({ events }: { events: EventItem[] }) => {
  const [filter, setFilter] = useState<"all" | "paid" | "free">("all");
  const filtered = (events || []).filter(e =>
    filter === "all" ? true : filter === "paid" ? e.paid : !e.paid
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-10 animate-fade-in-up">
        <p className="text-yellow-600/70 text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.4em] uppercase mb-3">Календарный план</p>
        <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl text-white/90">Мероприятия — Декабрь 2025</h2>
        <GoldDivider />
        <p className="text-white/40 text-xs md:text-sm mt-3 px-4">МБУК «Дворец культуры имени И.П. Романенко» г. Сысерть</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6 animate-fade-in-up delay-100">
        {[["all", "Все"], ["free", "Бесплатные"], ["paid", "Платные"]] .map(([val, label]) => (
          <button
            key={val}
            onClick={() => setFilter(val as "all" | "paid" | "free")}
            className={`flex-1 md:flex-none px-4 py-2 text-sm transition-all ${filter === val
              ? "bg-red-700 text-white"
              : "border border-white/10 text-white/50 hover:border-yellow-600/30 hover:text-yellow-400/70"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Table — desktop */}
      <div className="hidden md:block overflow-x-auto rounded-sm border border-yellow-600/10 animate-fade-in-up delay-200">
        <table className="plan-table w-full">
          <thead>
            <tr>
              <th className="text-left">Дата</th>
              <th className="text-left">Время</th>
              <th className="text-left">Мероприятие</th>
              <th className="text-left">Место</th>
              <th className="text-left">Ответственные</th>
              <th className="text-right">Участники</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((e, i) => (
              <tr key={i} className={e.paid ? "is-paid" : ""}>
                <td className="font-medium text-white/70 whitespace-nowrap">{e.date}</td>
                <td className="whitespace-nowrap">{e.time}</td>
                <td>
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-wrap gap-1">
                      {e.age && <Badge color="gray">{e.age}</Badge>}
                      {e.paid && <Badge color="gold">Платно</Badge>}
                    </div>
                    <span>{e.title}</span>
                  </div>
                </td>
                <td className="text-white/50 text-xs">{e.place}</td>
                <td className="text-white/50 text-xs">{e.resp}</td>
                <td className="text-right font-medium">{e.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards — mobile */}
      <div className="md:hidden space-y-3 animate-fade-in-up delay-200">
        {filtered.length === 0 && (
          <p className="text-white/40 text-sm text-center py-8">Мероприятий не найдено</p>
        )}
        {filtered.map((e, i) => (
          <div
            key={i}
            className={`rounded-sm border p-4 ${
              e.paid
                ? "border-yellow-700/40 bg-yellow-900/5"
                : "border-white/10 bg-white/[0.03]"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="text-center min-w-[54px] pt-0.5">
                <div className="text-yellow-500 font-['Cormorant_Garamond'] text-2xl font-bold leading-none">
                  {e.date.split(" ")[0]}
                </div>
                <div className="text-white/40 text-[11px] uppercase tracking-wider mt-0.5">
                  {e.date.split(" ")[1]}
                </div>
                <div className="text-white/70 text-xs mt-1.5 font-medium">{e.time}</div>
              </div>

              <div className="flex-1 border-l border-yellow-600/20 pl-3 min-w-0">
                <div className="flex flex-wrap gap-1 mb-1.5">
                  {e.age && <Badge color="gray">{e.age}</Badge>}
                  {e.paid && <Badge color="gold">Платно</Badge>}
                </div>
                <p className="text-white/90 text-sm font-medium leading-snug break-words">
                  {e.title}
                </p>

                <div className="mt-2.5 space-y-1.5 text-xs">
                  <div className="flex items-start gap-1.5 text-white/55">
                    <Icon name="MapPin" size={12} className="mt-0.5 flex-shrink-0 text-yellow-600/60" />
                    <span className="break-words">{e.place}</span>
                  </div>
                  {e.resp && (
                    <div className="flex items-start gap-1.5 text-white/45">
                      <Icon name="User" size={12} className="mt-0.5 flex-shrink-0 text-yellow-600/60" />
                      <span className="break-words">{e.resp}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 text-white/55">
                    <Icon name="Users" size={12} className="text-yellow-600/60" />
                    <span>До {e.count} участников</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 border border-yellow-600/15 rounded-sm bg-yellow-900/5 animate-fade-in-up delay-300 space-y-2">
        <div className="flex items-center gap-2 text-yellow-500/70 text-sm">
          <Icon name="Info" size={14} />
          <span>Данные из официального календарного плана на декабрь 2025 года.</span>
        </div>
        <div className="flex items-start gap-2 text-yellow-500/70 text-sm">
          <Icon name="Phone" size={14} className="mt-0.5" />
          <span>
            Уточнить информацию можно по телефону{" "}
            <a href="tel:+73437473420" className="text-yellow-300 hover:text-yellow-200 underline">8 (34374) 7-34-20</a>{" "}
            — Ивченко Анжела Викторовна.
          </span>
        </div>
      </div>
    </div>
  );
};

export default EventsSection;

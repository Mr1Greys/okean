import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Calendar,
  Waves,
  Dumbbell,
  Star,
  ChevronLeft,
  ChevronRight,
  MapPin,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useBookingModal } from "@/hooks/use-booking-modal";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const DAY_KEYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"] as const;
type DayKey = (typeof DAY_KEYS)[number];

type SlotType = "pool" | "hall" | "special";

interface ScheduleSlot {
  time: string;
  endTime: string;
  title: string;
  category: string;
  ageRange: string;
  type: SlotType;
  location: string;
  instructor: string;
  address: string;
}

const ADDRESS = "г. Красногорск, Молодежная, д.3";

const SAMPLE_SCHEDULE: Record<DayKey, ScheduleSlot[]> = {
  Пн: [
    {
      time: "10:00",
      endTime: "10:45",
      title: "Грудничковое плавание",
      category: "Плавание",
      ageRange: "0–1",
      type: "pool",
      location: "Бассейн",
      instructor: "Мордвинова Татьяна",
      address: ADDRESS,
    },
    {
      time: "11:00",
      endTime: "11:45",
      title: "Раннее плавание",
      category: "Плавание",
      ageRange: "1–3",
      type: "pool",
      location: "Бассейн",
      instructor: "Мордвинова Татьяна",
      address: ADDRESS,
    },
    {
      time: "14:00",
      endTime: "14:45",
      title: "Творческая мастерская",
      category: "Зал",
      ageRange: "2+",
      type: "hall",
      location: "Зал",
      instructor: "Иванова Мария",
      address: ADDRESS,
    },
    {
      time: "16:00",
      endTime: "16:45",
      title: "Детское плавание",
      category: "Плавание",
      ageRange: "3–10",
      type: "pool",
      location: "Бассейн",
      instructor: "Петрова Анна",
      address: ADDRESS,
    },
    {
      time: "18:00",
      endTime: "18:45",
      title: "Аквааэробика",
      category: "Плавание",
      ageRange: "Взрослые",
      type: "pool",
      location: "Бассейн",
      instructor: "Сидорова Елена",
      address: ADDRESS,
    },
  ],
  Вт: [
    {
      time: "10:00",
      endTime: "10:45",
      title: "Грудничковое плавание",
      category: "Плавание",
      ageRange: "0–1",
      type: "pool",
      location: "Бассейн",
      instructor: "Мордвинова Татьяна",
      address: ADDRESS,
    },
    {
      time: "11:30",
      endTime: "12:15",
      title: "Аква-йога для мам",
      category: "Плавание",
      ageRange: "Беременные",
      type: "pool",
      location: "Бассейн",
      instructor: "Мордвинова Татьяна",
      address: ADDRESS,
    },
    {
      time: "14:00",
      endTime: "15:00",
      title: "Консультация психолога",
      category: "Спецпрограмма",
      ageRange: "3+",
      type: "special",
      location: "Зал",
      instructor: "Козлова Ольга",
      address: ADDRESS,
    },
    {
      time: "17:00",
      endTime: "17:45",
      title: "Детское плавание",
      category: "Плавание",
      ageRange: "3–10",
      type: "pool",
      location: "Бассейн",
      instructor: "Петрова Анна",
      address: ADDRESS,
    },
  ],
  Ср: [
    {
      time: "10:00",
      endTime: "10:45",
      title: "Грудничковое плавание",
      category: "Плавание",
      ageRange: "0–1",
      type: "pool",
      location: "Бассейн",
      instructor: "Мордвинова Татьяна",
      address: ADDRESS,
    },
    {
      time: "11:00",
      endTime: "11:45",
      title: "Раннее плавание",
      category: "Плавание",
      ageRange: "1–3",
      type: "pool",
      location: "Бассейн",
      instructor: "Мордвинова Татьяна",
      address: ADDRESS,
    },
    {
      time: "13:00",
      endTime: "13:30",
      title: "Ватсу",
      category: "Плавание",
      ageRange: "Взрослые",
      type: "pool",
      location: "Бассейн",
      instructor: "Сидорова Елена",
      address: ADDRESS,
    },
    {
      time: "15:00",
      endTime: "15:45",
      title: "Творческая мастерская",
      category: "Зал",
      ageRange: "2+",
      type: "hall",
      location: "Зал",
      instructor: "Иванова Мария",
      address: ADDRESS,
    },
    {
      time: "18:30",
      endTime: "19:15",
      title: "Оздоровительная гимнастика",
      category: "Зал",
      ageRange: "Взрослые",
      type: "hall",
      location: "Зал",
      instructor: "Смирнов Дмитрий",
      address: ADDRESS,
    },
  ],
  Чт: [
    {
      time: "10:00",
      endTime: "10:45",
      title: "Грудничковое плавание",
      category: "Плавание",
      ageRange: "0–1",
      type: "pool",
      location: "Бассейн",
      instructor: "Мордвинова Татьяна",
      address: ADDRESS,
    },
    {
      time: "11:00",
      endTime: "11:45",
      title: "Раннее плавание",
      category: "Плавание",
      ageRange: "1–3",
      type: "pool",
      location: "Бассейн",
      instructor: "Мордвинова Татьяна",
      address: ADDRESS,
    },
    {
      time: "14:00",
      endTime: "14:45",
      title: "Творческая мастерская",
      category: "Зал",
      ageRange: "2+",
      type: "hall",
      location: "Зал",
      instructor: "Иванова Мария",
      address: ADDRESS,
    },
    {
      time: "16:00",
      endTime: "16:45",
      title: "Детское плавание",
      category: "Плавание",
      ageRange: "3–10",
      type: "pool",
      location: "Бассейн",
      instructor: "Петрова Анна",
      address: ADDRESS,
    },
  ],
  Пт: [
    {
      time: "10:00",
      endTime: "10:45",
      title: "Грудничковое плавание",
      category: "Плавание",
      ageRange: "0–1",
      type: "pool",
      location: "Бассейн",
      instructor: "Мордвинова Татьяна",
      address: ADDRESS,
    },
    {
      time: "11:00",
      endTime: "11:45",
      title: "Раннее плавание",
      category: "Плавание",
      ageRange: "1–3",
      type: "pool",
      location: "Бассейн",
      instructor: "Мордвинова Татьяна",
      address: ADDRESS,
    },
    {
      time: "14:00",
      endTime: "15:00",
      title: "Консультация психолога",
      category: "Спецпрограмма",
      ageRange: "3+",
      type: "special",
      location: "Зал",
      instructor: "Козлова Ольга",
      address: ADDRESS,
    },
    {
      time: "17:00",
      endTime: "17:45",
      title: "Детское плавание",
      category: "Плавание",
      ageRange: "3–10",
      type: "pool",
      location: "Бассейн",
      instructor: "Петрова Анна",
      address: ADDRESS,
    },
    {
      time: "19:00",
      endTime: "19:45",
      title: "Аквааэробика",
      category: "Плавание",
      ageRange: "Взрослые",
      type: "pool",
      location: "Бассейн",
      instructor: "Сидорова Елена",
      address: ADDRESS,
    },
  ],
  Сб: [
    {
      time: "10:00",
      endTime: "10:45",
      title: "Грудничковое плавание",
      category: "Плавание",
      ageRange: "0–1",
      type: "pool",
      location: "Бассейн",
      instructor: "Мордвинова Татьяна",
      address: ADDRESS,
    },
    {
      time: "11:30",
      endTime: "12:15",
      title: "Детское плавание",
      category: "Плавание",
      ageRange: "3–10",
      type: "pool",
      location: "Бассейн",
      instructor: "Петрова Анна",
      address: ADDRESS,
    },
    {
      time: "13:00",
      endTime: "13:30",
      title: "Ватсу",
      category: "Плавание",
      ageRange: "Взрослые",
      type: "pool",
      location: "Бассейн",
      instructor: "Сидорова Елена",
      address: ADDRESS,
    },
    {
      time: "14:30",
      endTime: "15:15",
      title: "Творческая мастерская",
      category: "Зал",
      ageRange: "2+",
      type: "hall",
      location: "Зал",
      instructor: "Иванова Мария",
      address: ADDRESS,
    },
  ],
  Вс: [
    {
      time: "11:00",
      endTime: "11:45",
      title: "Грудничковое плавание",
      category: "Плавание",
      ageRange: "0–1",
      type: "pool",
      location: "Бассейн",
      instructor: "Мордвинова Татьяна",
      address: ADDRESS,
    },
    {
      time: "12:30",
      endTime: "13:15",
      title: "Раннее плавание",
      category: "Плавание",
      ageRange: "1–3",
      type: "pool",
      location: "Бассейн",
      instructor: "Мордвинова Татьяна",
      address: ADDRESS,
    },
    {
      time: "14:00",
      endTime: "14:45",
      title: "Свободное плавание",
      category: "Плавание",
      ageRange: "Любой",
      type: "pool",
      location: "Бассейн",
      instructor: "Петрова Анна",
      address: ADDRESS,
    },
  ],
};

const TYPE_STYLES: Record<SlotType, string> = {
  pool: "bg-sky-100 text-sky-800 border-sky-200 hover:bg-sky-200/80",
  hall: "bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-200/80",
  special: "bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200/80",
};

const FILTER_ACTIVE_STYLES: Record<SlotType, string> = {
  pool: "bg-sky-600 text-white border-sky-600 shadow-md",
  hall: "bg-emerald-600 text-white border-emerald-600 shadow-md",
  special: "bg-orange-600 text-white border-orange-600 shadow-md",
};

const FILTERS: { type: SlotType; label: string; icon: React.ElementType }[] = [
  { type: "pool", label: "Бассейн", icon: Waves },
  { type: "hall", label: "Зал", icon: Dumbbell },
  { type: "special", label: "Спецпрограммы", icon: Star },
];

function getWeekStart(baseDate: Date, weekOffset: number): Date {
  const d = new Date(baseDate);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff + weekOffset * 7);
  d.setHours(0, 0, 0, 0);
  return d;
}

function formatShortDate(date: Date): string {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  return `${dd}.${mm}`;
}

function formatWeekRange(weekStart: Date): string {
  const end = new Date(weekStart);
  end.setDate(end.getDate() + 6);
  const months = [
    "января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря",
  ];
  const sameMonth = weekStart.getMonth() === end.getMonth();
  if (sameMonth) {
    return `${weekStart.getDate()}–${end.getDate()} ${months[weekStart.getMonth()]} ${weekStart.getFullYear()}`;
  }
  return `${weekStart.getDate()} ${months[weekStart.getMonth()]} – ${end.getDate()} ${months[end.getMonth()]} ${end.getFullYear()}`;
}

function SlotDetails({
  slot,
  dayKey,
  dateLabel,
}: {
  slot: ScheduleSlot;
  dayKey: DayKey;
  dateLabel: string;
}) {
  return (
    <div className="space-y-2 text-sm">
      <p className="font-bold text-foreground leading-snug">
        {slot.category} — {slot.ageRange} {slot.title}
      </p>
      <p className="text-xs font-semibold text-primary uppercase tracking-wide">Запись</p>
      <p className="font-medium text-foreground">
        {dayKey}, {dateLabel} {slot.time}–{slot.endTime}
      </p>
      <p className="text-muted-foreground flex items-start gap-1.5">
        <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
        <span>Адрес: {slot.address}</span>
      </p>
      <p className="font-medium text-foreground">{slot.location}</p>
      <p className="text-muted-foreground flex items-center gap-1.5">
        <User className="w-3.5 h-3.5 shrink-0" />
        {slot.instructor}
      </p>
    </div>
  );
}

function SlotCard({
  slot,
  dayKey,
  dateLabel,
  onBook,
  isMobile,
}: {
  slot: ScheduleSlot;
  dayKey: DayKey;
  dateLabel: string;
  onBook: (title: string) => void;
  isMobile: boolean;
}) {
  const compact = (
    <button
      type="button"
      className={cn(
        "w-full text-left px-2.5 py-2 rounded-lg border text-xs leading-tight transition-colors min-h-[44px]",
        TYPE_STYLES[slot.type],
      )}
    >
      <div className="font-bold mb-0.5">{slot.time}</div>
      <div className="leading-snug line-clamp-2">{slot.title}</div>
    </button>
  );

  const details = (
    <div className="space-y-3">
      <SlotDetails slot={slot} dayKey={dayKey} dateLabel={dateLabel} />
      <Button
        size="sm"
        className="w-full rounded-full"
        onClick={() => onBook(slot.title)}
      >
        Записаться
      </Button>
    </div>
  );

  if (isMobile) {
    return (
      <Popover>
        <PopoverTrigger asChild>{compact}</PopoverTrigger>
        <PopoverContent className="w-[min(100vw-2rem,320px)] p-4" align="start" side="bottom">
          {details}
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <HoverCard openDelay={120} closeDelay={80}>
      <HoverCardTrigger asChild>{compact}</HoverCardTrigger>
      <HoverCardContent className="w-72 p-4" align="start" side="right">
        {details}
      </HoverCardContent>
    </HoverCard>
  );
}

export default function Schedule() {
  const { openModal } = useBookingModal();
  const isMobile = useIsMobile();
  const [weekOffset, setWeekOffset] = useState(0);
  const [activeFilter, setActiveFilter] = useState<SlotType | null>(null);

  const weekStart = useMemo(() => getWeekStart(new Date(), weekOffset), [weekOffset]);

  const weekDays = useMemo(() => {
    return DAY_KEYS.map((key, i) => {
      const date = new Date(weekStart);
      date.setDate(date.getDate() + i);
      return { key, date, dateLabel: formatShortDate(date) };
    });
  }, [weekStart]);

  const isCurrentWeek = weekOffset === 0;

  const filterSlots = (slots: ScheduleSlot[]) =>
    activeFilter ? slots.filter((s) => s.type === activeFilter) : slots;

  const hasAnySlots = weekDays.some(
    (d) => filterSlots(SAMPLE_SCHEDULE[d.key] ?? []).length > 0,
  );

  return (
    <div className="flex flex-col">
      <section className="py-12 md:py-16 bg-gradient-to-b from-secondary/40 to-background">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-primary/10 text-primary font-semibold text-sm">
              Расписание
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
              Расписание занятий
            </h1>
            <p className="text-muted-foreground text-lg">
              Актуальное расписание уточняйте у администратора — места в группах ограничены
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pt-2 pb-6 md:pb-8 bg-background">
        <div className="container mx-auto px-4 max-w-6xl space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-2 flex-wrap">
              {FILTERS.map((f) => {
                const isActive = activeFilter === f.type;
                return (
                  <button
                    key={f.type}
                    type="button"
                    data-testid={`filter-${f.type}`}
                    onClick={() => setActiveFilter(isActive ? null : f.type)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold transition-all min-h-[44px]",
                      isActive ? FILTER_ACTIVE_STYLES[f.type] : TYPE_STYLES[f.type],
                    )}
                  >
                    <f.icon className="w-4 h-4" />
                    {f.label}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full shrink-0 h-10 w-10"
                onClick={() => setWeekOffset((w) => w - 1)}
                aria-label="Предыдущая неделя"
                data-testid="week-prev"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <div className="text-center min-w-[140px] px-2">
                <p className="text-sm font-bold text-foreground">{formatWeekRange(weekStart)}</p>
                <p className="text-xs text-muted-foreground">
                  {isCurrentWeek ? "Текущая неделя" : weekOffset > 0 ? "Следующая неделя" : "Прошлая неделя"}
                </p>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full shrink-0 h-10 w-10"
                onClick={() => setWeekOffset((w) => w + 1)}
                aria-label="Следующая неделя"
                data-testid="week-next"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
              {!isCurrentWeek && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full text-xs hidden sm:inline-flex"
                  onClick={() => setWeekOffset(0)}
                  data-testid="week-today"
                >
                  Сегодня
                </Button>
              )}
            </div>
          </div>

          {!isCurrentWeek && (
            <div className="sm:hidden">
              <Button
                variant="outline"
                size="sm"
                className="w-full rounded-full"
                onClick={() => setWeekOffset(0)}
                data-testid="week-today-mobile"
              >
                Вернуться к текущей неделе
              </Button>
            </div>
          )}
        </div>
      </section>

      <section className="pb-8 md:pb-10 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          {!hasAnySlots ? (
            <div className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
              <p className="font-medium text-foreground mb-1">Нет занятий по выбранному фильтру</p>
              <p className="text-sm">Попробуйте другую категорию или сбросьте фильтр</p>
              <Button variant="outline" className="mt-4 rounded-full" onClick={() => setActiveFilter(null)}>
                Показать все
              </Button>
            </div>
          ) : (
            <>
              <div className="md:hidden space-y-4">
                {weekDays.map(({ key, dateLabel }) => {
                  const slots = filterSlots(SAMPLE_SCHEDULE[key] ?? []);
                  if (slots.length === 0) return null;
                  return (
                    <div key={key} className="rounded-2xl border border-border overflow-hidden">
                      <div className="px-4 py-3 bg-secondary/40 border-b border-border flex items-center justify-between">
                        <span className="font-bold text-foreground">{key}</span>
                        <span className="text-sm text-muted-foreground">{dateLabel}</span>
                      </div>
                      <div className="p-3 flex flex-col gap-2">
                        {slots.map((slot, i) => (
                          <SlotCard
                            key={`${key}-${i}`}
                            slot={slot}
                            dayKey={key}
                            dateLabel={dateLabel}
                            onBook={openModal}
                            isMobile={isMobile}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="hidden md:block overflow-x-auto rounded-2xl border border-border">
                <div className="min-w-[720px]">
                  <div className="grid grid-cols-7 bg-secondary/30">
                    {weekDays.map(({ key, dateLabel }) => (
                      <div
                        key={key}
                        className="p-3 text-center border-r border-border last:border-0"
                      >
                        <div className="text-sm font-bold text-foreground">{key}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{dateLabel}</div>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 min-h-[360px]">
                    {weekDays.map(({ key, dateLabel }) => {
                      const slots = filterSlots(SAMPLE_SCHEDULE[key] ?? []);
                      return (
                        <div
                          key={key}
                          className="p-2 border-r border-border last:border-0 flex flex-col gap-2 min-h-[200px]"
                        >
                          {slots.length === 0 ? (
                            <span className="text-xs text-muted-foreground/60 text-center py-4">
                              —
                            </span>
                          ) : (
                            slots.map((slot, i) => (
                              <SlotCard
                                key={`${key}-${i}`}
                                slot={slot}
                                dayKey={key}
                                dateLabel={dateLabel}
                                onBook={openModal}
                                isMobile={isMobile}
                              />
                            ))
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          )}

          <p className="text-xs text-muted-foreground mt-4 text-center flex items-center justify-center gap-1.5 flex-wrap">
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            {isMobile
              ? "Нажмите на занятие для подробностей и записи"
              : "Наведите на занятие для подробностей. Расписание носит ознакомительный характер."}
          </p>
        </div>
      </section>

      <section className="pb-16 md:pb-20 bg-background">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-primary/5 border border-primary/20 text-center sm:text-left">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-foreground mb-1">Уточните актуальное расписание</h3>
              <p className="text-muted-foreground text-sm mb-3">
                Расписание формируется индивидуально. Позвоните нам или оставьте заявку.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <a
                  href="tel:+79771843409"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors min-h-[44px]"
                >
                  <Phone className="w-4 h-4" />
                  +7 977 184-34-09
                </a>
                <Button variant="outline" className="rounded-full" onClick={() => openModal()}>
                  Записаться онлайн
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import React from "react";
import { motion } from "framer-motion";
import { Phone, Calendar, Waves, Dumbbell, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBookingModal } from "@/hooks/use-booking-modal";

const DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

type SlotType = "pool" | "hall" | "special";

interface Slot {
  time: string;
  title: string;
  type: SlotType;
}

const SAMPLE_SCHEDULE: Record<string, Slot[]> = {
  "Пн": [
    { time: "10:00", title: "Грудничковое плавание", type: "pool" },
    { time: "11:00", title: "Раннее плавание", type: "pool" },
    { time: "14:00", title: "Творческая мастерская", type: "hall" },
    { time: "16:00", title: "Детское плавание", type: "pool" },
    { time: "18:00", title: "Аквааэробика", type: "pool" },
  ],
  "Вт": [
    { time: "10:00", title: "Грудничковое плавание", type: "pool" },
    { time: "11:30", title: "Аква-йога для мам", type: "pool" },
    { time: "14:00", title: "Консультация психолога", type: "special" },
    { time: "17:00", title: "Детское плавание", type: "pool" },
  ],
  "Ср": [
    { time: "10:00", title: "Грудничковое плавание", type: "pool" },
    { time: "11:00", title: "Раннее плавание", type: "pool" },
    { time: "13:00", title: "Ватсу", type: "pool" },
    { time: "15:00", title: "Творческая мастерская", type: "hall" },
    { time: "18:30", title: "Оздоровительная гимнастика", type: "hall" },
  ],
  "Чт": [
    { time: "10:00", title: "Грудничковое плавание", type: "pool" },
    { time: "11:30", title: "Аква-йога для мам", type: "pool" },
    { time: "14:00", title: "Творческая мастерская", type: "hall" },
    { time: "16:00", title: "Детское плавание", type: "pool" },
  ],
  "Пт": [
    { time: "10:00", title: "Грудничковое плавание", type: "pool" },
    { time: "11:00", title: "Раннее плавание", type: "pool" },
    { time: "14:00", title: "Консультация психолога", type: "special" },
    { time: "17:00", title: "Детское плавание", type: "pool" },
    { time: "19:00", title: "Аквааэробика", type: "pool" },
  ],
  "Сб": [
    { time: "10:00", title: "Грудничковое плавание", type: "pool" },
    { time: "11:30", title: "Детское плавание", type: "pool" },
    { time: "13:00", title: "Ватсу", type: "pool" },
    { time: "14:30", title: "Творческая мастерская", type: "hall" },
  ],
  "Вс": [
    { time: "11:00", title: "Грудничковое плавание", type: "pool" },
    { time: "12:30", title: "Раннее плавание", type: "pool" },
    { time: "14:00", title: "Свободное плавание", type: "pool" },
  ],
};

const TYPE_STYLES: Record<SlotType, string> = {
  pool: "bg-sky-100 text-sky-800 border-sky-200",
  hall: "bg-emerald-100 text-emerald-800 border-emerald-200",
  special: "bg-orange-100 text-orange-800 border-orange-200",
};

const LEGEND = [
  { type: "pool" as SlotType, label: "Бассейн", icon: Waves },
  { type: "hall" as SlotType, label: "Зал", icon: Dumbbell },
  { type: "special" as SlotType, label: "Спецпрограммы", icon: Star },
];

export default function Schedule() {
  const { openModal } = useBookingModal();

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-secondary/40 to-background">
        <div className="container px-4 max-w-3xl mx-auto text-center">
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

      {/* Call to clarify */}
      <section className="py-10 bg-background">
        <div className="container px-4 max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-primary/5 border border-primary/20 text-center sm:text-left">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-foreground mb-1">Уточните актуальное расписание</h3>
              <p className="text-muted-foreground text-sm mb-3">Расписание формируется индивидуально. Позвоните нам или оставьте заявку.</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <a href="tel:+79771843409" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors min-h-[44px]">
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

      {/* Legend */}
      <section className="pb-6 bg-background">
        <div className="container px-4 max-w-5xl mx-auto">
          <div className="flex gap-3 flex-wrap">
            {LEGEND.map((l) => (
              <div key={l.type} className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium ${TYPE_STYLES[l.type]}`}>
                <l.icon className="w-3.5 h-3.5" />
                {l.label}
              </div>
            ))}
            <span className="text-xs text-muted-foreground flex items-center ml-2">— примерное расписание</span>
          </div>
        </div>
      </section>

      {/* Weekly grid */}
      <section className="pb-16 bg-background">
        <div className="container px-4 max-w-5xl mx-auto">
          <div className="overflow-x-auto rounded-2xl border border-border">
            <div className="min-w-[640px]">
              {/* Day headers */}
              <div className="grid grid-cols-7 bg-secondary/30">
                {DAYS.map((day) => (
                  <div key={day} className="p-3 text-center text-sm font-bold text-foreground border-r border-border last:border-0">
                    {day}
                  </div>
                ))}
              </div>
              {/* Slots */}
              <div className="grid grid-cols-7 min-h-[400px]">
                {DAYS.map((day) => (
                  <div key={day} className="p-2 border-r border-border last:border-0 flex flex-col gap-2 min-h-[200px]">
                    {(SAMPLE_SCHEDULE[day] || []).map((slot, i) => (
                      <button
                        key={i}
                        onClick={() => openModal(slot.title)}
                        className={`text-left px-2 py-2 rounded-lg border text-xs leading-tight hover:opacity-80 transition-opacity ${TYPE_STYLES[slot.type]}`}
                      >
                        <div className="font-bold mb-0.5">{slot.time}</div>
                        <div className="leading-snug">{slot.title}</div>
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3 text-center flex items-center justify-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            Нажмите на занятие, чтобы записаться. Расписание носит ознакомительный характер.
          </p>
        </div>
      </section>
    </div>
  );
}

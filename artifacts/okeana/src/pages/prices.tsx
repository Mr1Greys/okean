import React, { useState } from "react";
import { motion } from "framer-motion";
import { Waves, Users, Star, Baby, Heart, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBookingModal } from "@/hooks/use-booking-modal";

type PoolTab = "group" | "individual";
type MainTab = "pool" | "hall";

interface PriceRow {
  label: string;
  count: string;
  period: string;
  price: string;
  perSession?: string;
  isTrial?: boolean;
}

interface PriceCard {
  title: string;
  age: string;
  duration: string;
  icon: React.ElementType;
  rows: PriceRow[];
  program: string;
}

const GROUP_CARDS: PriceCard[] = [
  {
    title: "Детское / Грудничковое плавание",
    age: "0–10 лет",
    duration: "45 мин",
    icon: Baby,
    program: "Детское плавание",
    rows: [
      { label: "Пробное занятие", count: "1", period: "1 день", price: "900 ₽", isTrial: true },
      { label: "Разовое", count: "1", period: "1 день", price: "1 890 ₽" },
      { label: "Абонемент", count: "4", period: "30 дней", price: "6 390 ₽", perSession: "1 598 ₽/занятие" },
      { label: "Абонемент", count: "8", period: "30 дней", price: "11 590 ₽", perSession: "1 449 ₽/занятие" },
      { label: "Абонемент", count: "10", period: "45 дней", price: "13 590 ₽", perSession: "1 359 ₽/занятие" },
    ],
  },
  {
    title: "Занятия для будущих мам",
    age: "Беременные",
    duration: "45 мин",
    icon: Heart,
    program: "Аква-йога для будущих мам",
    rows: [
      { label: "Пробное занятие", count: "1", period: "1 день", price: "900 ₽", isTrial: true },
      { label: "Разовое", count: "1", period: "1 день", price: "1 890 ₽" },
      { label: "Абонемент", count: "4", period: "30 дней", price: "6 390 ₽", perSession: "1 598 ₽/занятие" },
    ],
  },
];

const INDIVIDUAL_CARDS: PriceCard[] = [
  {
    title: "С тренером (1 ребёнок)",
    age: "0–10 лет",
    duration: "30 мин",
    icon: Baby,
    program: "Индивидуальное занятие",
    rows: [
      { label: "Пробное занятие", count: "1", period: "1 день", price: "1 000 ₽", isTrial: true },
      { label: "Разовое", count: "1", period: "1 день", price: "2 499 ₽" },
      { label: "Абонемент", count: "4", period: "30 дней", price: "8 990 ₽", perSession: "2 248 ₽/занятие" },
      { label: "Абонемент", count: "8", period: "30 дней", price: "17 590 ₽", perSession: "2 199 ₽/занятие" },
      { label: "Абонемент", count: "10", period: "45 дней", price: "21 490 ₽", perSession: "2 149 ₽/занятие" },
    ],
  },
  {
    title: "С тренером (2 ребёнка)",
    age: "0–10 лет",
    duration: "30 мин",
    icon: Users,
    program: "Индивидуальное занятие",
    rows: [
      { label: "Пробное занятие", count: "1", period: "1 день", price: "1 725 ₽", isTrial: true },
      { label: "Разовое", count: "1", period: "1 день", price: "3 449 ₽" },
      { label: "Абонемент", count: "4", period: "30 дней", price: "12 590 ₽", perSession: "3 148 ₽/занятие" },
      { label: "Абонемент", count: "8", period: "30 дней", price: "24 625 ₽", perSession: "3 078 ₽/занятие" },
    ],
  },
  {
    title: "Аренда бассейна с тренером",
    age: "Любой возраст",
    duration: "30 мин",
    icon: Waves,
    program: "Аренда бассейна",
    rows: [
      { label: "Пробное", count: "1", period: "1 день", price: "1 725 ₽", isTrial: true },
      { label: "Абонемент", count: "4", period: "30 дней", price: "12 590 ₽" },
      { label: "Абонемент", count: "8", period: "30 дней", price: "24 265 ₽" },
    ],
  },
  {
    title: "Особенные детки",
    age: "Особые потребности",
    duration: "30 / 60 мин",
    icon: Star,
    program: "Занятия для особенных деток",
    rows: [
      { label: "1 занятие (30 мин)", count: "1", period: "1 день", price: "2 000 ₽" },
      { label: "1 занятие (60 мин)", count: "1", period: "1 день", price: "4 000 ₽" },
      { label: "Абонемент 30 мин", count: "4", period: "30 дней", price: "7 200 ₽", perSession: "1 800 ₽/занятие" },
      { label: "Абонемент 60 мин", count: "4", period: "30 дней", price: "14 400 ₽", perSession: "3 600 ₽/занятие" },
      { label: "Абонемент 30 мин", count: "8", period: "30 дней", price: "13 600 ₽", perSession: "1 700 ₽/занятие" },
      { label: "Абонемент 60 мин", count: "8", period: "30 дней", price: "27 200 ₽", perSession: "3 400 ₽/занятие" },
    ],
  },
  {
    title: "Разовое посещение",
    age: "Любой возраст",
    duration: "30 мин",
    icon: Waves,
    program: "Свободное плавание",
    rows: [
      { label: "Разовое (без абонемента)", count: "1", period: "1 день", price: "2 000 ₽" },
    ],
  },
];

const HALL_CARDS: PriceCard[] = [
  {
    title: "Творческая мастерская",
    age: "Дети 2+",
    duration: "45 мин",
    icon: Star,
    program: "Творческая мастерская",
    rows: [
      { label: "Разовое занятие", count: "1", period: "1 день", price: "950 ₽" },
      { label: "Абонемент", count: "8", period: "30 дней", price: "6 800 ₽", perSession: "850 ₽/занятие" },
    ],
  },
  {
    title: "Психологическое консультирование",
    age: "Дети 3+",
    duration: "60 мин",
    icon: Heart,
    program: "Консультации психолога",
    rows: [
      { label: "1 консультация", count: "1", period: "1 день", price: "5 000 ₽" },
    ],
  },
];

function PriceCardComp({ card }: { card: PriceCard }) {
  const { openModal } = useBookingModal();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-background rounded-3xl border border-border shadow-sm overflow-hidden flex flex-col"
      data-testid={`price-card-${card.title}`}
    >
      <div className="bg-gradient-to-br from-secondary/60 to-secondary/20 p-6 flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
          <card.icon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-bold text-foreground text-lg leading-tight">{card.title}</h3>
          <div className="flex gap-2 mt-2 flex-wrap">
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary">
              {card.age}
            </span>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground">
              {card.duration}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1 gap-3">
        {card.rows.map((row, i) => (
          <div key={i} className={`flex items-center justify-between py-3 border-b border-border last:border-0 ${row.isTrial ? "bg-accent/5 -mx-2 px-2 rounded-xl" : ""}`}>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                {row.isTrial && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-accent/15 text-accent-foreground/80">Первый раз</span>
                )}
                <span className="text-sm font-medium text-foreground">{row.label}</span>
              </div>
              {(row.count !== "1" || row.period !== "1 день") && !row.isTrial && (
                <span className="text-xs text-muted-foreground mt-0.5">{row.count} занятий / {row.period}</span>
              )}
            </div>
            <div className="text-right">
              <div className="font-bold text-foreground text-base">{row.price}</div>
              {row.perSession && (
                <div className="text-xs text-muted-foreground">{row.perSession}</div>
              )}
            </div>
          </div>
        ))}

        <Button
          className="w-full rounded-full mt-4"
          onClick={() => openModal(card.program)}
          data-testid={`btn-signup-${card.title}`}
        >
          Записаться
        </Button>
      </div>
    </motion.div>
  );
}

export default function Prices() {
  const [mainTab, setMainTab] = useState<MainTab>("pool");
  const [poolTab, setPoolTab] = useState<PoolTab>("group");

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-secondary/40 to-background">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-primary/10 text-primary font-semibold text-sm">
              Цены
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
              Прозрачные цены
            </h1>
            <p className="text-muted-foreground text-lg">
              Выберите удобный формат — разовое посещение или выгодный абонемент
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main tabs */}
      <section className="sticky top-16 z-30 bg-background border-b border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex gap-2 py-3">
            {[{ id: "pool" as MainTab, label: "Бассейн" }, { id: "hall" as MainTab, label: "Зал" }].map((t) => (
              <button
                key={t.id}
                onClick={() => setMainTab(t.id)}
                data-testid={`main-tab-${t.id}`}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all min-h-[44px] ${
                  mainTab === t.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Pool sub-tabs */}
      {mainTab === "pool" && (
        <div className="bg-background border-b border-border/50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex gap-2 py-2">
              {[{ id: "group" as PoolTab, label: "Групповые" }, { id: "individual" as PoolTab, label: "Индивидуальные" }].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setPoolTab(t.id)}
                  data-testid={`pool-tab-${t.id}`}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all min-h-[40px] ${
                    poolTab === t.id
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Cards */}
      <section className="py-10 md:py-16 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mainTab === "pool" && poolTab === "group" && GROUP_CARDS.map((c) => <PriceCardComp key={c.title} card={c} />)}
            {mainTab === "pool" && poolTab === "individual" && INDIVIDUAL_CARDS.map((c) => <PriceCardComp key={c.title} card={c} />)}
            {mainTab === "hall" && HALL_CARDS.map((c) => <PriceCardComp key={c.title} card={c} />)}
          </div>
        </div>
      </section>

      {/* Cancellation policy */}
      <section className="pb-16 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex gap-4 p-6 rounded-2xl bg-secondary/40 border border-secondary">
            <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-foreground mb-1">Условие отмены</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Отмена занятия бесплатна при уведомлении администратора <strong>не позже чем за сутки</strong> до начала занятия. При отмене в день занятия стоимость занятия списывается с абонемента.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

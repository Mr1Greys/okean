import React from "react";
import { motion } from "framer-motion";
import { Waves, Thermometer, User, ShieldCheck, Clock, DoorOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBookingModal } from "@/hooks/use-booking-modal";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const SPECS = [
  { icon: Thermometer, title: "Температура воды", value: "32–33°C", desc: "Комфортная тёплая вода специально для занятий с детьми с рождения." },
  { icon: Clock, title: "Обновление воды", value: "каждые 30 мин", desc: "Система непрерывной фильтрации обеспечивает чистоту и свежесть воды на протяжении всего дня." },
  { icon: DoorOpen, title: "Приватные кабинки", value: "без очередей", desc: "Индивидуальные кабинки для переодевания и отдельные душевые — комфорт и приватность для каждой семьи." },
  { icon: ShieldCheck, title: "Сертификация", value: "Birthlight", desc: "Все инструкторы прошли международную сертификацию по системе Birthlight." },
  { icon: User, title: "Инструкторы", value: "Опытные специалисты", desc: "Каждый тренер имеет педагогическое или медицинское образование и практику работы с детьми." },
  { icon: Waves, title: "Размер групп", value: "До 6 пар", desc: "Небольшие группы позволяют уделить внимание каждому ребёнку и создать безопасную атмосферу." },
];

const RULES = [
  "Для занятий необходима справка от педиатра (до 1 года) или об отсутствии противопоказаний к плаванию",
  "Анализы на энтеробиоз и яйцеглист для детей от 1 года",
  "Купальная шапочка обязательна для всех участников",
  "Вход в зону бассейна только в сменной обуви",
  "Запись осуществляется предварительно — групп мест строго ограниченное количество",
  "Прийти на занятие рекомендуем за 10–15 минут до начала",
  "Отмена занятия — за сутки и более для бесплатной отмены",
];

export default function AboutPool() {
  const { openModal } = useBookingModal();

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-secondary/40 to-background">
        <div className="container px-4 max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-primary/10 text-primary font-semibold text-sm">
              Бассейн
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
              Наш бассейн
            </h1>
            <p className="text-muted-foreground text-lg">
              Тёплый, чистый, безопасный — создан специально для самых маленьких пловцов
            </p>
          </motion.div>
        </div>
      </section>

      {/* Specs */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4 max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Технические характеристики</h2>
            <p className="text-muted-foreground text-lg">Всё продумано для здоровья и комфорта вашего ребёнка</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SPECS.map((spec, i) => (
              <motion.div
                key={spec.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-6 rounded-2xl bg-background border border-border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <spec.icon className="w-6 h-6" />
                </div>
                <div className="text-2xl font-black text-primary mb-1">{spec.value}</div>
                <div className="font-semibold text-foreground mb-2">{spec.title}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{spec.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Rules */}
      <section className="py-16 md:py-24 bg-secondary/20">
        <div className="container px-4 max-w-3xl mx-auto">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Правила посещения</h2>
            <div className="space-y-4">
              {RULES.map((rule, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-background border border-border">
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <p className="text-foreground leading-relaxed">{rule}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto flex max-w-3xl flex-col items-center px-4 text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl font-bold mb-4">Готовы начать?</h2>
            <p className="text-primary-foreground/80 mb-8 text-lg">Запишитесь на пробное занятие — мы всё расскажем на месте</p>
            <Button size="lg" onClick={() => openModal()} className="bg-white text-primary hover:bg-white/90 rounded-full px-10 h-14 text-lg font-semibold">
              Записаться
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

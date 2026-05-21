import React, { useState } from "react";
import { motion } from "framer-motion";
import { Baby, Waves, Users, Heart, Flower, Dumbbell, Palette, Brain, Star, Gift, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBookingModal } from "@/hooks/use-booking-modal";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

type Category = "children" | "adults" | "moms" | "special";

interface Program {
  title: string;
  age: string;
  desc: string;
  icon: React.ElementType;
  category: Category;
  gradient: string;
}

const PROGRAMS: Program[] = [
  {
    title: "Грудничковое плавание",
    age: "0–1 год",
    desc: "Бережное знакомство с водой с первых недель жизни. Тесный контакт с мамой, мягкие погружения, развитие врождённых плавательных рефлексов.",
    icon: Baby,
    category: "children",
    gradient: "from-sky-100 to-blue-50",
  },
  {
    title: "Раннее плавание",
    age: "1–3 года",
    desc: "Игровые занятия для активных малышей. Развиваем координацию, равновесие, дыхание и уверенность в воде через весёлые игры с инструктором.",
    icon: Waves,
    category: "children",
    gradient: "from-teal-100 to-cyan-50",
  },
  {
    title: "Детское плавание",
    age: "3–10 лет",
    desc: "Обучение правильным стилям плавания в небольших группах. Дети учатся самостоятельно держаться на воде и постепенно осваивают технику.",
    icon: Waves,
    category: "children",
    gradient: "from-primary/15 to-primary/5",
  },
  {
    title: "Свободное плавание",
    age: "Любой возраст",
    desc: "Время в бассейне для самостоятельной игры и отдыха без структурированных упражнений. Подходит всем, кто хочет просто поплавать.",
    icon: Heart,
    category: "children",
    gradient: "from-emerald-100 to-green-50",
  },
  {
    title: "Аквааэробика",
    age: "Взрослые",
    desc: "Эффективная тренировка в воде для поддержания физической формы. Укрепляет мышцы, улучшает осанку, подходит при проблемах с суставами.",
    icon: Dumbbell,
    category: "adults",
    gradient: "from-violet-100 to-purple-50",
  },
  {
    title: "Ватсу",
    age: "Взрослые",
    desc: "Расслабляющий массаж в тёплой воде. Сочетание акватерапии и шиацу — глубокое расслабление тела и ума, снятие напряжения.",
    icon: Heart,
    category: "adults",
    gradient: "from-rose-100 to-pink-50",
  },
  {
    title: "Оздоровительная гимнастика",
    age: "Взрослые",
    desc: "Занятия в зале для общего укрепления здоровья, улучшения гибкости и тонуса. Мягкая нагрузка, подходит для любого уровня подготовки.",
    icon: Flower,
    category: "adults",
    gradient: "from-orange-100 to-amber-50",
  },
  {
    title: "Аква-йога для будущих мам",
    age: "Беременные",
    desc: "Специальная программа для беременных в бассейне. Снимает нагрузку на спину, укрепляет мышцы для родов, помогает расслабиться.",
    icon: Flower,
    category: "moms",
    gradient: "from-pink-100 to-rose-50",
  },
  {
    title: "Йога для мам с малышами",
    age: "Взрослые + 0–3 года",
    desc: "Совместная практика для мамы и ребёнка в зале. Укрепление тела после родов, расслабление, радостный контакт с малышом.",
    icon: Heart,
    category: "moms",
    gradient: "from-fuchsia-100 to-purple-50",
  },
  {
    title: "Подготовка к родам",
    age: "Беременные",
    desc: "Курс для будущих мам: дыхательные техники, упражнения для подготовки тела, информация о родах и послеродовом восстановлении.",
    icon: Star,
    category: "moms",
    gradient: "from-sky-100 to-indigo-50",
  },
  {
    title: "Творческая мастерская",
    age: "Дети 2+",
    desc: "Рисование, лепка, аппликации и ручной труд в уютном зале. Развиваем творческое мышление, мелкую моторику и художественный вкус.",
    icon: Palette,
    category: "special",
    gradient: "from-yellow-100 to-amber-50",
  },
  {
    title: "Консультации психолога",
    age: "Дети 3+",
    desc: "Индивидуальные и групповые встречи с детским психологом. Поддержка развития, работа с тревожностью, адаптация к детскому саду и школе.",
    icon: Brain,
    category: "special",
    gradient: "from-teal-100 to-emerald-50",
  },
  {
    title: "День рождения в клубе",
    age: "Дети 0+",
    desc: "Незабываемый праздник в формате аквавечеринки или игрового праздника в зале. Организуем программу, угощение и праздничную атмосферу.",
    icon: Gift,
    category: "special",
    gradient: "from-orange-100 to-red-50",
  },
  {
    title: "Няня на час",
    age: "Дети 1+",
    desc: "Присмотр за малышом в нашем клубе, пока вы занимаетесь в бассейне или зале. Безопасное пространство, опытный присмотр.",
    icon: Clock,
    category: "special",
    gradient: "from-lime-100 to-green-50",
  },
];

const TABS: { id: Category; label: string }[] = [
  { id: "children", label: "Для детей" },
  { id: "adults", label: "Для взрослых" },
  { id: "moms", label: "Будущим мамам" },
  { id: "special", label: "Спецпредложения" },
];

export default function Programs() {
  const [active, setActive] = useState<Category>("children");
  const { openModal } = useBookingModal();

  const filtered = PROGRAMS.filter((p) => p.category === active);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-secondary/40 to-background">
        <div className="container px-4 max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-primary/10 text-primary font-semibold text-sm">
              Программы
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
              Найдите программу для вашей семьи
            </h1>
            <p className="text-muted-foreground text-lg">
              Бассейн и зал для детей и взрослых — от рождения до любого возраста
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tabs */}
      <section className="sticky top-16 z-30 bg-background border-b border-border">
        <div className="container px-4">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                data-testid={`tab-${tab.id}`}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all min-h-[44px] ${
                  active === tab.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container px-4 max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((prog, i) => (
              <motion.div
                key={prog.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-background rounded-3xl border border-border shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden"
              >
                <div className={`h-28 bg-gradient-to-br ${prog.gradient} flex items-center justify-center`}>
                  <div className="w-16 h-16 rounded-2xl bg-white/70 backdrop-blur-sm flex items-center justify-center text-primary shadow-sm">
                    <prog.icon className="w-8 h-8" />
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="inline-block px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold mb-3 w-fit">
                    {prog.age}
                  </span>
                  <h3 className="text-lg font-bold mb-2 text-foreground">{prog.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">{prog.desc}</p>
                  <div className="flex gap-2 mt-auto">
                    <Button
                      variant="outline"
                      className="flex-1 rounded-full"
                      onClick={() => openModal(prog.title)}
                      data-testid={`btn-signup-${i}`}
                    >
                      Записаться
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Не знаете, с чего начать?</h2>
          <p className="text-primary-foreground/80 mb-8 text-lg">Запишитесь на пробное занятие — мы поможем выбрать программу</p>
          <Button size="lg" onClick={() => openModal()} className="bg-white text-primary hover:bg-white/90 rounded-full px-10 h-14 text-lg font-semibold">
            Записаться на пробное
          </Button>
        </div>
      </section>
    </div>
  );
}

import React from "react";
import { motion } from "framer-motion";
import { Heart, Users, Waves, Baby, Leaf, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBookingModal } from "@/hooks/use-booking-modal";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const FORMATS = [
  {
    icon: Users,
    title: "Групповые занятия",
    desc: "Небольшие группы для комфортного обучения. До 1 года — max 6 пар, 1–5 лет — max 5 пар, 5+ лет — max 4 ребёнка. Дружеская атмосфера, совместное развитие.",
    color: "from-primary/20 to-primary/5",
  },
  {
    icon: Star,
    title: "Индивидуальные занятия",
    desc: "Персональный подход с тренером. Программа составляется под конкретного ребёнка с учётом его темпа, особенностей и пожеланий семьи.",
    color: "from-accent/20 to-accent/5",
  },
  {
    icon: Waves,
    title: "Свободное плавание",
    desc: "Время в бассейне без структурированных упражнений — для игры, исследования воды и отдыха. Подходит для любого возраста.",
    color: "from-secondary to-secondary/30",
  },
];

const BIRTHLIGHT_STEPS = [
  { num: "01", title: "Врождённые рефлексы", desc: "Малыши рождаются с естественными рефлексами плавания. Мы бережно развиваем их, не подавляя." },
  { num: "02", title: "Эмоциональная связь", desc: "Занятия в паре родитель–ребёнок укрепляют привязанность и доверие через прикосновение и воду." },
  { num: "03", title: "Мягкий ритм", desc: "Никакого давления и форсирования. Каждый шаг — в темпе ребёнка, с радостью и игрой." },
  { num: "04", title: "Осознанное плавание", desc: "Постепенно — от рефлексов к сознательному движению в воде, к уверенности и самостоятельности." },
];

export default function About() {
  const { openModal } = useBookingModal();

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-secondary/40 to-background">
        <div className="container px-4 max-w-4xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-primary/10 text-primary font-semibold text-sm">
              О нас
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Место, где вода становится <span className="text-primary">домом</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Океана — это не просто бассейн. Это семейное пространство, где занятия в воде сочетаются с развивающими активностями на суше и уютом домашней атмосферы.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4 max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeUp}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Вода + суша + уют</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Мы создали клуб, в котором каждая семья чувствует себя желанным гостем. Тёплый бассейн 32–33°C, развивающий зал для занятий на суше, лаунж-зона с чаем — всё под одной крышей.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Наши инструкторы — сертифицированные специалисты по методике Birthlight, влюблённые в своё дело. Для нас важно не просто научить плавать, а создать доверие и радость от воды с самого рождения.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Тепло и безопасно", "Сертифицированные тренеры", "Маленькие группы", "Методика Birthlight"].map((tag) => (
                  <span key={tag} className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { icon: Heart, label: "Доверие", value: "С рождения" },
                { icon: Users, label: "Группы", value: "До 6 пар" },
                { icon: Waves, label: "Температура", value: "32–33°C" },
                { icon: Leaf, label: "Методика", value: "Birthlight" },
              ].map((stat) => (
                <div key={stat.label} className="p-6 rounded-2xl bg-secondary/30 border border-border flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="text-xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Formats */}
      <section className="py-16 md:py-24 bg-secondary/20">
        <div className="container px-4 max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Форматы занятий</h2>
            <p className="text-muted-foreground text-lg">Выберите то, что подходит именно вашей семье</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {FORMATS.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-background border border-border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-primary mb-6`}>
                  <f.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Birthlight */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4 max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-primary/10 text-primary font-semibold text-sm">
              Методика
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Birthlight</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Международная методика бережного плавания, разработанная специально для самых маленьких. Основана на уважении к природе ребёнка и укреплении связи с родителями.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BIRTHLIGHT_STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative p-6 rounded-2xl border border-border bg-background hover:border-primary/30 transition-colors"
              >
                <div className="text-5xl font-black text-primary/10 mb-4 select-none">{step.num}</div>
                <h3 className="font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container px-4 text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl font-bold mb-4">Хотите узнать больше?</h2>
            <p className="text-primary-foreground/80 mb-8 text-lg">Запишитесь на пробное занятие и убедитесь сами</p>
            <Button size="lg" onClick={() => openModal()} className="bg-white text-primary hover:bg-white/90 rounded-full px-10 h-14 text-lg font-semibold">
              Записаться на пробное
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

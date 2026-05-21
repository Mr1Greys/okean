import React from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Waves, Baby, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const ARTICLES = [
  {
    title: "Зачем начинать плавать с рождения: польза грудничкового плавания",
    date: "12 октября 2024",
    excerpt: "Вода — родная стихия для новорождённого. В течение девяти месяцев малыш жил в амниотической жидкости, и поэтому первые месяцы жизни — идеальное время для знакомства с бассейном. Рассказываем, что даёт грудничковое плавание и когда начинать.",
    gradient: "from-sky-200 to-teal-200",
    icon: Baby,
    tag: "Плавание",
    readTime: "5 мин",
  },
  {
    title: "Методика Birthlight: почему мягкий подход работает лучше",
    date: "3 сентября 2024",
    excerpt: "Birthlight — это не просто методика, это целая философия отношения к ребёнку в воде. В основе — уважение к природным ритмам малыша, бережный контакт и развитие через радость. Разбираемся, в чём отличие от традиционных методов.",
    gradient: "from-primary/20 to-cyan-200",
    icon: Heart,
    tag: "Методика",
    readTime: "7 мин",
  },
  {
    title: "Как подготовиться к первому занятию в бассейне",
    date: "18 августа 2024",
    excerpt: "Первый визит в детский бассейн — волнительное событие для всей семьи. Какие справки взять, что надеть, как настроиться и чего ожидать от пробного занятия? Наш администратор отвечает на самые частые вопросы.",
    gradient: "from-blue-200 to-indigo-200",
    icon: Waves,
    tag: "Советы",
    readTime: "4 мин",
  },
  {
    title: "Аква-йога во время беременности: безопасно и полезно",
    date: "5 августа 2024",
    excerpt: "Занятия в воде во время беременности — один из самых мягких и эффективных способов поддержать здоровье. Вода снимает нагрузку со спины, улучшает кровообращение и помогает подготовиться к родам. Отвечаем на вопрос: с какого срока можно?",
    gradient: "from-violet-200 to-purple-200",
    icon: Heart,
    tag: "Беременность",
    readTime: "6 мин",
  },
  {
    title: "Ватсу — когда вода лечит",
    date: "22 июля 2024",
    excerpt: "Watsu (ватсу) — водный шиацу. Практика, при которой инструктор поддерживает вас в воде и выполняет мягкие растяжки и массажные движения. Это не просто приятная процедура — это глубокая работа с телом и нервной системой.",
    gradient: "from-teal-200 to-emerald-200",
    icon: Waves,
    tag: "Взрослые",
    readTime: "5 мин",
  },
  {
    title: "Страх воды у детей: причины и как помочь",
    date: "10 июля 2024",
    excerpt: "Боязнь воды — распространённое явление у малышей. Не стоит форсировать и «учить плавать» через стресс. Наш детский психолог рассказывает о природе страха воды и о том, как мягко и постепенно помочь ребёнку полюбить бассейн.",
    gradient: "from-rose-200 to-pink-200",
    icon: Baby,
    tag: "Психология",
    readTime: "8 мин",
  },
];

export default function Blog() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-secondary/40 to-background">
        <div className="container px-4 max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-primary/10 text-primary font-semibold text-sm">
              Блог
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
              Полезные материалы
            </h1>
            <p className="text-muted-foreground text-lg">
              Статьи, советы и истории от наших инструкторов и специалистов
            </p>
          </motion.div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-12 pb-24 bg-background">
        <div className="container px-4 max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ARTICLES.map((article, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-background rounded-3xl border border-border shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col cursor-pointer group"
                data-testid={`article-card-${i}`}
              >
                {/* Cover */}
                <div className={`h-36 bg-gradient-to-br ${article.gradient} flex items-center justify-center`}>
                  <div className="w-16 h-16 rounded-2xl bg-white/60 flex items-center justify-center text-primary shadow-sm">
                    <article.icon className="w-8 h-8" />
                  </div>
                </div>
                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">{article.tag}</span>
                    <span className="text-xs text-muted-foreground">{article.readTime} чтения</span>
                  </div>
                  <h2 className="font-bold text-foreground text-base leading-snug mb-3 group-hover:text-primary transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5" />
                      {article.date}
                    </div>
                    <button className="flex items-center gap-1 text-primary text-sm font-semibold hover:gap-2 transition-all">
                      Читать <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

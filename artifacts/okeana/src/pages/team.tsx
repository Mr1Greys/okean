import React from "react";
import { motion } from "framer-motion";
import { Award, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBookingModal } from "@/hooks/use-booking-modal";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const TEAM = [
  {
    initials: "АМ",
    name: "Анна Михайлова",
    role: "Инструктор по грудничковому плаванию",
    cert: "Сертификат Birthlight (Великобритания)",
    bio: "Более 8 лет работает с малышами с рождения. Убеждена, что первое знакомство с водой закладывает фундамент здоровья и уверенности ребёнка на всю жизнь.",
    color: "from-sky-400 to-teal-500",
    tags: ["Грудничковое плавание", "Birthlight", "0–3 года"],
  },
  {
    initials: "ОС",
    name: "Ольга Соколова",
    role: "Инструктор по йоге и аквааэробике",
    cert: "Diploma in Yoga & Aqua Fitness",
    bio: "Специалист по аква-йоге для беременных и мам с малышами. Помогает женщинам обрести силу и гармонию через воду на всех этапах материнства.",
    color: "from-violet-400 to-purple-500",
    tags: ["Аква-йога", "Будущие мамы", "Аквааэробика"],
  },
  {
    initials: "ЕК",
    name: "Екатерина Козлова",
    role: "Детский психолог",
    cert: "МГУ, клиническая психология, 2015",
    bio: "Работает с детьми от 3 лет. Специализируется на тревожности, адаптации к детскому саду, развитии эмоционального интеллекта и укреплении детско-родительских отношений.",
    color: "from-rose-400 to-pink-500",
    tags: ["Психология", "Дети 3+", "Консультации"],
  },
  {
    initials: "ДВ",
    name: "Дмитрий Волков",
    role: "Инструктор по детскому плаванию",
    cert: "Мастер спорта по плаванию, Birthlight",
    bio: "Бывший профессиональный пловец, тренирует детей 3–10 лет. Умеет превратить обучение в настоящее приключение, после которого дети ждут следующего занятия.",
    color: "from-emerald-400 to-teal-500",
    tags: ["Детское плавание", "3–10 лет", "Индивидуально"],
  },
  {
    initials: "НР",
    name: "Наталья Романова",
    role: "Инструктор творческой мастерской",
    cert: "МПГУ, педагог дошкольного образования",
    bio: "Педагог с вальдорфским образованием. Верит, что творчество — это язык детства, и создаёт пространство, где каждый ребёнок может выразить себя.",
    color: "from-amber-400 to-orange-500",
    tags: ["Творческая мастерская", "Дети 2+", "Вальдорф"],
  },
  {
    initials: "МА",
    name: "Марина Алексеева",
    role: "Инструктор по ватсу и релаксации",
    cert: "Сертификат WABA Watsu, Швейцария",
    bio: "Практикует водный шиацу-массаж и ватсу более 6 лет. Помогает взрослым найти глубокое расслабление через тёплую воду и мягкое прикосновение.",
    color: "from-cyan-400 to-blue-500",
    tags: ["Ватсу", "Взрослые", "Релаксация"],
  },
];

export default function Team() {
  const { openModal } = useBookingModal();

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-secondary/40 to-background">
        <div className="container px-4 max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-primary/10 text-primary font-semibold text-sm">
              Команда
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
              Люди, которым вы доверяете
            </h1>
            <p className="text-muted-foreground text-lg">
              Сертифицированные специалисты, для которых забота о детях — призвание, а не просто работа
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team cards */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4 max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-background rounded-3xl border border-border shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
                data-testid={`team-card-${i}`}
              >
                {/* Avatar */}
                <div className={`h-36 bg-gradient-to-br ${member.color} flex items-center justify-center`}>
                  <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-3xl font-black text-white">{member.initials}</span>
                  </div>
                </div>
                {/* Info */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-foreground mb-1">{member.name}</h3>
                  <p className="text-primary font-medium text-sm mb-3">{member.role}</p>
                  <div className="flex items-start gap-2 text-xs text-muted-foreground mb-4 bg-secondary/40 rounded-lg p-3">
                    <Award className="w-4 h-4 shrink-0 text-primary mt-0.5" />
                    <span>{member.cert}</span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">{member.bio}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {member.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full rounded-full"
                    onClick={() => openModal()}
                    data-testid={`btn-signup-team-${i}`}
                  >
                    Записаться к специалисту
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-secondary/20">
        <div className="container px-4 max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <Heart className="w-10 h-10 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Наши ценности</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Каждый член нашей команды разделяет главный принцип Океаны: ребёнок развивается в своём темпе, 
              через радость и безопасное исследование. Мы никогда не торопим и не давим — только поддерживаем.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

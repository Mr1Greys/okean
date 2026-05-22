import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { 
  Waves, 
  Droplets, 
  Baby, 
  Heart, 
  Coffee, 
  ArrowRight,
  MapPin,
  Phone,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useBookingModal } from "@/hooks/use-booking-modal";

const ADVANTAGES = [
  { icon: Droplets, title: "Тёплая вода", desc: "Всегда 32–33°C" },
  { icon: Heart, title: "Birthlight", desc: "Мягкий подход" },
  { icon: Baby, title: "Сертифицированные", desc: "инструкторы" },
  { icon: Waves, title: "Приватные", desc: "раздевалки" },
  { icon: Coffee, title: "Лаунж-зона", desc: "с вкусным чаем" },
];

const PROGRAMS = [
  { title: "Грудничковое плавание", age: "0–1 год", desc: "Первое знакомство с водой через мягкие методики и тесный контакт с мамой.", icon: Baby },
  { title: "Раннее плавание", age: "1–3 года", desc: "Игровые занятия для развития координации, дыхания и уверенности в воде.", icon: Droplets },
  { title: "Детское плавание", age: "3–10 лет", desc: "Обучение базовым стилям плавания в поддерживающей и веселой атмосфере.", icon: Waves },
];

const FAQS = [
  { q: "Какие справки нужны для посещения?", a: "Для детей до 1 года — справка от педиатра об отсутствии противопоказаний. Для детей от 1 года — справка на энтеробиоз и яйцеглист. Для взрослого — справка от терапевта или гинеколога (для беременных)." },
  { q: "Как проходит запись на занятия?", a: "Запись осуществляется предварительно через форму на сайте или по телефону. Группы небольшие (до 6 пар), поэтому рекомендуем бронировать место заранее." },
  { q: "Могут ли оба родителя присутствовать?", a: "Один родитель находится в воде с ребенком, второй может комфортно наблюдать за процессом из нашей лаунж-зоны с чашечкой чая." },
  { q: "Какие варианты оплаты есть?", a: "Вы можете оплатить разовое занятие или приобрести абонемент на 4, 8 или 10 занятий. Оплата принимается картой, наличными или по QR-коду на ресепшене." },
];

export default function Home() {
  const { openModal } = useBookingModal();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary/10 to-background">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519682577862-22b62b24e493?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="container mx-auto px-4 relative z-10 text-center flex flex-col items-center max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-primary/10 text-primary font-medium text-sm">
              Безопасно. Тепло. С любовью.
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground max-w-4xl mx-auto leading-tight mb-6">
              Семейный клуб <br/>
              <span className="text-primary">детского плавания</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Подарите вашему малышу радость свободного движения в чистой, тёплой воде. Сертифицированные инструкторы и бережная методика Birthlight.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="w-full sm:w-auto rounded-full text-lg px-8 h-14" onClick={() => openModal()}>
                Записаться
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full text-lg px-8 h-14 bg-background/50 backdrop-blur-sm" asChild>
                <Link href="/programs">Смотреть программы</Link>
              </Button>
            </div>
          </motion.div>
        </div>
        
        {/* Soft wave shape at bottom */}
        <div className="absolute bottom-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-[50px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,123.15,190.79,114.16c58.31-8.77,114.1-26.65,170.6-38.38C327.06,73.19,324.23,65.34,321.39,56.44Z" className="fill-background"></path>
          </svg>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="bg-accent/10 border-y border-accent/20">
        <div className="container mx-auto px-4 py-4 max-w-6xl">
          <p className="text-center text-accent-foreground/80 font-medium">
            ✨ 10% скидка и без вступительного взноса при заключении договора в октябре
          </p>
        </div>
      </section>

      {/* Advantages Strip */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar gap-4 md:grid md:grid-cols-5 md:gap-6 md:pb-0 justify-center">
            {ADVANTAGES.map((adv, i) => (
              <div key={i} className="min-w-[200px] snap-center flex flex-col items-center text-center p-6 rounded-2xl bg-secondary/30">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <adv.icon className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{adv.title}</h3>
                <p className="text-sm text-muted-foreground">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Preview */}
      <section className="py-16 md:py-24 bg-secondary/20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Наши программы</h2>
              <p className="text-muted-foreground max-w-xl">
                Мы предлагаем мягкий подход к плаванию для детей любого возраста и их родителей.
              </p>
            </div>
            <Button variant="ghost" className="hidden md:flex text-primary hover:text-primary/80" asChild>
              <Link href="/programs">Все программы <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PROGRAMS.map((prog, i) => (
              <div key={i} className="bg-background rounded-3xl p-8 border border-border shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <prog.icon className="w-6 h-6" />
                </div>
                <div className="inline-block px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium w-fit mb-4">
                  {prog.age}
                </div>
                <h3 className="text-xl font-bold mb-3">{prog.title}</h3>
                <p className="text-muted-foreground mb-8 flex-1">{prog.desc}</p>
                <div className="mt-auto">
                  <Button variant="outline" className="w-full rounded-full" asChild>
                    <Link href="/programs">Подробнее</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Button variant="ghost" className="text-primary hover:text-primary/80" asChild>
              <Link href="/programs">Все программы <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Частые вопросы</h2>
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left font-semibold text-lg hover:text-primary transition-colors">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-base">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contacts Block */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">Ждём вас в гости</h2>
              
              <div className="space-y-6 mb-12 text-primary-foreground/90">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 shrink-0 text-accent" />
                  <div>
                    <p className="font-semibold text-white">Наш адрес</p>
                    <p>г. Красногорск, ул. Молодёжная, 3<br/>(Павшинская пойма)</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 shrink-0 text-accent" />
                  <div>
                    <p className="font-semibold text-white">Телефон</p>
                    <a href="tel:+79771843409" className="text-xl font-bold text-white hover:text-accent transition-colors">
                      +7 977 184-34-09
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 shrink-0 text-accent" />
                  <div>
                    <p className="font-semibold text-white">Режим работы</p>
                    <p>Ежедневно 9:00–21:00</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="font-bold text-white mb-4">Остались вопросы?</h3>
                <p className="text-primary-foreground/80 mb-6 text-sm">Оставьте свой номер, и наш администратор свяжется с вами.</p>
                <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 rounded-full h-12" onClick={() => openModal()}>
                  Заказать звонок
                </Button>
              </div>
            </div>
            
            <div className="h-[400px] md:h-[500px] rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl bg-white/5">
              <iframe 
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A7a13d7fb8f50c059c25f4fb7d780ef528434e3dcf8a8d11624c940b523c91d84&amp;source=constructor" 
                width="100%" 
                height="100%" 
                frameBorder="0"
                className="w-full h-full filter brightness-95"
                title="Океана на карте"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
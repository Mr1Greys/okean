import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Mail, Send, CheckCircle, Loader2 } from "lucide-react";
import { SiVk, SiInstagram } from "react-icons/si";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { submitLead } from "@/lib/submit-lead";
import { useToast } from "@/hooks/use-toast";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const formSchema = z.object({
  name: z.string().min(2, "Введите имя"),
  phone: z.string().min(10, "Введите корректный телефон"),
  email: z.string().email("Введите корректный email").optional().or(z.literal("")),
  message: z.string().optional(),
});

export default function Contacts() {
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", phone: "", email: "", message: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      await submitLead({
        name: values.name,
        phone: values.phone,
        email: values.email,
        program: "Обратная связь",
        comment: values.message,
        source: "contacts",
      });
      setSuccess(true);
      form.reset();
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Не удалось отправить",
        description: err instanceof Error ? err.message : "Попробуйте позже или позвоните нам",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-secondary/40 to-background">
        <div className="container px-4 max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-primary/10 text-primary font-semibold text-sm">
              Контакты
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
              Ждём вас в Океане
            </h1>
            <p className="text-muted-foreground text-lg">
              Приходите, звоните или пишите — мы всегда рады ответить на ваши вопросы
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact info + Map */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container px-4 max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* Info */}
            <motion.div {...fadeUp} className="space-y-6">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-secondary/30 border border-border">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium mb-1">Телефон</p>
                  <a href="tel:+79771843409" className="text-2xl font-black text-foreground hover:text-primary transition-colors" data-testid="contact-phone">
                    +7 977 184-34-09
                  </a>
                  <p className="text-xs text-muted-foreground mt-1">Нажмите, чтобы позвонить</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-2xl bg-secondary/30 border border-border">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium mb-1">Адрес</p>
                  <p className="font-bold text-foreground leading-snug">г. Красногорск,<br />ул. Молодёжная, 3</p>
                  <p className="text-sm text-muted-foreground mt-1">Павшинская пойма</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-2xl bg-secondary/30 border border-border">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium mb-1">Режим работы</p>
                  <p className="font-bold text-foreground">Ежедневно</p>
                  <p className="text-muted-foreground">9:00 – 21:00</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-2xl bg-secondary/30 border border-border">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium mb-2">Соцсети</p>
                  <div className="flex gap-3">
                    <a href="https://vk.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#4C75A3] text-white text-sm font-semibold hover:opacity-90 transition-opacity min-h-[44px]">
                      <SiVk className="w-4 h-4" />
                      ВКонтакте
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity min-h-[44px]">
                      <SiInstagram className="w-4 h-4" />
                      Instagram
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="h-[380px] md:h-[460px] rounded-3xl overflow-hidden border border-border shadow-md"
            >
              <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A7a13d7fb8f50c059c25f4fb7d780ef528434e3dcf8a8d11624c940b523c91d84&amp;source=constructor"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Расположение Океана"
                className="w-full h-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section className="py-16 md:py-20 bg-secondary/20">
        <div className="container px-4 max-w-lg mx-auto">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl font-bold text-center mb-2">Написать нам</h2>
            <p className="text-muted-foreground text-center mb-10">Ответим в течение рабочего дня</p>

            {success ? (
              <div className="flex flex-col items-center text-center py-12 px-6 rounded-3xl bg-background border border-border">
                <CheckCircle className="w-16 h-16 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-2">Сообщение отправлено!</h3>
                <p className="text-muted-foreground">Мы свяжемся с вами в ближайшее время.</p>
              </div>
            ) : (
              <div className="bg-background rounded-3xl border border-border p-8 shadow-sm">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField control={form.control} name="name" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Имя</FormLabel>
                        <FormControl><Input placeholder="Ваше имя" {...field} data-testid="input-name" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Телефон *</FormLabel>
                        <FormControl><Input type="tel" placeholder="+7 (___) ___-__-__" {...field} data-testid="input-phone" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email (необязательно)</FormLabel>
                        <FormControl><Input type="email" placeholder="ваш@email.com" {...field} data-testid="input-email" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="message" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Сообщение (необязательно)</FormLabel>
                        <FormControl><Textarea placeholder="Ваш вопрос или комментарий..." className="resize-none" rows={4} {...field} data-testid="input-message" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <Button
                      type="submit"
                      className="w-full rounded-full h-12"
                      disabled={isSubmitting}
                      data-testid="btn-submit"
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4 mr-2" />
                      )}
                      {isSubmitting ? "Отправка…" : "Отправить"}
                    </Button>
                  </form>
                </Form>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

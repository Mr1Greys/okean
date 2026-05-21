import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBookingModal } from "@/hooks/use-booking-modal";

const formSchema = z.object({
  name: z.string().min(2, { message: "Введите имя" }),
  phone: z.string().min(10, { message: "Введите корректный номер телефона" }),
  email: z.string().email({ message: "Введите корректный email" }).optional().or(z.literal("")),
  program: z.string().min(1, { message: "Выберите программу" }),
  comment: z.string().optional(),
});

export function BookingModal() {
  const store = useBookingModal();
  const [open, setOpen] = useState(store.isOpen);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    return store.subscribe(() => {
      setOpen(store.isOpen);
      if (store.isOpen) {
        setIsSuccess(false);
        form.reset({
          name: "",
          phone: "",
          email: "",
          program: store.selectedProgram || "Свободное плавание",
          comment: "",
        });
      }
    });
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      program: "",
      comment: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Mock API call
    setTimeout(() => {
      setIsSuccess(true);
    }, 500);
  }

  return (
    <Dialog open={open} onOpenChange={(val) => !val && store.closeModal()}>
      <DialogContent className="sm:max-w-[425px]">
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <DialogTitle className="text-2xl mb-2">Спасибо!</DialogTitle>
            <DialogDescription className="text-base text-center">
              Мы перезвоним вам в течение 10–15 минут для подтверждения записи.
            </DialogDescription>
            <Button className="mt-8" onClick={() => store.closeModal()}>
              Закрыть
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Записаться на занятие</DialogTitle>
              <DialogDescription>
                Оставьте ваши контакты, и мы свяжемся с вами, чтобы подобрать удобное время.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Имя</FormLabel>
                      <FormControl>
                        <Input placeholder="Ваше имя" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Телефон *</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="+7 (___) ___-__-__" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email (необязательно)</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="ваш@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="program"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Программа</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите программу" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Грудничковое плавание">Грудничковое плавание (0-1 год)</SelectItem>
                          <SelectItem value="Раннее плавание">Раннее плавание (1-3 года)</SelectItem>
                          <SelectItem value="Детское плавание">Детское плавание (3-10 лет)</SelectItem>
                          <SelectItem value="Свободное плавание">Свободное плавание</SelectItem>
                          <SelectItem value="Аква-йога для беременных">Аква-йога для беременных</SelectItem>
                          <SelectItem value="Индивидуальное занятие">Индивидуальное занятие</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Комментарий (необязательно)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Возраст ребенка, особые пожелания..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Отправить заявку
                </Button>
              </form>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
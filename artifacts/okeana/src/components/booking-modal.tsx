import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
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
import { useBookingModalContext } from "@/context/booking-modal-context";
import { programOptionsForSelect, resolveLeadProgram } from "@/lib/lead-form";
import { submitLead } from "@/lib/submit-lead";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(2, { message: "Введите имя" }),
  phone: z
    .string()
    .min(10, { message: "Введите корректный номер телефона" })
    .refine((v) => v.replace(/\D/g, "").length >= 10, {
      message: "Введите корректный номер телефона",
    }),
  email: z.string().email({ message: "Введите корректный email" }).optional().or(z.literal("")),
  program: z.string().min(1, { message: "Выберите программу" }),
  comment: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function BookingModal() {
  const { isOpen, selectedProgram, closeModal } = useBookingModalContext();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const programOptions = useMemo(
    () => programOptionsForSelect(selectedProgram),
    [selectedProgram],
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      program: "Не выбрано",
      comment: "",
    },
  });

  useEffect(() => {
    if (!isOpen) return;
    setIsSuccess(false);
    form.reset({
      name: "",
      phone: "",
      email: "",
      program: resolveLeadProgram(selectedProgram),
      comment: "",
    });
  }, [isOpen, selectedProgram, form]);

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    try {
      await submitLead({
        ...values,
        source: "booking",
      });
      setIsSuccess(true);
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
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) closeModal();
      }}
    >
      <DialogContent className="sm:max-w-[440px] max-h-[min(90dvh,720px)] overflow-y-auto">
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
                aria-hidden
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <DialogTitle className="text-2xl mb-2">Спасибо!</DialogTitle>
            <DialogDescription className="text-base text-center">
              Мы перезвоним вам в течение 10–15 минут для подтверждения записи.
            </DialogDescription>
            <Button className="mt-8 rounded-full" type="button" onClick={closeModal}>
              Закрыть
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Записаться на занятие</DialogTitle>
              <DialogDescription>
                Оставьте контакты — администратор свяжется с вами и подберёт удобное время.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Имя *</FormLabel>
                      <FormControl>
                        <Input
                          className="h-12 text-base"
                          placeholder="Ваше имя"
                          autoComplete="name"
                          {...field}
                        />
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
                        <Input
                          type="tel"
                          inputMode="tel"
                          className="h-12 text-base"
                          placeholder="+7 (___) ___-__-__"
                          autoComplete="tel"
                          {...field}
                        />
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
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          className="h-12 text-base"
                          placeholder="ваш@email.com"
                          autoComplete="email"
                          {...field}
                        />
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
                      <FormLabel>Программа *</FormLabel>
                      {isMobile ? (
                        <FormControl>
                          <select
                            className={cn(
                              "flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base",
                              "focus:outline-none focus:ring-1 focus:ring-ring",
                            )}
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                          >
                            {programOptions.map((program) => (
                              <option key={program} value={program}>
                                {program}
                              </option>
                            ))}
                          </select>
                        </FormControl>
                      ) : (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger className="h-12 text-base">
                              <SelectValue placeholder="Выберите программу" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent
                            position="popper"
                            side="bottom"
                            align="start"
                            sideOffset={4}
                            collisionPadding={{ top: 24, bottom: 24, left: 16, right: 16 }}
                            className="max-h-[min(50dvh,16rem)]"
                          >
                            {programOptions.map((program) => (
                              <SelectItem key={program} value={program}>
                                {program}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Комментарий</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Возраст ребёнка, удобное время, пожелания…"
                          className="resize-none text-base min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full h-12 rounded-full text-base"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Отправка…
                    </>
                  ) : (
                    "Отправить заявку"
                  )}
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  Нажимая кнопку, вы соглашаетесь на обработку персональных данных для связи с вами.
                </p>
              </form>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

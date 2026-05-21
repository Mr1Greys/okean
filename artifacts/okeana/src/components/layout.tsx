import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { Droplet, Menu, X, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useBookingModal } from "@/hooks/use-booking-modal";

const NAV_LINKS = [
  { href: "/", label: "Главная" },
  { href: "/about", label: "О клубе" },
  { href: "/programs", label: "Программы" },
  { href: "/prices", label: "Цены" },
  { href: "/schedule", label: "Расписание" },
  { href: "/team", label: "Команда" },
  { href: "/gallery", label: "Галерея" },
  { href: "/blog", label: "Блог" },
  { href: "/contacts", label: "Контакты" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { openModal } = useBookingModal();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-primary font-bold text-xl">
            <Droplet className="w-6 h-6 fill-current" />
            <span>Океана</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location === link.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button onClick={() => openModal()} className="rounded-full">
              Записаться
            </Button>
          </div>

          {/* Mobile Nav Header Items */}
          <div className="md:hidden flex items-center gap-4">
            <a href="tel:+79771843409" className="text-primary p-2">
              <PhoneCall className="w-5 h-5" />
            </a>
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-md p-6 bg-background">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-8">
                    <Link href="/" onClick={closeMenu} className="flex items-center gap-2 text-primary font-bold text-xl">
                      <Droplet className="w-6 h-6 fill-current" />
                      <span>Океана</span>
                    </Link>
                  </div>
                  <nav className="flex flex-col gap-4">
                    {NAV_LINKS.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={closeMenu}
                        className={`text-2xl font-semibold transition-colors hover:text-primary min-h-[48px] flex items-center ${
                          location === link.href ? "text-primary" : "text-foreground"
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                  <div className="mt-auto pb-8">
                    <Button onClick={() => { openModal(); closeMenu(); }} size="lg" className="w-full rounded-full text-lg h-14">
                      Записаться
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t bg-muted/30 py-12 mt-auto">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Океана — Семейный клуб детского плавания.</p>
        </div>
      </footer>

      {/* Floating Mobile CTA */}
      <a
        href="tel:+79771843409"
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors z-40"
        aria-label="Позвонить нам"
      >
        <PhoneCall className="w-6 h-6" />
      </a>
    </div>
  );
}
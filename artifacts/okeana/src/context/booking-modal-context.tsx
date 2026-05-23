import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { BookingModal } from "@/components/booking-modal";

interface BookingModalContextValue {
  isOpen: boolean;
  selectedProgram: string;
  openModal: (program?: string) => void;
  closeModal: () => void;
}

const BookingModalContext = createContext<BookingModalContextValue | null>(null);

export function BookingModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState("");

  const openModal = useCallback((program = "") => {
    setSelectedProgram(program);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = useMemo(
    () => ({ isOpen, selectedProgram, openModal, closeModal }),
    [isOpen, selectedProgram, openModal, closeModal],
  );

  return (
    <BookingModalContext.Provider value={value}>
      {children}
      <BookingModal />
    </BookingModalContext.Provider>
  );
}

export function useBookingModalContext() {
  const ctx = useContext(BookingModalContext);
  if (!ctx) {
    throw new Error("useBookingModal must be used within BookingModalProvider");
  }
  return ctx;
}

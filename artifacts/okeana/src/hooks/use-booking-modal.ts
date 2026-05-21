import { create } from 'zustand';

interface BookingModalStore {
  isOpen: boolean;
  selectedProgram: string;
  openModal: (program?: string) => void;
  closeModal: () => void;
}

// Simple implementation using a global event listener instead of zustand for now to minimize dependencies, or I can just use standard react state with a context, or a simple custom hook with global state since this is a simple app.

// Let's use a simple global state approach
let isOpen = false;
let selectedProgram = "";
const listeners = new Set<() => void>();

export const useBookingModal = () => {
  return {
    isOpen,
    selectedProgram,
    openModal: (program = "") => {
      isOpen = true;
      selectedProgram = program;
      listeners.forEach((l) => l());
    },
    closeModal: () => {
      isOpen = false;
      listeners.forEach((l) => l());
    },
    subscribe: (listener: () => void) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    }
  };
};

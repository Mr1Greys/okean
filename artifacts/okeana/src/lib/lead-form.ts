/** Программы для выбора в форме записи */
export const LEAD_PROGRAM_OPTIONS = [
  "Грудничковое плавание",
  "Раннее плавание",
  "Детское плавание",
  "Свободное плавание",
  "Аква-йога для будущих мам",
  "Аквааэробика",
  "Ватсу",
  "Оздоровительная гимнастика",
  "Йога для мам с малышами",
  "Подготовка к родам",
  "Творческая мастерская",
  "Консультации психолога",
  "День рождения в клубе",
  "Няня на час",
  "Индивидуальное занятие",
  "Не выбрано",
] as const;

export type LeadProgram = (typeof LEAD_PROGRAM_OPTIONS)[number];

export interface LeadFormValues {
  name: string;
  phone: string;
  email?: string;
  program: string;
  comment?: string;
}

const PROGRAM_ALIASES: Record<string, string> = {
  "аква-йога для беременных": "Аква-йога для будущих мам",
  "детское / грудничковое плавание": "Детское плавание",
};

/** Подставляет программу из контекста кнопки в список select */
export function resolveLeadProgram(program?: string): string {
  const raw = program?.trim();
  if (!raw) return "Не выбрано";

  const lower = raw.toLowerCase();
  const alias = PROGRAM_ALIASES[lower];
  if (alias) return alias;

  const exact = LEAD_PROGRAM_OPTIONS.find((p) => p.toLowerCase() === lower);
  if (exact) return exact;

  const partial = LEAD_PROGRAM_OPTIONS.find(
    (p) => lower.includes(p.toLowerCase()) || p.toLowerCase().includes(lower),
  );
  if (partial) return partial;

  return raw;
}

export function programOptionsForSelect(selectedProgram?: string): string[] {
  const resolved = resolveLeadProgram(selectedProgram);
  const base: string[] = [...LEAD_PROGRAM_OPTIONS];
  if (resolved !== "Не выбрано" && !base.includes(resolved)) {
    return [resolved, ...base];
  }
  return base;
}

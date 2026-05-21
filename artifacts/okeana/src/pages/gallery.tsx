import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Waves, Baby, Users, Leaf } from "lucide-react";

const PALETTE = [
  "from-sky-200 to-teal-300",
  "from-primary/30 to-cyan-200",
  "from-blue-200 to-sky-300",
  "from-teal-200 to-emerald-200",
  "from-cyan-200 to-blue-200",
  "from-sky-300 to-teal-200",
  "from-emerald-200 to-teal-300",
  "from-indigo-200 to-sky-200",
  "from-cyan-300 to-teal-200",
  "from-blue-300 to-indigo-200",
  "from-teal-300 to-cyan-200",
  "from-sky-200 to-blue-300",
];

const ICONS = [Waves, Baby, Users, Leaf];

const GALLERY_ITEMS = PALETTE.map((gradient, i) => ({
  id: i,
  gradient,
  Icon: ICONS[i % ICONS.length],
  label: ["Занятия в бассейне", "Малыши в воде", "Групповые занятия", "Зал и мастерская"][i % 4],
  size: [1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1][i],
}));

export default function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-secondary/40 to-background">
        <div className="container px-4 max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-primary/10 text-primary font-semibold text-sm">
              Галерея
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
              Моменты счастья
            </h1>
            <p className="text-muted-foreground text-lg">
              Фотографии занятий, бассейна и атмосферы нашего клуба
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="py-10 pb-20 bg-background">
        <div className="container px-4 max-w-5xl mx-auto">
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
            {GALLERY_ITEMS.map((item, i) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onClick={() => setSelected(item.id)}
                className={`w-full rounded-2xl overflow-hidden cursor-pointer hover:opacity-90 active:opacity-80 transition-opacity break-inside-avoid mb-3 ${item.size === 2 ? "aspect-square" : "aspect-[3/4]"}`}
                data-testid={`gallery-item-${item.id}`}
              >
                <div className={`w-full h-full bg-gradient-to-br ${item.gradient} flex flex-col items-center justify-center gap-3 p-4 min-h-[140px]`}>
                  <item.Icon className="w-8 h-8 text-white/70" />
                  <span className="text-white/60 text-xs text-center font-medium leading-tight">{item.label}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-w-lg w-full rounded-3xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const item = GALLERY_ITEMS[selected];
                if (!item) return null;
                const ItemIcon = item.Icon;
                return (
                  <div className={`w-full aspect-square bg-gradient-to-br ${item.gradient} flex flex-col items-center justify-center gap-4`}>
                    <ItemIcon className="w-16 h-16 text-white/70" />
                    <span className="text-white/60 text-base text-center font-medium">{item.label}</span>
                  </div>
                );
              })()}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

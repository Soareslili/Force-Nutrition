import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function SectionHeading({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <span className="mb-2 block h-1 w-12 rounded-full bg-energy" />
        <h2 className="text-3xl font-bold uppercase text-primary md:text-4xl">{title}</h2>
        {subtitle && <p className="mt-2 max-w-xl text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </motion.div>
  );
}

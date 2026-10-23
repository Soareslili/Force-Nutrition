import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import whey from "../../assets/products/whey.png";
import pre from "../../assets/products/pretreino.png";
import creatina from "../../assets/products/creatina.png";

export function PromotionalBanner() {
  return (
    <section className="py-8">
      <div className="container-store bg-[#0D3220]">
        <div className="relative grid items-center gap-8 overflow-hidden rounded-2xl p-8 md:grid-cols-2 md:p-14">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-energy/20 blur-3xl" />
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative text-primary-foreground">
            <h2 className="text-4xl font-black uppercase leading-none md:text-6xl">Seu próximo nível <span className="text-energy">começa aqui</span></h2>
            <p className="mt-4 max-w-md text-primary-foreground/80">Encontre suplementos para acompanhar sua rotina de treinos.</p>
            <Link to="/produtos" className="mt-8 inline-flex rounded-lg bg-energy px-7 py-4 font-semibold uppercase tracking-wider text-energy-foreground shadow-energy transition hover:-translate-y-0.5">Conhecer Produtos</Link>
          </motion.div>
          <div className="relative flex items-end justify-center gap-2">
            {[creatina, whey, pre].map((src, n) => (
              <motion.img key={n} src={src} alt="Produto FORCE NUTRITION" loading="lazy"
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: n * 0.12 }}
                className={`rounded-xl bg-surface object-contain shadow-lift ${n === 1 ? "w-[42%]" : "w-[30%]"}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
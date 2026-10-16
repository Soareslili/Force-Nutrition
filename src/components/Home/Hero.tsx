import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

// IMAGENS
import h1 from "../../assets/banners/hero1.png";
import h2 from "../../assets/banners/hero2.png";
import h3 from "../../assets/banners/hero3.png";
import h4 from "../../assets/banners/hero4.png";

// TIPAGEM DOS SLIDES
interface Slide {
  img: string;
  title: string;
  desc: string;
  cta: string;
  to: string;
}

// SLIDES DO CARROSSEL
const slides: Slide[] = [
  {
    img: h1,
    title: "Força para ir além",
    desc: "Suplementação para acompanhar sua evolução dentro e fora da academia.",
    cta: "Explorar Produtos",
    to: "/produtos",
  },
  {
    img: h2,
    title: "Eleve sua performance",
    desc: "Encontre os suplementos ideais para seus treinos.",
    cta: "Comprar Agora",
    to: "/mais-vendidos",
  },
  {
    img: h3,
    title: "Nutrição para sua evolução",
    desc: "Proteínas e suplementos para complementar sua rotina.",
    cta: "Conhecer Linha de Proteínas",
    to: "/categoria/whey-protein",
  },
  {
    img: h4,
    title: "Energia para cada conquista",
    desc: "Descubra nossa seleção de produtos para performance.",
    cta: "Ver Lançamentos",
    to: "/lancamentos",
  },
];

export function HeroCarousel() {
  // ESTADOS
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  // FUNÇÃO PARA TROCAR OS SLIDES
  const goToSlide = useCallback(
    (index: number, dir: number) => {
      setDirection(dir);

      setCurrentIndex(
        (index + slides.length) % slides.length
      );
    },
    []
  );

  // TROCA AUTOMÁTICA A CADA 5 SEGUNDOS
  useEffect(() => {
    if (paused) return;

    const timer = setTimeout(() => {
      goToSlide(currentIndex + 1, 1);
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentIndex, paused, goToSlide]);

  // SLIDE ATUAL
  const currentSlide = slides[currentIndex];

  return (
    <section
      className="relative h-[520px] overflow-hidden bg-ink md:h-[600px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carrossel"
      aria-label="Destaques FORCE Nutrition"
    >
      {/* SLIDES */}

      <AnimatePresence initial={false} custom={direction} mode="sync">
        <motion.div
          key={currentIndex}
          custom={direction}
          initial={{
            opacity: 0,
            x: direction * 60,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          exit={{
            opacity: 0,
            x: -direction * 60,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          drag="x"
          dragConstraints={{
            left: 0,
            right: 0,
          }}
          dragElastic={0.2}
          onDragEnd={(_, info) => {
            if (info.offset.x < -60) {
              goToSlide(currentIndex + 1, 1);
            } else if (info.offset.x > 60) {
              goToSlide(currentIndex - 1, -1);
            }
          }}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
        >
          {/* IMAGEM DO BANNER */}

          <img
            src={currentSlide.img}
            alt={currentSlide.title}
            draggable={false}
            width={1920}
            height={832}
            loading={currentIndex === 0 ? "eager" : "lazy"}
            className="absolute inset-0 h-full w-full object-cover object-[70%_center]"
          />

          {/* GRADIENTE SOBRE A IMAGEM */}

          <div className="absolute inset-0 bg-hero-fade" />

          {/* CONTEÚDO DO BANNER */}

          <div className="container-store relative flex h-full items-center">
            <div className="max-w-xl text-primary-foreground">

              {/* NOME DA MARCA */}

              <motion.span
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.2,
                }}
                className="mb-4 inline-block rounded-full bg-energy/20 px-3 py-1 text-xs font-bold tracking-widest text-energy"
              >
                FORCE NUTRITION
              </motion.span>

              {/* TÍTULO */}

              <motion.h1
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.3,
                }}
                className="text-4xl font-black uppercase leading-[0.95] sm:text-5xl md:text-7xl"
              >
                {currentSlide.title}
              </motion.h1>

              {/* DESCRIÇÃO */}

              <motion.p
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.45,
                }}
                className="mt-5 max-w-lg text-base text-primary-foreground/85 md:text-lg"
              >
                {currentSlide.desc}
              </motion.p>

              {/* BOTÃO */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.6,
                }}
              >
                <Link
                  to={currentSlide.to}
                  className="mt-8 inline-flex min-h-13 items-center justify-center rounded-lg bg-energy px-7 py-4 text-sm font-semibold uppercase tracking-wider text-energy-foreground shadow-energy transition duration-300 hover:-translate-y-0.5 hover:brightness-110"
                >
                  {currentSlide.cta}
                </Link>
              </motion.div>

            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* SETA ANTERIOR */}

      <button
        type="button"
        onClick={() => goToSlide(currentIndex - 1, -1)}
        aria-label="Slide anterior"
        className="absolute left-4 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-primary-foreground/15 text-primary-foreground backdrop-blur transition duration-300 hover:bg-energy hover:text-energy-foreground md:grid"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      {/* PRÓXIMA SETA */}

      <button
        type="button"
        onClick={() => goToSlide(currentIndex + 1, 1)}
        aria-label="Próximo slide"
        className="absolute right-4 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-primary-foreground/15 text-primary-foreground backdrop-blur transition duration-300 hover:bg-energy hover:text-energy-foreground md:grid"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* INDICADORES DO CARROSSEL */}

      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            onClick={() =>
              goToSlide(
                index,
                index > currentIndex ? 1 : -1
              )
            }
            aria-label={`Ir para slide ${index + 1}`}
            aria-current={index === currentIndex ? "true" : undefined}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-8 bg-energy"
                : "w-2 bg-primary-foreground/50 hover:bg-primary-foreground"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export default HeroCarousel;
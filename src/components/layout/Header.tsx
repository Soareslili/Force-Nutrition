import { useState, useEffect, type FormEvent } from "react";

import {
  Menu,
  Search,
  ShieldCheck,
  ShoppingBag,
  Tag,
  Truck,
  User,
  X,
  ChevronDown,
} from "lucide-react";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";

import { useCart } from "../Contexts/CartContext";

const nav = [
  { to: "/", label: "Início" },
  { to: "/products", label: "Produtos" },
  { to: "/mais-vendidos", label: "Mais Vendidos" },
  { to: "/lancamentos", label: "Lançamentos" },
  { to: "/sobre", label: "Sobre Nós" },
  { to: "/contato", label: "Contato" },
];

const categories = [
  { name: "Whey Protein", slug: "whey-protein" },
  { name: "Creatina", slug: "creatina" },
  { name: "Pré-Treino", slug: "pre-treino" },
  { name: "Vitaminas", slug: "vitaminas" },
  { name: "Hipercalóricos", slug: "hipercaloricos" },
  { name: "Acessórios", slug: "acessorios" },
];

function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-2"
      aria-label="Force Nutrition - Início"
    >
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-energy font-display text-2xl font-black italic text-energy-foreground">
        F
      </span>

      <span className="font-display text-xl font-extrabold uppercase leading-none tracking-wide text-primary">
        Force

        <span className="block text-[10px] font-semibold tracking-[0.35em] text-leaf">
          Nutrition
        </span>
      </span>
    </Link>
  );
}

export default function Header() {
  const { totalItems, openCart } = useCart();

  const location = useLocation();
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

 

 const handleSearch = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const q = query.trim();

  navigate(q ? `/produtos?q=${encodeURIComponent(q)}` : "/produtos");

  setSearchOpen(false);
  setMobileOpen(false);
};

  return (
    <header
      className={`sticky top-0 z-50 bg-background transition-shadow duration-300 ${
        scrolled ? "shadow-soft" : ""
      }`}
    >
      {/* BARRA SUPERIOR */}

      <div className="bg-primary text-primary-foreground">
        <div className="container-store flex h-9 items-center justify-center gap-8 overflow-hidden text-[11px] font-semibold tracking-widest">

          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <Truck className="h-3.5 w-3.5 text-energy" />
            FRETE GRÁTIS ACIMA DE R$199
          </span>

          <span className="hidden items-center gap-1.5 whitespace-nowrap sm:flex">
            <Tag className="h-3.5 w-3.5 text-energy" />
            10% OFF NA PRIMEIRA COMPRA
          </span>

          <span className="hidden items-center gap-1.5 whitespace-nowrap md:flex">
            <ShieldCheck className="h-3.5 w-3.5 text-energy" />
            COMPRA 100% SEGURA
          </span>

        </div>
      </div>

      {/* HEADER PRINCIPAL */}

      <div className="border-b border-border bg-card/95 backdrop-blur-md">

        <div className="container-store flex h-16 items-center justify-around gap-4">

          {/* LOGO */}

          <div className="flex shrink-0 items-center gap-2">

            <button
              onClick={() => setMobileOpen(true)}
              className="rounded-lg p-2 transition hover:bg-surface lg:hidden"
              aria-label="Abrir menu"
            >
              <Menu className="h-6 w-6" />
            </button>

            <Logo />

          </div>

          {/* NAVEGAÇÃO DESKTOP */}

          <nav className="hidden items-center gap-5 xl:gap-6 lg:flex">

            {nav.slice(0, 2).map((item) => (

              <Link
                key={item.to}
                to={item.to}
                className={`whitespace-nowrap text-xs font-semibold uppercase tracking-wide transition-colors xl:text-sm ${
                  location.pathname === item.to
                    ? "text-leaf"
                    : "text-foreground hover:text-leaf"
                }`}
              >
                {item.label}
              </Link>

            ))}

            {/* DROPDOWN CATEGORIAS */}

            <div
              className="relative"
              onMouseEnter={() => setCatOpen(true)}
              onMouseLeave={() => setCatOpen(false)}
            >

              <button
                onClick={() => setCatOpen(!catOpen)}
                aria-expanded={catOpen}
                className="flex items-center gap-1 whitespace-nowrap text-xs font-semibold cursor-pointer uppercase tracking-wide transition-colors hover:text-leaf xl:text-sm"
              >
                Categorias

                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${
                    catOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>

                {catOpen && (

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-4"
                  >

                    <div className="rounded-xl border border-border bg-card p-3 shadow-lift">

                      {categories.map((category) => (

                        <Link
                          key={category.slug}
                          to={`/categoria/${category.slug}`}
                          onClick={() => setCatOpen(false)}
                          className="block rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-surface hover:text-leaf"
                        >
                          {category.name}
                        </Link>

                      ))}

                    </div>

                  </motion.div>

                )}

              </AnimatePresence>

            </div>

            {nav.slice(2).map((item) => (

              <Link
                key={item.to}
                to={item.to}
                className={`whitespace-nowrap text-xs font-semibold uppercase tracking-wide transition-colors xl:text-sm ${
                  location.pathname === item.to
                    ? "text-leaf"
                    : "text-foreground hover:text-leaf"
                }`}
              >
                {item.label}
              </Link>

            ))}

          </nav>

          {/* ÍCONES */}

          <div className="flex shrink-0 items-center gap-1">

            {/* PESQUISA */}

            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="rounded-full p-2 transition-colors hover:bg-surface"
              aria-label="Pesquisar produtos"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* USUÁRIO */}

            <Link
              to="/account"
              className="hidden rounded-full p-2 transition-colors hover:bg-surface sm:block"
              aria-label="Minha conta"
            >
              <User className="h-5 w-5" />
            </Link>

            {/* CARRINHO */}

            <button
              onClick={openCart}
              className="relative rounded-full p-2 transition-colors hover:bg-surface"
              aria-label={`Carrinho com ${totalItems} itens`}
            >

              <ShoppingBag className="h-5 w-5" />

              <AnimatePresence>

                {totalItems > 0 && (

                  <motion.span
                    key={totalItems}
                    initial={{ scale: 0.4 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.4 }}
                    className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-energy px-1 text-[10px] font-bold text-energy-foreground"
                  >
                    {totalItems}
                  </motion.span>

                )}

              </AnimatePresence>

            </button>

          </div>

        </div>

        {/* CAMPO DE PESQUISA */}

        <AnimatePresence>

          {searchOpen && (

            <motion.form
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onSubmit={handleSearch}
              className="overflow-hidden border-t border-border"
            >

              <div className="container-store flex items-center gap-2 py-3">

                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar whey, creatina, pré-treino..."
                  aria-label="Pesquisar produtos"
                  className="h-11 min-w-0 flex-1 rounded-lg border border-border bg-background px-4 text-sm outline-none focus:border-leaf"
                />

                <button
                  type="submit"
                  className="h-11 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-leaf"
                >
                  Buscar
                </button>

              </div>

            </motion.form>

          )}

        </AnimatePresence>

      </div>

      {/* MENU MOBILE */}

      <AnimatePresence>

        {mobileOpen && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/50 lg:hidden"
            onClick={() => setMobileOpen(false)}
          >

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="fixed left-0 top-0 flex h-dvh w-[85%] max-w-sm flex-col overflow-y-auto bg-card p-6 shadow-lift"
            >

              {/* TOPO MOBILE */}

              <div className="mb-8 flex items-center justify-between">

                <Logo />

                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Fechar menu"
                  className="rounded-full p-2 hover:bg-surface"
                >
                  <X className="h-6 w-6" />
                </button>

              </div>

              {/* PESQUISA MOBILE */}

              <form onSubmit={handleSearch} className="mb-6">

                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar produtos..."
                  aria-label="Pesquisar produtos"
                  className="h-11 w-full rounded-lg border border-border bg-background px-4 text-sm outline-none focus:border-leaf"
                />

              </form>

              {/* LINKS */}

              <nav className="flex flex-col gap-1">

                {nav.map((item) => (

                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-3 py-3 text-sm font-semibold uppercase transition-colors hover:bg-surface hover:text-leaf"
                  >
                    {item.label}
                  </Link>

                ))}

              </nav>

              {/* CATEGORIAS MOBILE */}

              <p className="mb-3 mt-8 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Categorias
              </p>

              <div className="grid grid-cols-2 gap-2">

                {categories.map((category) => (

                  <Link
                    key={category.slug}
                    to={`/categoria/${category.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg bg-surface p-3 text-sm font-medium transition-colors hover:bg-accent"
                  >
                    {category.name}
                  </Link>

                ))}

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </header>
  );
}
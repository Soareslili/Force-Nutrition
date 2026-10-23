import { useEffect, useState } from "react";
import { Route, Routes, useParams } from "react-router-dom";

// Layout
import Header from "./components/layout/Header";

// Componentes da Home
import Hero from "./components/Home/Hero";
import { CategoryCard } from "./components/Home/CategoryCard";
import { PromotionalBanner } from "./components/Home/PromotionalBanner";
import { Newsletter } from "./components/Home/Newsletter";

// Componentes de UI
import { SectionHeading } from "./components/ui/SectionHeading";

// Produtos
import { Products } from "./components/service/ProductCar";
import { getProducts } from "./components/service/ProductService";

// Categorias
import {
  categories,
  getCategory,
} from "./components/Contexts/Categories";

// Types
import type { Product } from "./types/products";

// ======================================================
// PÁGINA INICIAL
// ======================================================

function Home() {
  return (
    <>
      {/* HERO */}
      <Hero />

      {/* CATEGORIAS */}
      <section className="container-store mx-auto px-5 py-16 md:px-8">
        <SectionHeading
          title="Encontre o suplemento ideal"
          subtitle="Explore nossas categorias e descubra os produtos para acompanhar seus objetivos."
        />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {categories.map((category) => (
            <CategoryCard
              key={category.slug}
              category={category}
            />
          ))}
        </div>
      </section>

      {/* BANNER PROMOCIONAL E NEWSLETTER */}
      <section className="container-store mx-auto px-5 py-16 md:px-8">
        <PromotionalBanner />
        <Newsletter />
      </section>
    </>
  );
}

// ======================================================
// INTERFACES
// ======================================================

interface ProductPageProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  loading: boolean;
}

// ======================================================
// PÁGINA DE TODOS OS PRODUTOS
// ======================================================

function ProductsPage({
  products,
  onProductClick,
  loading,
}: ProductPageProps) {
  return (
    <section className="min-h-screen bg-[#F8FAF7]">
      <div className="container-custom mx-auto px-5 pt-12 md:px-8">
        <h1 className="text-3xl font-extrabold uppercase text-[#103F2B] md:text-4xl">
          Produtos
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Todos os suplementos para acompanhar sua evolução.
        </p>
      </div>

      {loading ? (
        <div className="py-20 text-center text-gray-500">
          Carregando produtos...
        </div>
      ) : products.length > 0 ? (
        <Products
          products={products}
          onProductClick={onProductClick}
          showViewAll
        />
      ) : (
        <div className="py-20 text-center text-gray-500">
          Nenhum produto disponível no momento.
        </div>
      )}
    </section>
  );
}

// ======================================================
// PÁGINA DE PRODUTOS POR CATEGORIA
// ======================================================

function CategoryProducts({
  products,
  onProductClick,
  loading,
}: ProductPageProps) {
  const { slug } = useParams<{ slug: string }>();

  // Busca as informações da categoria
  const category = slug ? getCategory(slug) : undefined;

  // Filtra os produtos pela categoria selecionada
  const categoryProducts = products.filter(
    (product) => product.category === slug
  );

  // Categoria inexistente
  if (!category) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center bg-[#F8FAF7] px-5">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#103F2B]">
            Categoria não encontrada
          </h1>

          <p className="mt-3 text-gray-500">
            A categoria selecionada não está disponível.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#F8FAF7]">
      {/* CABEÇALHO DA CATEGORIA */}
      <div className="container-custom mx-auto px-5 pt-12 md:px-8">
        <h1 className="text-3xl font-extrabold uppercase text-[#103F2B] md:text-4xl">
          {category.name}
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          {category.description}
        </p>

        {!loading && (
          <p className="mt-4 text-xs text-gray-400">
            {categoryProducts.length}{" "}
            {categoryProducts.length === 1
              ? "produto encontrado"
              : "produtos encontrados"}
          </p>
        )}
      </div>

      {/* PRODUTOS DA CATEGORIA */}
      {loading ? (
        <div className="py-20 text-center text-gray-500">
          Carregando produtos...
        </div>
      ) : categoryProducts.length > 0 ? (
        <Products
          products={categoryProducts}
          onProductClick={onProductClick}
          showViewAll
        />
      ) : (
        <div className="py-20 text-center text-gray-500">
          Nenhum produto encontrado nesta categoria.
        </div>
      )}
    </section>
  );
}

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

function App() {
  // Estado dos produtos
  const [products, setProducts] = useState<Product[]>([]);

  // Estado de carregamento
  const [loading, setLoading] = useState<boolean>(true);

  // Estado de erro
  const [error, setError] = useState<string | null>(null);

  // ====================================================
  // CARREGAMENTO DOS PRODUTOS
  // ====================================================

  useEffect(() => {
    let active = true;

    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getProducts();

        if (!active) return;

        setProducts(data);

        console.log("Produtos carregados:", data);
      } catch (error) {
        if (!active) return;

        console.error("Erro ao carregar produtos:", error);

        setError(
          "Não foi possível carregar os produtos. Tente novamente mais tarde."
        );
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      active = false;
    };
  }, []);

  // ====================================================
  // CLIQUE NO PRODUTO
  // ====================================================

  const handleProductClick = (product: Product) => {
    console.log("Produto selecionado:", product);
  };

  // ====================================================
  // RENDERIZAÇÃO
  // ====================================================

  return (
    <div className="flex min-h-screen flex-col">
      {/* HEADER */}
      <Header />

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-1">
        {error ? (
          <div className="mx-auto max-w-2xl px-5 py-20 text-center">
            <h2 className="text-xl font-bold text-red-600">
              Erro ao carregar produtos
            </h2>

            <p className="mt-3 text-gray-500">
              {error}
            </p>
          </div>
        ) : (
          <Routes>
            {/* HOME */}
            <Route
              path="/"
              element={<Home />}
            />

            {/* TODOS OS PRODUTOS */}
            <Route
              path="/products"
              element={
                <ProductsPage
                  products={products}
                  onProductClick={handleProductClick}
                  loading={loading}
                />
              }
            />

            {/* COMPATIBILIDADE COM /PRODUTOS */}
            <Route
              path="/produtos"
              element={
                <ProductsPage
                  products={products}
                  onProductClick={handleProductClick}
                  loading={loading}
                />
              }
            />

            {/* PRODUTOS POR CATEGORIA */}
            <Route
              path="/categoria/:slug"
              element={
                <CategoryProducts
                  products={products}
                  onProductClick={handleProductClick}
                  loading={loading}
                />
              }
            />

            {/* PÁGINA NÃO ENCONTRADA */}
            <Route
              path="*"
              element={
                <section className="flex min-h-[60vh] items-center justify-center px-5">
                  <div className="text-center">
                    <h1 className="text-3xl font-bold text-[#103F2B]">
                      Página não encontrada
                    </h1>

                    <p className="mt-3 text-gray-500">
                      A página que você procura não existe.
                    </p>
                  </div>
                </section>
              }
            />
          </Routes>
        )}
      </main>
    </div>
  );
}

export default App;
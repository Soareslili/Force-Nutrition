import { useState } from "react";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useCart } from "../Contexts/CartContext";
import type { Product } from "../../types/products";

interface ProductProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  showViewAll?: boolean;
}

export function Products({
  products,
  onProductClick,
  showViewAll = false,
}: ProductProps) {
  const { addItem } = useCart();

  const [favorites, setFavorites] = useState<string[]>([]);

  // Adicionar ou remover favoritos
  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  // Formatar valores em reais
  const formatPrice = (price: number) =>
    price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  // Exibir quatro produtos ou todos
  const displayed = showViewAll
    ? products
    : products.slice(0, 4);

  // Configurações dos selos
  const badgeConfig = {
    "mais-vendido": {
      label: "MAIS VENDIDO",
      className: "bg-[#063D29] text-white",
    },
    oferta: {
      label: "OFERTA",
      className: "bg-red-600 text-white",
    },
    lancamento: {
      label: "LANÇAMENTO",
      className: "bg-[#91C83E] text-[#123B29]",
    },
  };

  return (
    <section
      id="products"
      className="bg-[#F8FAF7] py-16 md:py-20"
    >
      <div className="container-custom mx-auto px-5 md:px-8">

        {/* GRID DE PRODUTOS */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {displayed.map((product, index) => {
            const productId = String(product.productId);

            const isFavorite = favorites.includes(productId);

            const oldPrice = product.oldPrice;

            // Calcular desconto
            const discount =
              oldPrice !== undefined &&
              oldPrice > product.price
                ? Math.round(
                    ((oldPrice - product.price) / oldPrice) * 100
                  )
                : 0;

            // Parcelamento
            const installment = product.price / 6;

            // Verificar estoque
            const isOutOfStock =
              product.stock !== undefined &&
              product.stock <= 0;

            // Avaliações
            const rating = Math.max(
              0,
              Math.min(5, product.rating ?? 0)
            );

            const reviews = product.reviews ?? 0;

            // Selo
            const badge = product.badge
              ? badgeConfig[product.badge]
              : null;

            return (
              <article
                key={product.productId}
                onClick={() => onProductClick(product)}
                data-aos="zoom-in"
                data-aos-delay={index * 80}
                data-aos-duration="800"
                className="
                  group
                  flex flex-col
                  overflow-hidden
                  rounded-xl
                  border border-[#E0E7DF]
                  bg-white
                  cursor-pointer
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:shadow-xl
                "
              >

                {/* IMAGEM DO PRODUTO */}
                <div className="relative overflow-hidden bg-[#F3F5F1]">

                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    loading="lazy"
                    className="
                      aspect-square
                      w-full
                      object-contain
                      transition-transform duration-500
                      group-hover:scale-105
                    "
                  />

                  {/* SELO */}
                  {badge && (
                    <span
                      className={`
                        absolute left-3 top-3
                        rounded-full
                        px-2.5 py-1
                        text-[9px]
                        font-bold
                        ${badge.className}
                      `}
                    >
                      {badge.label}
                    </span>
                  )}

                  {/* FAVORITOS */}
                  <button
                    type="button"
                    aria-label={
                      isFavorite
                        ? "Remover dos favoritos"
                        : "Adicionar aos favoritos"
                    }
                    aria-pressed={isFavorite}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(productId);
                    }}
                    className="
                      absolute right-3 top-3
                      flex h-9 w-9
                      items-center justify-center
                      rounded-full
                      bg-white
                      shadow-sm
                      transition-all duration-300
                      hover:scale-110
                    "
                  >
                    <Heart
                      size={17}
                      className={
                        isFavorite
                          ? "fill-red-500 text-red-500"
                          : "text-[#263B30]"
                      }
                    />
                  </button>
                </div>

                {/* INFORMAÇÕES DO PRODUTO */}
                <div className="flex flex-1 flex-col p-4">

                  {/* CATEGORIA */}
                  <span
                    className="
                      mb-1
                      text-[10px]
                      font-medium
                      uppercase
                      tracking-wide
                      text-[#3E7954]
                    "
                  >
                    {product.category.replaceAll("-", " ")}
                  </span>

                  {/* NOME */}
                  <h3
                    className="
                      mb-2
                      min-h-[40px]
                      text-sm
                      font-bold
                      uppercase
                      leading-5
                      text-[#163D2C]
                    "
                  >
                    {product.name}
                  </h3>

                  {/* AVALIAÇÕES */}
                  <div className="mb-3 flex items-center gap-1">

                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={13}
                        className={
                          i < Math.round(rating)
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-300"
                        }
                      />
                    ))}

                    {reviews > 0 && (
                      <span className="ml-1 text-[11px] text-gray-500">
                        ({reviews})
                      </span>
                    )}
                  </div>

                  {/* PREÇOS */}
                  <div className="mt-auto">

                    {/* PREÇO ANTERIOR E DESCONTO */}
                    {oldPrice !== undefined &&
                      oldPrice > product.price && (
                        <div className="mb-1 flex items-center gap-2">

                          <span className="text-xs text-gray-400 line-through">
                            {formatPrice(oldPrice)}
                          </span>

                          <span className="text-xs font-semibold text-red-600">
                            -{discount}%
                          </span>

                        </div>
                      )}

                    {/* PREÇO ATUAL */}
                    <p
                      className="
                        text-xl
                        font-extrabold
                        text-[#063D29]
                      "
                    >
                      {formatPrice(product.price)}
                    </p>

                    {/* PARCELAMENTO */}
                    <p className="mb-4 text-[11px] text-gray-500">
                      6x de {formatPrice(installment)} sem juros
                    </p>

                    {/* BOTÃO ADICIONAR */}
                    <button
                      type="button"
                      disabled={isOutOfStock}
                      onClick={(e) => {
                        e.stopPropagation();

                        if (isOutOfStock) return;

                        addItem({
                          id: productId,
                          name: product.name,
                          price: product.price,
                          image: product.imageUrl ?? "",
                        });
                      }}
                      className={`
                        flex w-full
                        items-center justify-center
                        gap-2
                        rounded-lg
                        px-4 py-3
                        text-xs
                        font-bold
                        uppercase
                        transition-all duration-300
                        ${
                          isOutOfStock
                            ? "cursor-not-allowed bg-gray-100 text-gray-500"
                            : "bg-[#103F2B] text-white hover:bg-[#91C83E] hover:text-[#103F2B] active:scale-95"
                        }
                      `}
                    >
                      <ShoppingBag size={15} />

                      {isOutOfStock ? "Esgotado" : "Adicionar"}
                    </button>

                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
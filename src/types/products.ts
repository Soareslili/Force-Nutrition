export type CategorySlug =
  | "whey-protein"
  | "creatina"
  | "pre-treino"
  | "hipercaloricos"
  | "vitaminas"
  | "aminoacidos"
  | "termogenicos"
  | "acessorios";

export type Category = {
  slug: CategorySlug;
  name: string;
  imageUrl: string;
  description: string;
};

export type Product = {
  productId: number;
  name: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  description: string;
  category: CategorySlug;
  imageUrl: string;
  rating?: number;
  reviews?: number;
  stock?: number;
  badge?: "mais-vendido" | "oferta" | "lancamento";
};
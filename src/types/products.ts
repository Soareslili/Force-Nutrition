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
  description: string;
  category: CategorySlug;
  imageUrl: string;
};
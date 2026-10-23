import whey from "../../assets/products/whey.png";
import creatina from "../../assets/products/creatina.png";
import pre from "../../assets/products/pretreino.png";
import hiper from "../../assets/products/hiper.png";
import vit from "../../assets/products/vitaminas.png";
import amino from "../../assets/products/aminoacidos.png";
import thermo from "../../assets/products/termogenico.png";
import shaker from "../../assets/products/shaker.png";
import type { Category } from "../../types/products";

export const categories: Category[] = [
  { slug: "whey-protein", name: "Whey Protein", imageUrl: whey, description: "Proteínas para complementar sua alimentação diária." },
  { slug: "creatina", name: "Creatina", imageUrl: creatina, description: "Creatinas puras para a sua rotina de treinos." },
  { slug: "pre-treino", name: "Pré-Treino", imageUrl: pre, description: "Fórmulas para começar o treino com disposição." },
  { slug: "hipercaloricos", name: "Hipercalóricos", imageUrl: hiper, description: "Mais calorias para quem precisa de aporte extra." },
  { slug: "vitaminas", name: "Vitaminas", imageUrl: vit, description: "Vitaminas e minerais para o dia a dia." },
  { slug: "aminoacidos", name: "Aminoácidos", imageUrl: amino, description: "BCAA e aminoácidos para sua rotina." },
  { slug: "termogenicos", name: "Termogênicos", imageUrl: thermo, description: "Fórmulas com cafeína para seus dias ativos." },
  { slug: "acessorios", name: "Acessórios", imageUrl: shaker, description: "Shakers e itens para levar ao treino." },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);

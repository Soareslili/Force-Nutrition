import { Link } from "react-router-dom";
import type { Category } from "../../types/products";

type CategoryCardProps = {
  category: Category;
};

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      to={`/categoria/${category.slug}`}
      className="group flex flex-col items-center gap-3 text-center"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-full border-4 border-card bg-surface shadow-soft transition group-hover:border-energy group-hover:shadow-lift">
        <img
          src={category.imageUrl}
          alt={category.name}
          loading="lazy"
          className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <span className="font-display text-base font-bold uppercase tracking-wide group-hover:text-leaf">
        {category.name}
      </span>
    </Link>
  );
}
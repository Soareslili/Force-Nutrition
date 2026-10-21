import { Route, Routes } from "react-router-dom";

import Header from "./components/layout/Header";
import Hero from "./components/Home/Hero";
import { CategoryCard } from "./components/Home/CategoryCard";
import { SectionHeading } from "./components/ui/SectionHeading";

import { categories } from "./data/Categories";

function Home() {
  return (
    <>
      {/* Hero */}
      <Hero />

      {/* Categorias */}
      <section className="container-store py-16 ml-12">
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
    </>
  );
}

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
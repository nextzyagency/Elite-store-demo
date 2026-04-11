import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { addToCart, isCartOpen, selectedProduct } from '../store/cartStore';
import type { Product } from '../store/cartStore';

gsap.registerPlugin(ScrollTrigger);

interface ProductGridProps {
  productos: Product[];
}

const PRICE_RANGES = [
  { label: 'Todos los precios', min: 0, max: Infinity },
  { label: 'Hasta €500', min: 0, max: 500 },
  { label: '€500 – €1.500', min: 500, max: 1500 },
  { label: 'Más de €1.500', min: 1500, max: Infinity },
];

export default function ProductGrid({ productos }: ProductGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [priceRangeIdx, setPriceRangeIdx] = useState(0);
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');
  const gridRef = useRef<HTMLDivElement>(null);

  const categories = ['all', ...new Set(productos.map(p => p.category))];
  const priceRange = PRICE_RANGES[priceRangeIdx];

  const filtered = productos
    .filter(p => {
      const matchCat = activeCategory === 'all' || p.category === activeCategory;
      const matchPrice = p.price >= priceRange.min && p.price <= priceRange.max;
      return matchCat && matchPrice;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });

  // GSAP ScrollTrigger on cards whenever filtered changes
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll<HTMLElement>('.product-card');
    if (!cards.length) return;

    gsap.set(cards, { opacity: 0, y: 30 });

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: i * 0.06,
          ease: 'power3.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: card,
            start: 'top 92%',
            once: true,
          },
        });
      });
    }, gridRef);

    return () => ctx.revert();
  }, [filtered.length, activeCategory, priceRangeIdx, sortBy]);

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    const hasVariants =
      product.variantes && product.variantes.length > 0;
    if (hasVariants) {
      selectedProduct.set(product);
    } else {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      });
      isCartOpen.set(true);
    }
  };

  const handleImageClick = (product: Product) => {
    selectedProduct.set(product);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12" id="productos">
      {/* Sidebar Filters */}
      <aside className="lg:w-56 flex-shrink-0">
        <div className="lg:sticky lg:top-28 space-y-8">
          {/* Categories */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-400 mb-4">
              Categoría
            </h3>
            <div className="flex flex-wrap lg:flex-col gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  id={`filter-cat-${cat}`}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-left px-4 py-2 text-sm border elite-transition capitalize ${
                    activeCategory === cat
                      ? 'bg-neutral-900 text-white border-neutral-900'
                      : 'border-neutral-200 text-neutral-700 hover:border-neutral-900'
                  }`}
                >
                  {cat === 'all' ? 'Todos' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Price Filter */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-400 mb-4">
              Precio
            </h3>
            <div className="flex flex-wrap lg:flex-col gap-2">
              {PRICE_RANGES.map((range, idx) => (
                <button
                  key={range.label}
                  id={`filter-price-${idx}`}
                  onClick={() => setPriceRangeIdx(idx)}
                  className={`text-left px-4 py-2 text-sm border elite-transition ${
                    priceRangeIdx === idx
                      ? 'bg-neutral-900 text-white border-neutral-900'
                      : 'border-neutral-200 text-neutral-700 hover:border-neutral-900'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          {/* Reset */}
          <button
            id="clear-filters-btn"
            onClick={() => {
              setActiveCategory('all');
              setPriceRangeIdx(0);
              setSortBy('default');
            }}
            className="text-sm text-neutral-500 hover:text-neutral-900 elite-transition underline underline-offset-4"
          >
            Limpiar filtros
          </button>
        </div>
      </aside>

      {/* Main Grid Area */}
      <section className="flex-1 min-w-0">
        {/* Sort Bar */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-100">
          <div>
            <h2 className="text-2xl font-light text-neutral-900">Colección</h2>
            <p className="text-sm text-neutral-400 mt-0.5">{filtered.length} productos</p>
          </div>
          <select
            id="sort-select"
            value={sortBy}
            onChange={e => setSortBy(e.target.value as typeof sortBy)}
            className="text-sm border border-neutral-200 px-3 py-2 bg-white text-neutral-700 focus:outline-none focus:border-neutral-900 elite-transition"
          >
            <option value="default">Destacados</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
          </select>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <p className="text-lg font-light text-neutral-400">
              No hay productos que coincidan con los filtros.
            </p>
            <button
              onClick={() => { setActiveCategory('all'); setPriceRangeIdx(0); }}
              className="text-sm underline underline-offset-4 text-neutral-600 hover:text-neutral-900 elite-transition"
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
          >
            {filtered.map(product => (
              <article key={product.id} className="product-card group">
                {/* Image */}
                <div
                  className="relative aspect-[4/5] overflow-hidden bg-neutral-100 mb-4 cursor-pointer"
                  onClick={() => handleImageClick(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover elite-transition group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/10 elite-transition" />
                  {/* View detail label */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 elite-transition">
                    <span className="bg-white/90 text-neutral-900 text-xs font-medium tracking-wide px-4 py-2 backdrop-blur-sm">
                      Ver Detalle
                    </span>
                  </div>
                </div>

                {/* Info Row */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-neutral-900 truncate leading-snug">
                      {product.name}
                    </h3>
                    <p className="text-sm text-neutral-500 mt-1">
                      €{product.price.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                    </p>
                    {product.category && (
                      <p className="text-xs text-neutral-400 mt-0.5 capitalize">{product.category}</p>
                    )}
                  </div>

                  {/* Quick Add Button */}
                  <button
                    id={`add-to-cart-${product.id}`}
                    onClick={e => handleQuickAdd(e, product)}
                    aria-label={`Añadir ${product.name} al carrito`}
                    className="flex-shrink-0 p-3 bg-neutral-900 text-white elite-transition hover:bg-neutral-700 active:scale-95"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

import React, { useEffect, useRef, useState } from 'react';
import { useStore } from '@nanostores/react';
import { selectedProduct, isCartOpen, addToCart } from '../store/cartStore';
import gsap from 'gsap';

export default function ProductModal() {
  const product = useStore(selectedProduct);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const backdropRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const isOpen = !!product;

  // Reset selections when product changes
  useEffect(() => {
    setSelectedSize('');
    setSelectedColor('');
  }, [product?.id]);

  // Animate in/out
  useEffect(() => {
    if (!modalRef.current || !backdropRef.current) return;
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, y: 40, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power3.out' }
      );
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  if (!product) return null;

  // Extract unique sizes and colors from variants
  const sizes = [...new Set(product.variantes?.map(v => v.size).filter(Boolean) as string[])];
  const colors = [...new Set(product.variantes?.map(v => v.color).filter(Boolean) as string[])];
  const hasVariants = sizes.length > 0 || colors.length > 0;

  const close = () => selectedProduct.set(null);

  const handleAddToCart = () => {
    if (sizes.length > 0 && !selectedSize) {
      alert('Por favor selecciona una talla');
      return;
    }
    if (colors.length > 0 && !selectedColor) {
      alert('Por favor selecciona un color');
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      size: selectedSize || undefined,
      color: selectedColor || undefined,
    });
    isCartOpen.set(true);
    close();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        ref={backdropRef}
        onClick={close}
        className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm"
        aria-label="Cerrar modal"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Detalle de ${product.name}`}
        className="fixed z-[80] inset-4 md:inset-auto md:top-[50%] md:left-[50%] md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-3xl bg-white shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:max-h-[80vh] overflow-hidden"
      >
        {/* Product Image */}
        <div className="md:w-1/2 aspect-[4/5] md:aspect-auto bg-neutral-100 overflow-hidden flex-shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 flex flex-col overflow-y-auto hide-scrollbar p-8">
          {/* Close button */}
          <button
            id="product-modal-close"
            onClick={close}
            aria-label="Cerrar"
            className="self-end p-1 hover:opacity-60 elite-transition mb-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Category */}
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-neutral-400 mb-2">
            {product.category}
          </p>

          {/* Name & Price */}
          <h2 className="text-2xl font-semibold text-neutral-900 leading-snug">{product.name}</h2>
          <p className="text-xl font-light text-neutral-700 mt-2">
            €{product.price.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
          </p>

          {/* Description */}
          {product.description && (
            <p className="text-sm text-neutral-500 mt-4 leading-relaxed">{product.description}</p>
          )}

          <div className="mt-6 space-y-5 flex-1">
            {/* Size Selector */}
            {sizes.length > 0 && (
              <div>
                <p className="text-xs font-semibold tracking-[0.15em] uppercase text-neutral-700 mb-3">
                  Talla
                </p>
                <div className="flex flex-wrap gap-2">
                  {sizes.map(size => (
                    <button
                      key={size}
                      id={`size-${size}`}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 text-sm border elite-transition ${
                        selectedSize === size
                          ? 'bg-neutral-900 text-white border-neutral-900'
                          : 'border-neutral-200 text-neutral-700 hover:border-neutral-900'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selector */}
            {colors.length > 0 && (
              <div>
                <p className="text-xs font-semibold tracking-[0.15em] uppercase text-neutral-700 mb-3">
                  Color {selectedColor && <span className="font-normal normal-case text-neutral-500">— {selectedColor}</span>}
                </p>
                <div className="flex flex-wrap gap-2">
                  {colors.map(color => (
                    <button
                      key={color}
                      id={`color-${color}`}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 text-sm border elite-transition capitalize ${
                        selectedColor === color
                          ? 'bg-neutral-900 text-white border-neutral-900'
                          : 'border-neutral-200 text-neutral-700 hover:border-neutral-900'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* CTA */}
          <button
            id="add-to-cart-confirm-btn"
            onClick={handleAddToCart}
            className="mt-8 w-full py-4 bg-neutral-900 text-white text-sm font-medium tracking-wide elite-transition hover:bg-neutral-700 active:scale-[0.98]"
          >
            {hasVariants ? 'Confirmar y Añadir al Carrito' : 'Añadir al Carrito'}
          </button>
        </div>
      </div>
    </>
  );
}

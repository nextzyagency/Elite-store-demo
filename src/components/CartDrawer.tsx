import React, { useEffect, useRef } from 'react';
import { useStore } from '@nanostores/react';
import {
  cartItems,
  isCartOpen,
  removeFromCart,
  decreaseQuantity,
  addToCart,
  clearCart,
  getCartTotal,
} from '../store/cartStore';
import gsap from 'gsap';

export default function CartDrawer() {
  const open = useStore(isCartOpen);
  const items = useStore(cartItems);
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  // Animate open/close
  useEffect(() => {
    if (!drawerRef.current || !overlayRef.current) return;
    if (open) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
      gsap.fromTo(
        drawerRef.current,
        { x: '100%' },
        { x: '0%', duration: 0.45, ease: 'power3.out' }
      );
    } else {
      document.body.style.overflow = '';
      gsap.to(drawerRef.current, {
        x: '100%',
        duration: 0.35,
        ease: 'power3.in',
      });
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 });
    }
  }, [open]);

  const close = () => isCartOpen.set(false);

  const handleCheckout = () => {
    alert('¡Gracias por tu compra! Funcionalidad de pago próximamente.');
    clearCart();
    close();
  };

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={close}
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm opacity-0"
        style={{ pointerEvents: open ? 'auto' : 'none' }}
        aria-label="Cerrar carrito"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compra"
        className="fixed top-0 right-0 h-full w-full max-w-md z-[60] bg-white shadow-2xl translate-x-full flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100">
          <div>
            <h2 className="text-lg font-semibold tracking-wide">Tu Carrito</h2>
            {count > 0 && (
              <p className="text-xs text-neutral-500 mt-0.5">
                {count} {count === 1 ? 'artículo' : 'artículos'}
              </p>
            )}
          </div>
          <button
            id="cart-close-btn"
            onClick={close}
            aria-label="Cerrar carrito"
            className="p-2 hover:opacity-70 elite-transition rounded-full hover:bg-neutral-100"
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
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 hide-scrollbar">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-neutral-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium text-neutral-800">Tu carrito está vacío</p>
                <p className="text-sm text-neutral-500 mt-1">Explora nuestra colección</p>
              </div>
              <button
                onClick={close}
                className="mt-2 px-6 py-2.5 bg-neutral-900 text-white text-sm font-medium elite-transition hover:bg-neutral-700"
              >
                Ver Colección
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map(item => (
                <li
                  key={`${item.id}-${item.size}-${item.color}`}
                  className="flex gap-4 py-4 border-b border-neutral-100 last:border-0"
                >
                  <div className="w-20 h-24 bg-neutral-100 overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-900 truncate">{item.name}</p>
                    {(item.size || item.color) && (
                      <p className="text-xs text-neutral-500 mt-0.5">
                        {[item.size, item.color].filter(Boolean).join(' · ')}
                      </p>
                    )}
                    <p className="text-sm font-medium text-neutral-700 mt-1">
                      €{(item.price * item.quantity).toLocaleString('es-ES')}
                    </p>
                    {/* Quantity controls */}
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => decreaseQuantity(item.id, item.size, item.color)}
                        className="w-7 h-7 border border-neutral-200 flex items-center justify-center text-sm hover:border-neutral-900 elite-transition"
                        aria-label="Reducir cantidad"
                      >
                        −
                      </button>
                      <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() =>
                          addToCart({
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            image: item.image,
                            category: item.category,
                            size: item.size,
                            color: item.color,
                          })
                        }
                        className="w-7 h-7 border border-neutral-200 flex items-center justify-center text-sm hover:border-neutral-900 elite-transition"
                        aria-label="Aumentar cantidad"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id, item.size, item.color)}
                        className="ml-auto text-xs text-neutral-400 hover:text-red-500 elite-transition"
                        aria-label="Eliminar producto"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-neutral-100 space-y-4">
            <div className="flex items-center justify-between text-sm text-neutral-500">
              <span>Envío</span>
              <span className="font-medium text-green-600">Gratis</span>
            </div>
            <div className="flex items-center justify-between font-semibold text-base">
              <span>Total</span>
              <span>€{total.toLocaleString('es-ES', { minimumFractionDigits: 2 })}</span>
            </div>
            <button
              id="checkout-btn"
              onClick={handleCheckout}
              className="w-full py-4 bg-neutral-900 text-white text-sm font-medium tracking-wide elite-transition hover:bg-neutral-700 active:scale-[0.98]"
            >
              Finalizar Compra
            </button>
            <button
              onClick={close}
              className="w-full text-sm text-neutral-500 hover:text-neutral-900 elite-transition underline underline-offset-4"
            >
              Continuar Comprando
            </button>
          </div>
        )}
      </div>
    </>
  );
}

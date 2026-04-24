import React, { useEffect, useRef, useState } from 'react';
import { useStore } from '@nanostores/react';
import { cartItems, isCartOpen, getCartCount } from '../store/cartStore';
import gsap from 'gsap';

export default function Navbar() {
  const items = useStore(cartItems);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const navRef = useRef<HTMLElement>(null);
  const cartBadgeRef = useRef<HTMLSpanElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const prevCountRef = useRef(count);

  // Mount animation
  useEffect(() => {
    if (!navRef.current) return;
    gsap.from(navRef.current, {
      y: -80,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    });
  }, []);

  // Scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Cart badge bounce on count change
  useEffect(() => {
    if (!cartBadgeRef.current || count === prevCountRef.current) return;
    prevCountRef.current = count;
    gsap.fromTo(
      cartBadgeRef.current,
      { scale: 1.6 },
      { scale: 1, duration: 0.4, ease: 'back.out(2)' }
    );
  }, [count]);

  const navLinks = [
    { href: '/gorras', label: 'Gorras' },
    { href: '/camisetas', label: 'Camisetas' },
    { href: '/pantalones', label: 'Pantalones' },
    { href: '/#nosotros', label: 'Nosotros' },
  ];

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-neutral-100'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a
            href="/"
            className="text-xl font-semibold tracking-[0.3em] elite-transition hover:opacity-70"
            id="nav-logo"
          >
            ELITE
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-neutral-600 hover:text-neutral-900 elite-transition tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Side: Cart + Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Cart Button */}
            <button
              id="cart-toggle-btn"
              onClick={() => isCartOpen.set(true)}
              aria-label="Abrir carrito"
              className="relative p-2 hover:opacity-70 elite-transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
              {count > 0 && (
                <span
                  ref={cartBadgeRef}
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 text-[10px] font-semibold bg-neutral-900 text-white rounded-full flex items-center justify-center"
                >
                  {count > 99 ? '99+' : count}
                </span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              id="mobile-menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 hover:opacity-70 elite-transition"
              aria-label="Menú"
            >
              <div className="space-y-1.5">
                <span
                  className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                    menuOpen ? 'rotate-45 translate-y-2' : ''
                  }`}
                />
                <span
                  className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                    menuOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                    menuOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-neutral-100 bg-white py-4">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-3 text-sm font-medium text-neutral-700 hover:text-neutral-900 elite-transition"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

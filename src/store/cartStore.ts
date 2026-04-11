import { atom } from 'nanostores';

// ─── Types ────────────────────────────────────────────────────────────────────

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
  size?: string;
  color?: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description?: string;
  variantes?: { size?: string; color?: string; stock?: number }[];
};

export type ToastMessage = {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
};

// ─── Stores ───────────────────────────────────────────────────────────────────

export const cartItems = atom<CartItem[]>([]);
export const isCartOpen = atom<boolean>(false);
export const selectedProduct = atom<Product | null>(null);
export const toastMessages = atom<ToastMessage[]>([]);

// ─── Cart Actions ──────────────────────────────────────────────────────────────

export function addToCart(product: Omit<CartItem, 'quantity'>) {
  const currentItems = cartItems.get();
  // Match by id + size + color for variant uniqueness
  const key = `${product.id}-${product.size ?? ''}-${product.color ?? ''}`;
  const existingIndex = currentItems.findIndex(
    item =>
      `${item.id}-${item.size ?? ''}-${item.color ?? ''}` === key
  );

  if (existingIndex > -1) {
    const updated = [...currentItems];
    updated[existingIndex] = {
      ...updated[existingIndex],
      quantity: updated[existingIndex].quantity + 1,
    };
    cartItems.set(updated);
  } else {
    cartItems.set([...currentItems, { ...product, quantity: 1 }]);
  }

  showToast(`${product.name} añadido al carrito`, 'success');
}

export function decreaseQuantity(id: string, size?: string, color?: string) {
  const currentItems = cartItems.get();
  const key = `${id}-${size ?? ''}-${color ?? ''}`;
  const idx = currentItems.findIndex(
    item => `${item.id}-${item.size ?? ''}-${item.color ?? ''}` === key
  );
  if (idx === -1) return;

  if (currentItems[idx].quantity > 1) {
    const updated = [...currentItems];
    updated[idx] = { ...updated[idx], quantity: updated[idx].quantity - 1 };
    cartItems.set(updated);
  } else {
    removeFromCart(id, size, color);
  }
}

export function removeFromCart(id: string, size?: string, color?: string) {
  const key = `${id}-${size ?? ''}-${color ?? ''}`;
  cartItems.set(
    cartItems.get().filter(
      item => `${item.id}-${item.size ?? ''}-${item.color ?? ''}` !== key
    )
  );
}

export function clearCart() {
  cartItems.set([]);
}

export function getCartTotal(): number {
  return cartItems.get().reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function getCartCount(): number {
  return cartItems.get().reduce((sum, item) => sum + item.quantity, 0);
}

// ─── Toast Actions ─────────────────────────────────────────────────────────────

export function showToast(message: string, type: ToastMessage['type'] = 'info') {
  const id = Math.random().toString(36).slice(2);
  toastMessages.set([...toastMessages.get(), { id, message, type }]);
  setTimeout(() => {
    toastMessages.set(toastMessages.get().filter(t => t.id !== id));
  }, 3500);
}

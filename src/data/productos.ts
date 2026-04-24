import type { Product } from '../store/cartStore';

// ─── Internal Products Data ───────────────────────────────────────────────────
// Source of truth — no external API required.

export const todosLosProductos: Product[] = [
  // ──────────────────── GORRAS ─────────────────────────────
  {
    id: 'gorra-001',
    name: 'Gorra Elite Classic',
    price: 89,
    category: 'gorras',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80',
    description:
      'Gorra de edición limitada confeccionada en algodón premium de 6 paneles. Bordado tonal en la visera y correa trasera ajustable de cuero. La pieza definitiva para quienes aprecian los detalles.',
    variantes: [
      { color: 'Negro', stock: 12 },
      { color: 'Crema', stock: 8 },
      { color: 'Gris Marengo', stock: 5 },
    ],
  },
  {
    id: 'gorra-002',
    name: 'Gorra Elite Structured',
    price: 115,
    category: 'gorras',
    image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=800&q=80',
    description:
      'Gorra structured de 5 paneles en lana virgen italiana. Frente rígido, visera curvada a mano y cierre de hebilla dorada. Craftsmanship de altísimo nivel.',
    variantes: [
      { color: 'Negro Oxford', stock: 10 },
      { color: 'Camel', stock: 6 },
    ],
  },
  {
    id: 'gorra-003',
    name: 'Gorra Elite Signature',
    price: 145,
    category: 'gorras',
    image: 'https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=800&q=80',
    description:
      'Nuestra gorra insignia. Construida en canvas de alta resistencia con logo bordado en 3D y forro interior de satén. Edición numerada.',
    variantes: [
      { color: 'Negro', stock: 7 },
      { color: 'Blanco Roto', stock: 4 },
      { color: 'Verde Oliva', stock: 9 },
    ],
  },
  {
    id: 'gorra-004',
    name: 'Gorra Elite Dad Hat',
    price: 75,
    category: 'gorras',
    image: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8?w=800&q=80',
    description:
      'Dad hat en algodón lavado de suave caída. Visera sin estructura para un look relajado pero refinado. Disponible en múltiples tonos neutros.',
    variantes: [
      { color: 'Beige', stock: 15 },
      { color: 'Negro', stock: 11 },
      { color: 'Azul Noche', stock: 6 },
    ],
  },

  // ──────────────────── CAMISETAS ──────────────────────────
  {
    id: 'camiseta-001',
    name: 'Camiseta Elite Oversized',
    price: 195,
    category: 'camisetas',
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80',
    description:
      'Camiseta oversized en 100% algodón Pima peruano de 200 g/m². Silueta caída, costura lateral reforzada y cuello ribeteado a mano. La base de cualquier guardarropa de alto nivel.',
    variantes: [
      { size: 'S', color: 'Blanco', stock: 8 },
      { size: 'M', color: 'Blanco', stock: 12 },
      { size: 'L', color: 'Blanco', stock: 10 },
      { size: 'XL', color: 'Blanco', stock: 5 },
      { size: 'S', color: 'Negro', stock: 7 },
      { size: 'M', color: 'Negro', stock: 9 },
      { size: 'L', color: 'Negro', stock: 8 },
    ],
  },
  {
    id: 'camiseta-002',
    name: 'Camiseta Elite Relaxed',
    price: 165,
    category: 'camisetas',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80',
    description:
      'Corte relaxed en jersey mercerizado. Suavidad excepcional al tacto y caída perfecta. Ideal para elevar el look cotidiano sin esfuerzo.',
    variantes: [
      { size: 'S', color: 'Gris Claro', stock: 10 },
      { size: 'M', color: 'Gris Claro', stock: 14 },
      { size: 'L', color: 'Gris Claro', stock: 9 },
      { size: 'M', color: 'Negro', stock: 6 },
      { size: 'L', color: 'Negro', stock: 7 },
    ],
  },
  {
    id: 'camiseta-003',
    name: 'Camiseta Elite Logo Tee',
    price: 220,
    category: 'camisetas',
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80',
    description:
      'Camiseta de edición especial con logo serigrafíado en tinta mate sobre tela de doble peso. Statement piece sin ostentación.',
    variantes: [
      { size: 'S', color: 'Negro', stock: 5 },
      { size: 'M', color: 'Negro', stock: 8 },
      { size: 'L', color: 'Negro', stock: 10 },
      { size: 'XL', color: 'Negro', stock: 4 },
    ],
  },
  {
    id: 'camiseta-004',
    name: 'Camiseta Elite Essential',
    price: 145,
    category: 'camisetas',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
    description:
      'Básico de élite. Algodón orgánico certificado GOTS, teñido en pieza para un color uniforme y profundo. Corte regular atemporal.',
    variantes: [
      { size: 'XS', color: 'Blanco', stock: 6 },
      { size: 'S', color: 'Blanco', stock: 9 },
      { size: 'M', color: 'Blanco', stock: 11 },
      { size: 'L', color: 'Blanco', stock: 8 },
      { size: 'XL', color: 'Crema', stock: 5 },
    ],
  },

  // ──────────────────── PANTALONES ─────────────────────────
  {
    id: 'pantalon-001',
    name: 'Pantalón Elite Chino',
    price: 285,
    category: 'pantalones',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80',
    description:
      'Chino de corte slim en gabardina de algodón egipcio. Cintura elástica trasera para máxima comodidad, cierre con botón cubierto y dos bolsillos laterales ribeteados.',
    variantes: [
      { size: '28', color: 'Beige', stock: 6 },
      { size: '30', color: 'Beige', stock: 9 },
      { size: '32', color: 'Beige', stock: 10 },
      { size: '34', color: 'Beige', stock: 5 },
      { size: '30', color: 'Oliva', stock: 7 },
      { size: '32', color: 'Oliva', stock: 8 },
    ],
  },
  {
    id: 'pantalon-002',
    name: 'Pantalón Elite Cargo',
    price: 320,
    category: 'pantalones',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80',
    description:
      'Cargo utility rediseñado para la modernidad. Tela ripstop resistente, bolsillos laterales con cierre invisible y bajo con cincha ajustable. Función sin sacrificar estética.',
    variantes: [
      { size: '28', color: 'Negro', stock: 5 },
      { size: '30', color: 'Negro', stock: 8 },
      { size: '32', color: 'Negro', stock: 10 },
      { size: '34', color: 'Negro', stock: 6 },
      { size: '30', color: 'Gris', stock: 7 },
      { size: '32', color: 'Gris', stock: 4 },
    ],
  },
  {
    id: 'pantalon-003',
    name: 'Pantalón Elite Wide Leg',
    price: 350,
    category: 'pantalones',
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80',
    description:
      'Wide leg de lana tropical ligera. Pliegues frontales a medida, forro interior completo y terminaciones artesanales. Elegancia sin estructura.',
    variantes: [
      { size: '28', color: 'Gris Perla', stock: 4 },
      { size: '30', color: 'Gris Perla', stock: 7 },
      { size: '32', color: 'Gris Perla', stock: 8 },
      { size: '34', color: 'Negro', stock: 5 },
      { size: '36', color: 'Negro', stock: 3 },
    ],
  },
  {
    id: 'pantalon-004',
    name: 'Pantalón Elite Track',
    price: 240,
    category: 'pantalones',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80',
    description:
      'Track pant en fleece técnico italiano. Cintura con cordón tonal, bolsillos con cremallera invisible y puños acanalados. El lujo del confort elevado.',
    variantes: [
      { size: 'S', color: 'Negro', stock: 9 },
      { size: 'M', color: 'Negro', stock: 12 },
      { size: 'L', color: 'Negro', stock: 8 },
      { size: 'XL', color: 'Negro', stock: 5 },
      { size: 'M', color: 'Gris', stock: 6 },
      { size: 'L', color: 'Gris', stock: 7 },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

export const gorras = todosLosProductos.filter(p => p.category === 'gorras');
export const camisetas = todosLosProductos.filter(p => p.category === 'camisetas');
export const pantalones = todosLosProductos.filter(p => p.category === 'pantalones');

export function getProductById(id: string): Product | undefined {
  return todosLosProductos.find(p => p.id === id);
}

/** One featured product per category for the home page */
export const featuredProducts: Product[] = [
  camisetas[0],
  pantalones[0],
  gorras[0],
];

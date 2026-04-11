import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Error: PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY must be set in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const sampleProducts = [
  {
    nombre: 'Reloj Cronógrafo de Plata',
    precio: 2500,
    categoria: 'Accesorios',
    descripcion: 'Un reloj elegante con acabado de plata pulida y correa de cuero genuino.',
    imagen_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    variantes: [
      { size: '42mm', color: 'Plata', stock: 10 },
      { size: '40mm', color: 'Plata', stock: 5 }
    ]
  },
  {
    nombre: 'Chaqueta de Cuero Premium',
    precio: 850,
    categoria: 'Ropa',
    descripcion: 'Chaqueta de cuero italiano de alta calidad, perfecta para un estilo urbano sofisticado.',
    imagen_url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80',
    variantes: [
      { size: 'M', color: 'Negro', stock: 15 },
      { size: 'L', color: 'Negro', stock: 8 }
    ]
  },
  {
    nombre: 'Gafas de Sol de Diseñador',
    precio: 350,
    categoria: 'Accesorios',
    descripcion: 'Protección UV superior con un marco de acetato ligero y resistente.',
    imagen_url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80',
    variantes: [
      { color: 'Dorado', stock: 20 },
      { color: 'Negro', stock: 25 }
    ]
  },
  {
    nombre: 'Fragancia "Elite Night"',
    precio: 180,
    categoria: 'Belleza',
    descripcion: 'Un aroma cautivador con notas de sándalo y bergamota.',
    imagen_url: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80',
    variantes: [
      { size: '100ml', stock: 50 },
      { size: '50ml', stock: 30 }
    ]
  }
];

async function seed() {
  console.log('Iniciando carga de datos en Supabase...');

  // Intentamos insertar los productos
  const { data, error } = await supabase
    .from('productos')
    .insert(sampleProducts)
    .select();

  if (error) {
    if (error.code === '42P01') {
      console.error('Error: La tabla "productos" no existe en tu base de datos de Supabase.');
      console.log('Por favor, crea la tabla "productos" con los siguientes campos:');
      console.log('- id: bigserial (primary key)');
      console.log('- nombre: text');
      console.log('- precio: numeric');
      console.log('- categoria: text');
      console.log('- descripcion: text');
      console.log('- imagen_url: text');
      console.log('- variantes: jsonb');
      console.log('- created_at: timestamptz (default: now())');
    } else {
      console.error('Error al insertar productos:', error.message);
    }
  } else {
    console.log('¡Éxito! Se han insertado los siguientes productos:', data.length);
  }
}

seed();

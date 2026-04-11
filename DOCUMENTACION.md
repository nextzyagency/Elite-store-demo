# 💎 ELITE | Luxury Ecommerce Documentation

Este documento explica la arquitectura, funcionalidad y tecnologías que impulsan la plataforma **ELITE**, una experiencia de comercio electrónico de alta gama construida para el rendimiento y la sofisticación visual.

---

## 🏗️ Arquitectura Técnica

El proyecto utiliza la arquitectura de **Islas de Astro**, lo que permite una velocidad de carga excepcional al enviar solo el JavaScript necesario al navegador.

### Tecnologías Core
- **Astro 5**: Framework base para el enrutamiento y la estructura.
- **React**: Utilizado exclusivamente para las "Islas" interactivas (Componentes hidratados).
- **Tailwind CSS**: Sistema de diseño basado en utilidades para una estética coherente y premium.
- **GSAP (GreenSock)**: Motor de animaciones de estándar industrial para transiciones de lujo.
- **Nano Stores**: Estado global ligero para la persistencia del carrito y modales.

---

## 🛠️ Funcionalidades Principales

### 1. Gestión de Inventario Dinámica (SheetDB)
El catálogo de productos ya no depende de una base de datos estática. Ahora se sincroniza en tiempo real con una **Google Sheet** a través de la API de SheetDB.
- **Flexibilidad**: Cambia precios, stock o imágenes desde una hoja de cálculo y se refleja al instante.
- **Mapeo Automático**: Los campos de la hoja (nombre, precio, imagen_url) se transforman automáticamente al esquema de la aplicación.

### 2. Experiencia de Compra Fluida (Cart Engine)
- **Persistencia Reactiva**: El carrito utiliza *Nano Stores*, permitiendo comunicación instantánea entre el Navbar, la lista de productos y el Drawer lateral.
- **Drawer Lateral**: Una interfaz elegante que aparece sin recargar la página para gestionar el pedido.
- **Toasts Informativos**: Confirmaciones visuales rápidas y sofisticadas cada vez que un artículo se añade al carrito.

### 3. Visual Discovery (Product Modal)
Al hacer clic en un producto, se activa un modal detallado que permite:
- Explorar descripciones completas.
- Seleccionar variantes (Talla, Color) con validación de stock.
- Integración directa con el sistema de carrito.

### 4. Estética Luxury & Animaciones
- **Hero Section**: Animaciones de entrada escalonadas usando GSAP para un impacto visual inmediato.
- **Micro-interacciones**: Efectos de hover sofisticados y transiciones de opacidad que evocan exclusividad.
- **Tipografía Modernista**: Uso estratégico de fuentes sin serifa con tracking amplio para un look editorial.

---

## 🛡️ Robustez "ELITE"

La plataforma incluye un sistema de manejo de estados críticos para asegurar la confianza del cliente:
- **Conexión en Pausa**: Si el origen de datos (SheetDB) falla, el usuario ve un mensaje elegante que protege la imagen de marca.
- **Colección Próxima**: Estado optimizado para momentos en los que el inventario está vacío.
- **Resiliencia de Datos**: Fallbacks integrados para imágenes faltantes o descripciones cortas.

---

## 🚀 Comandos de Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar construcción local
npm run preview
```

---

*Diseñado para la excelencia. Desarrollado para el rendimiento.*

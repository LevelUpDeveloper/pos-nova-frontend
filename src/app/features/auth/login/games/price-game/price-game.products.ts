export interface PriceGameProduct {
  name: string;
  price: number;
}

/**
 * Lista de ejemplo para el juego. Cuando exista un endpoint del catálogo,
 * este es el único lugar que hay que reemplazar.
 */
export const SAMPLE_PRODUCTS: readonly PriceGameProduct[] = [
  { name: 'Agua 600 ml', price: 15 },
  { name: 'Pan dulce', price: 18 },
  { name: 'Galletas', price: 22 },
  { name: 'Jugo de naranja', price: 25 },
  { name: 'Leche 1 L', price: 29 },
  { name: 'Arroz 1 kg', price: 32 },
  { name: 'Café americano', price: 35 },
  { name: 'Manzana kg', price: 42 },
  { name: 'Aceite 1 L', price: 48 },
  { name: 'Sándwich', price: 55 },
  { name: 'Queso panela', price: 68 },
  { name: 'Detergente 1 kg', price: 74 },
];

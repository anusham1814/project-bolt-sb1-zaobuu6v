export type Category = 'jerseys' | 'shoes';

export interface Product {
  id: number;
  name: string;
  category: Category;
  sport: string;
  brand: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  stock: number;
  image: string;
  gallery: string[];
  description: string;
  sizes: string[];
  colors: string[];
  badge: string | null;
}

export interface CartItem {
  productId: number;
  qty: number;
  size: string;
  color: string;
}

export interface ProductRow {
  id: number;
  name: string;
  category: Category;
  sport: string;
  brand: string;
  price: number;
  original_price: number;
  discount: number;
  rating: number;
  reviews: number;
  stock: number;
  image: string;
  gallery: string[];
  description: string;
  sizes: string[];
  colors: string[];
  badge: string | null;
}

export function mapRowToProduct(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    sport: row.sport,
    brand: row.brand,
    price: Number(row.price),
    originalPrice: Number(row.original_price),
    discount: row.discount,
    rating: Number(row.rating),
    reviews: row.reviews,
    stock: row.stock,
    image: row.image,
    gallery: row.gallery ?? [],
    description: row.description,
    sizes: row.sizes ?? [],
    colors: row.colors ?? [],
    badge: row.badge,
  };
}

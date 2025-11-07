export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating?: number;
  reviewCount?: number;
  isFlashDeal?: boolean;
  originalPrice?: number;
  discount?: number;
  isTrending?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Product {
  id?: number
  name: string
  desc: string
  price: number
  rating?: number
  amount : number
  category: Category
  brand: Brand
  images: Image[]
  quantity?: number
  num_reviews?: number
}

export interface Image {
    id?: number
    file: File
}

export interface Category {
    id?: number
    name: string
    desc: string
}

export interface Brand {
    id?: number
    name: string
    desc: string
}

export interface Order {
    total_price: number;
    address: string
    city: string
    postal_code: string
    order_items: Product[]
};


export interface User {
    id?: number;
    avatar: File | null;
    email: string;
    name: string;
    last_name: string;
};

export interface Token {
    user_id: number;
    exp: number;
    is_staff: boolean;
    email: string;
    name: string;
    last_name: string;
    avatar: File | null;
};

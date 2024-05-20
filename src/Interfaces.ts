export interface Product {
  id?: number
  name: string
  desc: string
  price: number
  rating?: number
  amount : number
  category_full: Category
  brand_full: Brand
  images: Image[]
  quantity?: number
  num_reviews?: number
}

export interface Image {
    id?: number
    image_file: File
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

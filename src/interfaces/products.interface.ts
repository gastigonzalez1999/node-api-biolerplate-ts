export interface ProductsQuery {
  limit?: number;
  from?: number;
}

export interface CreateProduct {
  name: string;
  img: string;
  price: number;
  available: boolean;
  status: boolean;
  user_id: string;
  category_id: string;
  description: string;
}

export interface UpdateProduct {
  id: string;
  name: string;
  img: string;
  price: number;
  available: boolean;
  status: boolean;
  user_id: string;
  category_id: string;
  description: string;
}

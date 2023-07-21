export interface CategoriesQuery {
  limit?: number;
  from?: number;
}

export interface CreateCategory {
  name: string;
  user_id: string;
}

export interface UpdateCategory {
  name: string;
  category_id: string;
  status: boolean;
  user_id: string;
}

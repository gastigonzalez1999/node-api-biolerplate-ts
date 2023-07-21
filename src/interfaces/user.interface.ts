export interface UserQuery {
  limit?: number;
  from?: number;
}

export interface CreateUser {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface UpdateUser {
  id: string;
  name: string;
  password: string;
  role: string;
  google: boolean;
  status: boolean;
}

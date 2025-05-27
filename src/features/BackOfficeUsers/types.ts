export interface BackOfficeUser {
  id: number;
  email: string;
  avatar: string;
  first_name: string;
  last_name: string;
}

export interface BackOfficeUserRequest {
  id?: number;
  email: string;
  avatar?: string;
  first_name: string;
  last_name: string;
}
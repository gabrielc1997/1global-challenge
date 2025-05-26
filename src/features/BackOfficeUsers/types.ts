export type BackOfficeUser = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export type BackOfficeUserResponse = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: BackOfficeUser[];
};
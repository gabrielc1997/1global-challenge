import { BackOfficeUser, BackOfficeUserRequest } from './types';

const STORAGE_KEY = 'backoffice_users';
const API_URL = 'https://reqres.in/api/users';
const API_KEY = 'reqres-free-v1';

function getStoredUsers(): BackOfficeUser[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    console.log('[STORAGE] Retrieved users:', parsed);
    return parsed;
  } catch (err) {
    console.error('[STORAGE] Error parsing localStorage:', err);
    return [];
  }
}

function saveUsers(users: BackOfficeUser[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    console.log('[STORAGE] Saved users:', users);
  } catch (err) {
    console.error('[STORAGE] Error saving users:', err);
  }
}

export const fetchBackOfficeUsers = async (page: number, perPage: number) => {
  console.log('[API] Fetching users for page:', page);

  let users = getStoredUsers();

  if (users.length === 0) {
    console.log('[API] No users found locally. Fetching from Reqres...');
    try {
      const response = await fetch(`${API_URL}?page=1&per_page=12`, {
        headers: {
          'x-api-key': API_KEY,
        },
      });

      const json = await response.json();
      console.log('[API] Response from Reqres:', json);

      if (Array.isArray(json.data)) {
        users = json.data;
        saveUsers(users);
      } else {
        console.warn('[API] Invalid data from Reqres. Using fallback.');
        users = [
          {
            id: 1,
            email: 'fallback@example.com',
            first_name: 'Fallback',
            last_name: 'User',
            avatar: '',
          },
        ];
        saveUsers(users);
      }
    } catch (err) {
      console.error('[API] Fetch failed. Using fallback.', err);
      users = [
        {
          id: 1,
          email: 'fallback@example.com',
          first_name: 'Fallback',
          last_name: 'User',
          avatar: '',
        },
      ];
      saveUsers(users);
    }
  }

  const start = (page - 1) * perPage;
  const paginated = users.slice(start, start + perPage);

  console.log('[API] Returning paginated users:', { start, paginated, total: users.length });

  return {
    data: paginated,
    total: users.length,
  };
};

export const fetchBackOfficeUserById = async (id: number): Promise<BackOfficeUser | undefined> => {
  const users = getStoredUsers();
  const user = users.find((u) => u.id === id);
  console.log('[API] Fetch user by ID:', id, user);
  return user;
};

export const createBackOfficeUser = async (data: BackOfficeUserRequest): Promise<BackOfficeUser> => {
  const users = getStoredUsers();
  const newUser: BackOfficeUser = {
    ...data,
    id: Date.now(),
    avatar: data.avatar || 'https://via.placeholder.com/150',
  };
  const updated = [...users, newUser];
  saveUsers(updated);
  console.log('[API] User created:', newUser);
  return newUser;
};

export const updateBackOfficeUser = async (id: number, data: BackOfficeUserRequest): Promise<BackOfficeUser | undefined> => {
  const users = getStoredUsers();
  const updated = users.map((u) => (u.id === id ? { ...u, ...data } : u));
  saveUsers(updated);
  const updatedUser = updated.find((u) => u.id === id);
  console.log('[API] User updated:', updatedUser);
  return updatedUser;
};

export const deleteBackOfficeUser = async (id: number): Promise<boolean> => {
  const users = getStoredUsers();
  const updated = users.filter((u) => u.id !== id);
  saveUsers(updated);
  console.log('[API] User deleted. ID:', id);
  return true;
};
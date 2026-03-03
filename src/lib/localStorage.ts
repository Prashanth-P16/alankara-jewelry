export interface Product {
  id: string;
  name: string;
  price: number;
  original_price?: number;
  description: string;
  long_description?: string;
  category: string;
  image_url: string;
  badge?: string;
  slug: string;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

const STORAGE_KEYS = {
  PRODUCTS: 'alankara_products',
  USERS: 'alankara_users',
  CURRENT_USER: 'alankara_current_user',
};

export const getProducts = (): Product[] => {
  const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
  return data ? JSON.parse(data) : [];
};

export const saveProducts = (products: Product[]) => {
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
};

export const addProduct = (product: Omit<Product, 'id' | 'created_at'>): Product => {
  const products = getProducts();
  const newProduct: Product = {
    ...product,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
  };
  products.unshift(newProduct);
  saveProducts(products);
  return newProduct;
};

export const updateProduct = (id: string, updates: Partial<Product>) => {
  const products = getProducts();
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...updates };
    saveProducts(products);
  }
};

export const deleteProduct = (id: string) => {
  const products = getProducts().filter(p => p.id !== id);
  saveProducts(products);
};

export const getUsers = (): User[] => {
  const data = localStorage.getItem(STORAGE_KEYS.USERS);
  return data ? JSON.parse(data) : [];
};

export const saveUsers = (users: User[]) => {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
};

export const signUp = (email: string, password: string): { user: User | null; error: string | null } => {
  const users = getUsers();
  if (users.find(u => u.email === email)) {
    return { user: null, error: 'Email already exists' };
  }
  const newUser: User = {
    id: crypto.randomUUID(),
    email,
    password,
    isAdmin: users.length === 0,
  };
  users.push(newUser);
  saveUsers(users);
  return { user: newUser, error: null };
};

export const signIn = (email: string, password: string): { user: User | null; error: string | null } => {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return { user: null, error: 'Invalid credentials' };
  }
  return { user, error: null };
};

export const getCurrentUser = (): User | null => {
  const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return data ? JSON.parse(data) : null;
};

export const setCurrentUser = (user: User | null) => {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
};

export const signOut = () => {
  setCurrentUser(null);
};

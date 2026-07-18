import { create } from "zustand";

interface User {
  email: string;
  name: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  updatePassword: (currentPassword: string, newPassword: string) => boolean;
  logout: () => void;
  checkAuth: () => void;
}

const ADMIN_EMAIL = "admin@gemca.com.au";
const DEFAULT_ADMIN_PASSWORD = "gemca2026";
const ADMIN_PASSWORD_KEY = "gemca_admin_password";

const getAdminPassword = () => {
  if (typeof window === "undefined") return DEFAULT_ADMIN_PASSWORD;
  return localStorage.getItem(ADMIN_PASSWORD_KEY) || DEFAULT_ADMIN_PASSWORD;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: true,

  login: async (email, password) => {
    set({ isLoading: true });
    // Simulate natural networking delay for visual polish
    await new Promise((resolve) => setTimeout(resolve, 850));

    if (email === ADMIN_EMAIL && password === getAdminPassword()) {
      const user = { email, name: "Ansar Goraya" };
      if (typeof window !== "undefined") {
        localStorage.setItem("gemca_admin_session", JSON.stringify(user));
      }
      set({ isAuthenticated: true, user, isLoading: false });
      return true;
    }

    set({ isLoading: false });
    return false;
  },

  updatePassword: (currentPassword, newPassword) => {
    if (typeof window === "undefined") return false;

    if (currentPassword !== getAdminPassword()) {
      return false;
    }

    localStorage.setItem(ADMIN_PASSWORD_KEY, newPassword);
    return true;
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("gemca_admin_session");
    }
    set({ isAuthenticated: false, user: null, isLoading: false });
  },

  checkAuth: () => {
    if (typeof window === "undefined") return;

    try {
      const sessionStr = localStorage.getItem("gemca_admin_session");
      if (sessionStr) {
        const user = JSON.parse(sessionStr);
        set({ isAuthenticated: true, user, isLoading: false });
      } else {
        set({ isAuthenticated: false, user: null, isLoading: false });
      }
    } catch {
      set({ isAuthenticated: false, user: null, isLoading: false });
    }
  },
}));

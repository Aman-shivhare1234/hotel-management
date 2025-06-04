import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import CryptoJS from 'crypto-js';

export type UserRole = 'owner' | 'manager' | 'accountant';

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  hotelId?: string; // For managers assigned to specific hotels
}

interface AuthState {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}

interface NotificationState {
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  markAsRead: (id: string) => void;
  clearNotifications: () => void;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  timestamp: number;
  read: boolean;
}

// Encryption key - in a real app, this would be stored securely
const ENCRYPTION_KEY = 'your-secure-encryption-key';

const encrypt = (data: any) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString();
};

const decrypt = (text: string) => {
  const bytes = CryptoJS.AES.decrypt(text, ENCRYPTION_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

export const useAuth = create(
  persist<AuthState>(
    (set) => ({
      user: null,
      token: null,
      login: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: 'auth-storage',
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          try {
            return decrypt(str);
          } catch (e) {
            return null;
          }
        },
        setItem: (name, value) => {
          localStorage.setItem(name, encrypt(value));
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);

export const useNotifications = create<NotificationState>((set) => ({
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
    })),
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),
  clearNotifications: () => set({ notifications: [] }),
}));

// Helper function to check permissions
export const checkPermission = (
  requiredRole: UserRole[],
  currentRole?: UserRole
): boolean => {
  if (!currentRole) return false;
  return requiredRole.includes(currentRole);
};
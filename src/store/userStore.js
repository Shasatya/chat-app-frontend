import { create } from "zustand";
import api from "../lib/api";

const useUserStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token") || null,
  isLoading: true,
  setUser: (user) => set({ user }),
  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token });
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
  checkAuth: async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      set({ user: null, isLoading: false });
      return;
    }

    try {
      const { data } = await api.get("/auth/me");
      set({ user: data, isLoading: false });
    } catch (err) {
      console.error("Session expired ", err);
      localStorage.removeItem("token");
      set({ user: null, token: null, isLoading: false });
    }
  },
  uploadAvatar: async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const avatarUrl = response.data.url;

      const { data: updatedUser } = await api.put("/auth/avatar", {
        avatarUrl,
      });

      set({ user: updatedUser });

      return true;
    } catch (e) {
      console.error("Avatar upload failed:", e);
      return false;
    }
  },
}));

export default useUserStore;

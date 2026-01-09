import { create } from "zustand";
import api from "../lib/api";

const useChatStore = create((set, get) => ({
  activeTab: "chats",
  conversations: [],
  friends: [],
  requests: [],

  activeChat: null,
  messages: [],
  onlineUsers: new Set(),

  setActiveTab: (tab) => set({ activeTab: tab }),
  setActiveChat: (chat) => set({ activeChat: chat, messages: [] }),
  addMessage: (msg) =>
    set((state) => {
      if (state.activeChat && state.activeChat.id === msg.conversationId) {
        return { messages: [...state.messages, msg] };
      }
      return state;
    }),
  setOnlineUsers: (userIds) => set({ onlineUsers: new Set(userIds) }),

  fetchConversations: async () => {
    try {
      const { data } = await api.get("/chat/conversations");
      set({ conversations: data });
    } catch (e) {
      console.error(e);
    }
  },

  fetchFriends: async () => {
    try {
      const { data } = await api.get("/friends");
      set({ friends: data });
    } catch (e) {
      console.error(e);
    }
  },

  fetchRequests: async () => {
    try {
      const { data } = await api.get("/friends/requests");
      set({ requests: data });
    } catch (e) {
      console.error(e);
    }
  },

  fetchChatHistory: async (chatId) => {
    try {
      const { data } = await api.get(`/chat/${chatId}`);
      set({ messages: data });
    } catch (e) {
      console.error(e);
    }
  },

  refreshAll: () => {
    const { fetchConversations, fetchFriends, fetchRequests } = get();
    fetchConversations();
    fetchFriends();
    fetchRequests();
  },

  startPrivateChat: async (targetUserId) => {
    try {
      const { data } = await api.post("/chat/private", { targetUserId });

      await get().fetchConversations();

      const chat = get().conversations.find((c) => c.id === data.id);

      if (chat) {
        set({ activeChat: chat, activeTab: "chats" });
        get().fetchChatHistory(chat.id);
      }
    } catch (e) {
      console.error(e);
    }
  },

  createGroup: async (name, friendIds) => {
    try {
      const { data } = await api.post("/chat/group", {
        name,
        participantIds: friendIds,
      });
      await get().fetchConversations();
      return data.id;
    } catch (e) {
      alert("Failed to create group", e);
    }
  },

  updateUserStatus: (userId, status) =>
    set((state) => {
      const newOnline = new Set(state.onlineUsers);
      if (status === "online") {
        newOnline.add(userId.toString());
      } else {
        newOnline.delete(userId.toString());
      }
      return { onlineUsers: newOnline };
    }),
}));

export default useChatStore;

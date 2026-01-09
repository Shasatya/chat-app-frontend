import { useEffect } from "react";
import useUserStore from "../store/userStore";
import useChatStore from "../store/chatStore";
import { connectSocket, disconnectSocket } from "../lib/socket";

import {
  AllFriends,
  AllFriendsWindow,
  AllUsers,
  AllUsersWindow,
  Chats,
  ChatWindow,
  FriendRequests,
  FriendRequestsWindow,
  Me,
  MeWindow,
  SidebarNav,
} from "../components";

export default function Chat() {
  const { token } = useUserStore();
  const {
    activeTab,
    addMessage,
    fetchConversations,
    fetchRequests,
    refreshAll,
    setOnlineUsers,
    updateUserStatus,
  } = useChatStore();

  useEffect(() => {
    if (!token) return;

    const socket = connectSocket(token);

    refreshAll();

    socket.emit("get_online_users");

    socket.on("connect", () => {
      console.log("✅ Socket Connected:", socket.id);
    });

    socket.on("receive_message", (msg) => {
      console.log("📩 Message Received:", msg);
      addMessage(msg);
      fetchConversations();
    });

    socket.on("new_friend_request", () => {
      alert("New Friend Request!");
      fetchRequests();
    });

    socket.on("online_users_list", (users) => {
      console.log("👥 Online Users:", users);
      setOnlineUsers(users);
    });

    socket.on("user_status_change", ({ userId, status }) => {
      console.log(`User ${userId} is ${status}`);
      updateUserStatus(userId, status);
    });

    return () => {
      socket.off("receive_message");
      socket.off("new_friend_request");
      socket.off("online_users_list");
      socket.off("user_status_change");
      disconnectSocket();
    };
  }, [
    addMessage,
    fetchConversations,
    fetchRequests,
    refreshAll,
    setOnlineUsers,
    token,
    updateUserStatus,
  ]);

  const renderSidebarContent = () => {
    switch (activeTab) {
      case "chats":
        return <Chats />;
      case "friends":
        return <AllFriends />;
      case "people":
        return <AllUsers />;
      case "requests":
        return <FriendRequests />;
      case "me":
        return <Me />;
      default:
        return null;
    }
  };

  const renderWindowContent = () => {
    switch (activeTab) {
      case "chats":
        return <ChatWindow />;
      case "friends":
        return <AllFriendsWindow />;
      case "people":
        return <AllUsersWindow />;
      case "requests":
        return <FriendRequestsWindow />;
      case "me":
        return <MeWindow />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-chat-list">
      <SidebarNav />
      <div className="w-80 bg-chat-list flex flex-col shadow-xl z-10">
        {renderSidebarContent()}
      </div>

      {renderWindowContent()}
    </div>
  );
}

import { useState } from "react";
import useChatStore from "../store/chatStore";
import { getSocket } from "../lib/socket";
import { Plus } from "lucide-react";
import { AvatarIcon, CreateGroupModal } from "./index";

export default function Chats() {
  const { conversations, activeChat, setActiveChat, fetchChatHistory } =
    useChatStore();
  const [showModal, setShowModal] = useState(false);

  const handleSelectChat = (chat) => {
    setActiveChat(chat);
    fetchChatHistory(chat.id);
    getSocket().emit("join_room", chat.id.toString());
  };

  return (
    <div className="flex-1 flex flex-col bg-chat-list border-r border-(--border-light)">
      <div className="h-16 px-4 bg-header flex justify-between items-center">
        <h2 className="font-bold text-xl text-main">Messages</h2>

        <button
          onClick={() => setShowModal(true)}
          className="icon-action p-2"
          title="New Group"
        >
          <Plus size={20} strokeWidth={2.5} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {conversations?.map((chat) => (
          <div
            key={chat.id}
            onClick={() => handleSelectChat(chat)}
            className={`p-4 cursor-pointer chat-item ${
              activeChat?.id === chat.id ? "active" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <AvatarIcon
                name={chat.name[0]}
                photo={chat.avatar}
                isGroup={chat.isGroup}
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-main mb-1">{chat.name}</h3>
                <p className="text-sm text-sub truncate">{chat.lastMessage}</p>
              </div>
            </div>
          </div>
        ))}

        {conversations.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-faint p-8">
            <p className="text-sm">No messages.</p>
          </div>
        )}
      </div>

      {showModal && <CreateGroupModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

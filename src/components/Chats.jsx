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
        {conversations.map((chat) => (
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
      </div>

      {showModal && <CreateGroupModal onClose={() => setShowModal(false)} />}
    </div>

    // <div className="flex-1 flex flex-col bg-white border-r border-gray-200">
    //   <div className="h-16 px-4 border-b border-gray-200 bg-linear-to-r from-gray-50 to-white flex justify-between items-center">
    //     <h2 className="font-bold text-xl text-gray-900">Messages</h2>
    //     <button
    //       onClick={() => setShowModal(true)}
    //       className="hover:bg-indigo-50 rounded-xl text-indigo-600 transition-all duration-200 hover:scale-110"
    //       title="New Group"
    //     >
    //       <Plus size={20} strokeWidth={2.5} />
    //     </button>
    //   </div>

    //   <div className="flex-1 overflow-y-auto">
    //     {conversations.map((chat) => (
    //       <div
    //         key={chat.id}
    //         onClick={() => handleSelectChat(chat)}
    //         className={`p-4 cursor-pointer transition-all duration-200 border-b border-gray-100 hover:bg-gray-50 ${
    //           activeChat?.id === chat.id
    //             ? "bg-linear-to-r from-indigo-50 to-purple-50 border-l-4 border-l-indigo-500"
    //             : ""
    //         }`}
    //       >
    //         <div className="flex items-center gap-3">
    //           <AvatarIcon
    //             name={chat.name[0]}
    //             photo={chat.avatar}
    //             isGroup={chat.isGroup}
    //           />

    //           {/* Chat Info */}
    //           <div className="flex-1 min-w-0">
    //             <h3 className="font-semibold text-gray-900 mb-1">
    //               {chat.name}
    //             </h3>
    //             <p className="text-sm text-gray-600 truncate">
    //               {chat.lastMessage}
    //             </p>
    //           </div>
    //         </div>
    //       </div>
    //     ))}
    //   </div>

    //   {showModal && <CreateGroupModal onClose={() => setShowModal(false)} />}
    // </div>
  );
}

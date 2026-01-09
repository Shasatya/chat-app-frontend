import {
  MessageSquare,
  Users,
  UserPlus,
  Bell,
  User,
  MessageCircleCode,
} from "lucide-react";
import useChatStore from "../store/chatStore";

export default function SidebarNav() {
  const { activeTab, setActiveTab, requests } = useChatStore();

  return (
    <div className="w-20 bg-sidebar flex flex-col items-center py-8 gap-2 z-20 shadow-2xl">
      <div className="mb-4 w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-indigo-900/50">
        <MessageCircleCode color="#FFFFFF" size={22} />
      </div>

      <div className="w-10 h-px bg-(--sidebar-border) mb-2"></div>

      <NavIcon
        icon={<MessageSquare size={22} />}
        active={activeTab === "chats"}
        onClick={() => setActiveTab("chats")}
      />
      <NavIcon
        icon={<Users size={22} />}
        active={activeTab === "friends"}
        onClick={() => setActiveTab("friends")}
      />
      <NavIcon
        icon={<UserPlus size={22} />}
        active={activeTab === "people"}
        onClick={() => setActiveTab("people")}
      />

      <div className="relative">
        <NavIcon
          icon={<Bell size={22} />}
          active={activeTab === "requests"}
          onClick={() => setActiveTab("requests")}
        />
        {requests.length > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-linear-to-br from-red-500 to-pink-500 rounded-full border-2 border-[#111827] flex items-center justify-center text-xs font-bold text-white shadow-lg">
            {requests.length}
          </span>
        )}
      </div>

      <div className="flex-1"></div>

      <div className="w-10 h-px bg-(--sidebar-border) mb-2"></div>

      <NavIcon
        icon={<User size={22} />}
        active={activeTab === "me"}
        onClick={() => setActiveTab("me")}
      />
    </div>
  );
}

function NavIcon({ icon, active, onClick }) {
  return (
    // <div className="relative group">
    //   <button
    //     onClick={onClick}
    //     className={`relative p-3.5 rounded-2xl transition-all duration-300 cursor-pointer ${
    //       active
    //         ? "bg-primary text-white shadow-lg shadow-indigo-900/50 scale-105"
    //         : "text-gray-400 hover:bg-gray-800 hover:text-white hover:scale-105"
    //     }`}
    //   >
    //     {icon}
    //     {active && (
    //       <div className="absolute inset-0 rounded-2xl bg-white/20 animate-pulse"></div>
    //     )}
    //   </button>
    // </div>

    <div className="relative group">
      <button
        onClick={onClick}
        className={`relative p-3.5 rounded-2xl cursor-pointer sidebar-item ${
          active ? "active" : ""
        }`}
      >
        {icon}
        {active && (
          <div className="absolute inset-0 rounded-2xl bg-white/20 animate-pulse"></div>
        )}
      </button>
    </div>
  );
}

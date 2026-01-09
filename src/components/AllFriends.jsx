import useChatStore from "../store/chatStore";
import { MessageSquare } from "lucide-react";
import AvatarIcon from "./AvatarIcon";

export default function AllFriends() {
  const { friends, startPrivateChat } = useChatStore();

  return (
    // <div className="flex-1 flex flex-col bg-white border-r border-gray-200">
    //   <div className="px-4 h-16 border-b border-gray-200 bg-linear-to-r from-gray-50 to-white flex justify-between items-center">
    //     <h2 className="font-bold text-xl text-gray-900">Friends</h2>
    //   </div>

    //   <div className="flex-1 overflow-y-auto">
    //     {friends.map((f) => (
    //       <div
    //         key={f.id}
    //         className="p-4 border-b border-gray-100 flex items-center justify-between hover:bg-gray-50 group cursor-pointer transition-all duration-200"
    //         onClick={() => startPrivateChat(f.id)}
    //       >
    //         <div className="flex items-center gap-3">
    //           <div className="relative">
    //             <AvatarIcon name={f.username[0]} photo={f.avatar} />
    //             <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
    //           </div>
    //           <span className="font-semibold text-gray-900">{f.username}</span>
    //         </div>

    //         <button className="text-gray-400 group-hover:text-indigo-600 transition-colors duration-200 p-2 hover:bg-indigo-50 rounded-lg">
    //           <MessageSquare size={20} />
    //         </button>
    //       </div>
    //     ))}
    //   </div>
    // </div>

    <div className="flex-1 flex flex-col bg-chat-list border-r border-(--border-light)">
      <div className="px-4 h-16 bg-header flex justify-between items-center">
        <h2 className="font-bold text-xl text-main">Friends</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {friends.map((f) => (
          <div
            key={f.id}
            className="p-4 chat-item flex items-center justify-between group cursor-pointer"
            onClick={() => startPrivateChat(f.id)}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <AvatarIcon name={f.username[0]} photo={f.avatar} />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-(--bg-chat-list)"></div>
              </div>
              <span className="font-semibold text-main">{f.username}</span>
            </div>
            <button className="text-faint group-hover:text-(--primary-color) transition-colors duration-200 p-2 hover:bg-(--bg-chat-active-from) rounded-lg">
              <MessageSquare size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

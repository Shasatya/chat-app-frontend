import { UserPlus } from "lucide-react";
import api from "../lib/api";
import useChatStore from "../store/chatStore";
import Button from "./Button";
import AvatarIcon from "./AvatarIcon";

const FriendRequests = () => {
  const { refreshAll, requests } = useChatStore();

  const acceptRequest = async (requestId) => {
    try {
      await api.post("/friends/accept", { requestId });
      refreshAll();
      alert("Friend Added!");
    } catch (e) {
      alert("Failed", e);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-chat-list border-r border-(--border-light)">
      <div className="px-4 h-16 bg-header flex items-center">
        <h2 className="font-bold text-xl text-main">Friend Requests</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {requests.map((req) => (
          <div
            key={req.id}
            className="p-4 chat-item flex justify-between items-center"
          >
            <div className="flex items-center gap-3">
              <AvatarIcon
                name={req?.sender?.username}
                photo={req?.sender?.avatar ? req?.sender?.avatar : null}
              />
              <span className="font-semibold text-main">
                {req.sender.username}
              </span>
            </div>

            <div>
              <Button
                onClick={() => acceptRequest(req.id)}
                text={"Accept"}
                className={"bg-primary shadow-sm hover:opacity-90"}
              />
            </div>
          </div>
        ))}

        {requests.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-faint p-8">
            <UserPlus size={48} className="mb-3 opacity-50" />
            <p className="text-sm">No pending requests.</p>
          </div>
        )}
      </div>
    </div>

    // <div className="flex-1 flex flex-col bg-white border-r border-gray-200">
    //   <div className="px-4 h-16 border-b border-gray-200 bg-linear-to-r from-gray-50 to-white flex items-center">
    //     <h2 className="font-bold text-xl text-gray-900">Friend Requests</h2>
    //   </div>

    //   <div className="flex-1 overflow-y-auto">
    //     {requests.map((req) => (
    //       <div
    //         key={req.id}
    //         className="p-4 border-b border-gray-100 flex justify-between items-center hover:bg-gray-50 transition-all duration-200"
    //       >
    //         <div className="flex items-center gap-3">
    //           {/* <div className="w-11 h-11 bg-linear-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md">
    //             {req.sender.username[0].toUpperCase()}
    //           </div> */}
    //           <AvatarIcon
    //             name={req?.sender?.username}
    //             photo={req?.sender?.avatar ? req?.sender?.avatar : null}
    //           />
    //           <span className="font-semibold text-gray-900">
    //             {req.sender.username}
    //           </span>
    //         </div>

    //         <div>
    //           <Button
    //             onClick={() => acceptRequest(req.id)}
    //             text={"Accept"}
    //             className={
    //               "bg-primary text-white"
    //             }
    //           />
    //         </div>
    //       </div>
    //     ))}

    //     {requests.length === 0 && (
    //       <div className="flex flex-col items-center justify-center h-full text-gray-400 p-8">
    //         <UserPlus size={48} className="mb-3 opacity-50" />
    //         <p className="text-sm">No pending requests.</p>
    //       </div>
    //     )}
    //   </div>
    // </div>
  );
};

export default FriendRequests;

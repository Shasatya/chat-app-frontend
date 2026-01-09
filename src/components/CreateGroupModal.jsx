import { useState } from "react";
import useChatStore from "../store/chatStore";
import { Users, X } from "lucide-react";
import Button from "./Button";
import AvatarIcon from "./AvatarIcon";

export default function CreateGroupModal({ onClose }) {
  const { friends, createGroup } = useChatStore();
  const [groupName, setGroupName] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);

  const toggleUser = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!groupName || selectedIds.length === 0)
      return alert("Please fill all fields");

    await createGroup(groupName, selectedIds);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="card-surface rounded-2xl w-full max-w-md shadow-2xl transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-(--border-subtle)">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Users size={20} className="text-white" />
            </div>
            <h2 className="font-bold text-xl text-main">Create Group</h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 icon-attach hover:bg-(--bg-chat-hover) rounded-lg transition-colors duration-200 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-label mb-2">
              Group Name
            </label>
            <input
              className="w-full input-primary p-3 rounded-xl transition-all duration-200"
              placeholder="e.g. Marketing Team"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-label mb-2">
              Select Members ({selectedIds.length} selected)
            </label>
            <div className="max-h-48 overflow-y-auto border border-(--border-light) rounded-xl p-3 space-y-2 bg-(--bg-chat-hover)">
              {friends.map((f) => (
                <label
                  key={f.id}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-(--bg-surface) cursor-pointer transition-colors duration-200"
                >
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(f.id)}
                    onChange={() => toggleUser(f.id)}
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
                  />
                  <AvatarIcon
                    name={f.username}
                    photo={f.avatar}
                    isGroup={false}
                  />
                  <span className="font-medium text-main select-none">
                    {f.username}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            type={"submit"}
            text={"Create Group"}
            className={"bg-primary py-3"}
          />
        </div>
      </div>
    </div>

    // <div
    //   className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    //   onClick={onClose}
    // >
    //   <div
    //     className="bg-white rounded-2xl w-full max-w-md shadow-2xl transform transition-all"
    //     onClick={(e) => e.stopPropagation()}
    //   >
    //     {/* Header */}
    //     <div className="flex justify-between items-center p-6 border-b border-gray-100">
    //       <div className="flex items-center gap-3">
    //         <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-400 to-pink-500 flex items-center justify-center">
    //           <Users size={20} className="text-white" />
    //         </div>
    //         <h2 className="font-bold text-xl text-gray-900">Create Group</h2>
    //       </div>
    //       <button
    //         onClick={onClose}
    //         className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
    //       >
    //         <X size={20} className="text-gray-500" />
    //       </button>
    //     </div>

    //     {/* Content */}
    //     <div className="p-6 space-y-5">
    //       <div>
    //         <label className="block text-sm font-semibold text-gray-700 mb-2">
    //           Group Name
    //         </label>
    //         <input
    //           className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
    //           placeholder="e.g. Marketing Team"
    //           value={groupName}
    //           onChange={(e) => setGroupName(e.target.value)}
    //         />
    //       </div>

    //       <div>
    //         <label className="block text-sm font-semibold text-gray-700 mb-2">
    //           Select Members ({selectedIds.length} selected)
    //         </label>
    //         <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-xl p-3 space-y-2 bg-gray-50">
    //           {friends.map((f) => (
    //             <label
    //               key={f.id}
    //               className="flex items-center gap-3 p-2 rounded-lg hover:bg-white cursor-pointer transition-colors duration-200"
    //             >
    //               <input
    //                 type="checkbox"
    //                 checked={selectedIds.includes(f.id)}
    //                 onChange={() => toggleUser(f.id)}
    //                 className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
    //               />
    //               <div className="w-8 h-8 bg-linear-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold text-xs">
    //                 {f.username[0].toUpperCase()}
    //               </div>
    //               <span className="font-medium text-gray-900">
    //                 {f.username}
    //               </span>
    //             </label>
    //           ))}
    //         </div>
    //       </div>

    //       <button
    //         onClick={handleSubmit}
    //         className="w-full bg-linear-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
    //       >
    //         Create Group
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
}

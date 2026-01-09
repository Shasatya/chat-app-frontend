import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { Loader2, MessageSquare, Paperclip, Send } from "lucide-react";
import useChatStore from "../store/chatStore";
import useUserStore from "../store/userStore";
import { getSocket } from "../lib/socket";
import api from "../lib/api";
import AvatarIcon from "./AvatarIcon";

export default function ChatWindow() {
  const { activeChat, messages, onlineUsers } = useChatStore();
  const { user } = useUserStore();

  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const fileInputRef = useRef(null);

  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (!activeChat) return;

    const socket = getSocket();
    if (!socket) return;

    socket.emit("join_room", activeChat.id.toString());

    const handleTyping = ({ userId, isTyping }) => {
      if (userId !== user.id) {
        setIsTyping(isTyping);
      }
    };

    socket.on("user_typing", handleTyping);

    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

    return () => {
      socket.off("user_typing", handleTyping);
      // socket.emit("leave_room", activeChat.id.toString());
    };
  }, [activeChat, messages, user.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);

    const socket = getSocket();
    if (!activeChat || !socket) return;

    socket.emit("typing_start", activeChat.id.toString());

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("typing_stop", activeChat.id.toString());
    }, 2000);
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const { data } = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const socket = getSocket();
      socket.emit("send_message", {
        conversationId: activeChat.id.toString(),
        content: "",
        attachment: data.url,
      });
    } catch (err) {
      alert("Failed to send image");
      console.error(err);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim() || !activeChat) return;

    const socket = getSocket();

    socket.emit("send_message", {
      conversationId: activeChat.id.toString(),
      content: inputText,
    });

    socket.emit("typing_stop", activeChat.id.toString());
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    setInputText("");
  };

  const isOnline =
    !activeChat?.isGroup &&
    activeChat?.otherUserId &&
    onlineUsers.has(activeChat?.otherUserId.toString());

  if (!activeChat) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-gray-300">
        <MessageSquare size={64} className="mb-4 opacity-20" />
        <p>Select a chat to start messaging</p>
      </div>
    );
  }

  return (
    // <div className="flex-1 flex flex-col bg-chat-hover relative">
    //   <div className="h-16 bg-header flex items-center px-4 justify-between shadow-sm z-1">
    //     <div className="flex items-center gap-3">
    //       <AvatarIcon
    //         name={activeChat.name[0]}
    //         photo={activeChat.avatar}
    //         isGroup={activeChat.isGroup}
    //       />
    //       <div>
    //         <h3 className="font-bold text-gray-800">{activeChat.name}</h3>
    //         {!activeChat?.isGroup && (
    //           <span
    //             className={`text-xs font-medium ${
    //               isOnline ? "text-green-500" : "text-gray-400"
    //             }`}
    //           >
    //             {isOnline ? "Online" : "Offline"}
    //           </span>
    //         )}
    //       </div>
    //     </div>
    //   </div>

    //   <div className="flex-1 overflow-y-auto p-4 space-y-2">
    //     {messages.map((msg, i) => {
    //       const isMe = msg.senderId === user.id;
    //       return (
    //         <div
    //           key={i}
    //           className={`flex ${isMe ? "justify-end" : "justify-start"}`}
    //         >
    //           <div
    //             className={`max-w-[70%] p-2 rounded-lg shadow-sm text-sm ${
    //               isMe
    //                 ? "bg-primary text-white rounded-tr-none"
    //                 : "bg-white text-gray-900 rounded-tl-none"
    //             }`}
    //           >
    //             {msg.attachment && (
    //               <div className="mb-1">
    //                 <img
    //                   src={msg.attachment}
    //                   alt="attachment"
    //                   className="rounded-md max-h-60 object-cover cursor-pointer hover:opacity-95"
    //                   onClick={() => window.open(msg.attachment, "_blank")}
    //                 />
    //               </div>
    //             )}

    //             {msg.content && <div>{msg.content}</div>}

    //             <div
    //               className={`text-[10px] mt-1 text-right ${
    //                 isMe ? "text-white" : "text-gray-500"
    //               }`}
    //             >
    //               {format(new Date(msg.createdAt), "HH:mm")}
    //             </div>
    //           </div>
    //         </div>
    //       );
    //     })}

    //     {isUploading && (
    //       <div className="flex justify-end">
    //         <div className="bg-[#d9fdd3] p-3 rounded-lg rounded-tr-none shadow-sm flex items-center gap-2">
    //           <Loader2 className="animate-spin h-4 w-4 text-gray-500" />
    //           <span className="text-xs text-gray-500">Sending image...</span>
    //         </div>
    //       </div>
    //     )}

    //     {isTyping && (
    //       <div className="flex justify-start animate-pulse">
    //         <div className="bg-white p-2 rounded-lg rounded-tl-none shadow-sm text-xs text-gray-500 italic">
    //           typing...
    //         </div>
    //       </div>
    //     )}
    //     <div ref={messagesEndRef} />
    //   </div>

    //   <form
    //     onSubmit={handleSend}
    //     className="p-3 bg-[#f0f2f5] flex gap-2 items-center"
    //   >
    //     <input
    //       type="file"
    //       ref={fileInputRef}
    //       className="hidden"
    //       accept="image/*"
    //       onChange={handleFileSelect}
    //     />
    //     <button
    //       type="button"
    //       onClick={() => fileInputRef.current.click()}
    //       className="p-3 text-gray-500 hover:bg-gray-200 rounded-full transition"
    //       title="Attach Image"
    //     >
    //       <Paperclip size={20} />
    //     </button>
    //     <input
    //       className="flex-1 p-3 bg-white rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
    //       placeholder="Type a message"
    //       value={inputText}
    //       onChange={handleInputChange}
    //     />
    //     <button
    //       type="submit"
    //       className="p-3 bg-primary text-white rounded-full transition cursor-pointer"
    //     >
    //       <Send size={18} />
    //     </button>
    //   </form>
    // </div>

    <div className="flex-1 flex flex-col bg-chat-hover relative">
      <div className="h-16 bg-header flex items-center px-4 justify-between shadow-sm z-1">
        <div className="flex items-center gap-3">
          <AvatarIcon
            name={activeChat.name[0]}
            photo={activeChat.avatar}
            isGroup={activeChat.isGroup}
          />
          <div>
            <h3 className="font-bold text-main">{activeChat.name}</h3>
            {!activeChat?.isGroup && (
              <span
                className={`text-xs font-medium ${
                  isOnline ? "text-green-500" : "text-faint"
                }`}
              >
                {isOnline ? "Online" : "Offline"}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, i) => {
          const isMe = msg.senderId === user.id;
          return (
            <div
              key={i}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] p-2 rounded-lg shadow-sm text-sm ${
                  isMe
                    ? "bg-primary text-white rounded-tr-none"
                    : "card-surface text-main rounded-tl-none"
                }`}
              >
                {activeChat.isGroup && !isMe && (
                  <div className="text-xs font-bold mb-1 text-primary">
                    {msg.sender?.username}
                  </div>
                )}

                {msg.attachment && (
                  <div className="mb-1">
                    <img
                      src={msg.attachment}
                      alt="attachment"
                      className="rounded-md max-h-60 object-cover cursor-pointer hover:opacity-95"
                      onClick={() => window.open(msg.attachment, "_blank")}
                    />
                  </div>
                )}

                {msg.content && <div>{msg.content}</div>}

                <div
                  className={`text-[10px] mt-1 text-right ${
                    isMe ? "text-white" : "text-muted"
                  }`}
                >
                  {format(new Date(msg.createdAt), "HH:mm")}
                </div>
              </div>
            </div>
          );
        })}

        {isUploading && (
          <div className="flex justify-end">
            <div className="bg-primary text-white p-3 rounded-lg rounded-tr-none shadow-sm flex items-center gap-2">
              <Loader2 className="animate-spin h-4 w-4 text-white" />
              <span className="text-xs">Sending image...</span>
            </div>
          </div>
        )}

        {isTyping && (
          <div className="flex justify-start animate-pulse">
            <div className="card-surface p-2 rounded-lg rounded-tl-none shadow-sm text-xs text-muted italic">
              typing...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSend}
        className="p-3 message-bar flex gap-2 items-center"
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileSelect}
        />

        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className="p-3 icon-attach cursor-pointer"
          title="Attach Image"
        >
          <Paperclip size={20} />
        </button>

        <input
          className="flex-1 p-3 input-primary rounded-lg text-sm"
          placeholder="Type a message"
          value={inputText}
          onChange={handleInputChange}
        />

        <button
          type="submit"
          className="p-3 bg-primary text-white rounded-full transition cursor-pointer hover:opacity-90"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}

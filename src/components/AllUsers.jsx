import { useState } from "react";
import api from "../lib/api";
import { Search } from "lucide-react";
import AvatarIcon from "./AvatarIcon";
import Button from "./Button";
import useChatStore from "../store/chatStore";

const AllUsers = () => {
  const { refreshAll } = useChatStore();

  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchUsers = async (query) => {
    setSearchQuery(query);
    if (query.length > 2) {
      try {
        const { data } = await api.get(`/users/search?query=${query}`);
        setSearchResults(data);
      } catch (e) {
        console.log(e);
      }
    } else {
      setSearchResults([]);
    }
  };

  const sendRequest = async (username) => {
    try {
      await api.post("/friends/request", { targetUsername: username });
      alert("Request Sent!");
      setSearchQuery("");
      setSearchResults([]);
    } catch (e) {
      alert(e.response?.data?.error);
    }
  };

  const acceptRequest = async (requestId) => {
    try {
      await api.post("/friends/accept", { requestId });
      refreshAll();
      alert("Friend Added!");
    } catch (e) {
      alert("Failed", e);
    }
  };

  const getButtonType = (status, username, id) => {
    if (status === "FRIEND") {
      return <span className="text-primary text-sm font-semibold">Friend</span>;
    } else if (status === "SENT") {
      return (
        <span className="text-primary text-sm font-semibold">Request Sent</span>
      );
    } else if (status === "RECEIVED") {
      return (
        <Button
          onClick={() => acceptRequest(id)}
          text={"Accept"}
          className={"bg-primary"}
        />
      );
    } else {
      return (
        <Button
          onClick={() => sendRequest(username)}
          text={"Add"}
          className={"bg-primary"}
        />
      );
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-chat-list border-r border-(--border-light)">
      <div className="px-4 h-16 bg-header flex items-center">
        <h2 className="font-bold text-xl text-main">Find People</h2>
      </div>

      <div className="p-4 border-b border-(--border-subtle)">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-faint"
            size={18}
          />
          <input
            className="w-full pl-10 pr-4 py-2.5 bg-(--bg-message-bar) rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-(--bg-surface) transition-all duration-200 text-sm text-main placeholder:text-muted"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => handleSearchUsers(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {searchResults.map((u) => (
          <div
            key={u?.id}
            className="p-4 chat-item flex justify-between items-center transition-all duration-200"
          >
            <div className="flex justify-between items-center gap-3">
              <AvatarIcon
                name={u?.username}
                photo={u?.avatar ? u?.avatar : null}
              />
              <span className="font-semibold text-main">{u?.username}</span>
            </div>
            <div>{getButtonType(u?.status, u?.username, u?.id)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;

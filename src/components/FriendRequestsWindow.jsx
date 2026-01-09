import { Bell } from "lucide-react";

const FriendRequestsWindow = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-gray-300">
      <Bell size={64} className="mb-4 opacity-20" />
      <p>Your friend requests will appear here!</p>
    </div>
  );
};

export default FriendRequestsWindow;

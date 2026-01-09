import { Users } from "lucide-react";

const AllFriendsWindow = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-gray-300">
      <Users size={64} className="mb-4 opacity-20" />
      <p>Here you can see all your friends.</p>
    </div>
  );
};

export default AllFriendsWindow;

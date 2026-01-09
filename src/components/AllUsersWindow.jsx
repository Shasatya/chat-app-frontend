import { UserPlus } from "lucide-react";

const AllUsersWindow = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-gray-300">
      <UserPlus size={64} className="mb-4 opacity-20" />
      <p>Search for people you can chat with!</p>
    </div>
  );
};

export default AllUsersWindow;

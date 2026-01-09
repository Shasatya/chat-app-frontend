import { User } from "lucide-react";

const MeWindow = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-gray-300">
      <User size={64} className="mb-4 opacity-20" />
      <p>Manage and personalize your profile here!</p>
    </div>
  );
};

export default MeWindow;

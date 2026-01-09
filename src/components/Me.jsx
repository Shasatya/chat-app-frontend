import { Camera, Loader2 } from "lucide-react";
import useUserStore from "../store/userStore";
import { useRef, useState } from "react";
import Button from "./Button";
import ThemeToggle from "./ThemeToggle";

const Me = () => {
  const { user, logout, uploadAvatar } = useUserStore();
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    setIsUploading(true);
    const success = await uploadAvatar(file);
    setIsUploading(false);

    if (success) {
      alert("Profile picture updated!");
    } else {
      alert("Failed to upload image");
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-chat-list border-r border-(--border-light)">
      <div className="px-4 h-16 bg-header flex items-center">
        <h2 className="font-bold text-xl text-main">Me</h2>
      </div>

      <div className="flex flex-col items-center">
        <div
          className="relative group cursor-pointer my-4"
          onClick={() => fileInputRef.current.click()}
        >
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-(--bg-chat-list) shadow-xl bg-primary flex items-center justify-center text-5xl font-bold text-white relative transition-transform duration-300 group-hover:scale-105">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span>{user?.username?.[0]?.toUpperCase()}</span>
            )}

            {isUploading && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20 rounded-full">
                <Loader2 className="animate-spin text-white" size={32} />
              </div>
            )}
          </div>

          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-transparent rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
            <div className="text-center">
              <Camera className="text-white mx-auto mb-1" size={24} />
              <span className="text-white text-xs font-medium">Change</span>
            </div>
          </div>

          <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-4 border-(--bg-chat-list) shadow-lg"></div>

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileSelect}
          />
        </div>

        <h1 className="text-3xl font-bold text-main mb-2">{user?.username}</h1>

        <div className="flex items-center gap-2 text-sm text-green-600 font-medium mb-4">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          Online Status: Active
        </div>

        <div className="w-full flex flex-col gap-4 py-2 px-4">
          <ThemeToggle />
          <Button
            onClick={() => {
              alert("Coming Soon!");
            }}
            text={"Edit Profile"}
            className={"bg-primary"}
          />

          <Button
            onClick={() => {
              logout();
              window.location.href = "/";
            }}
            text={"Logout"}
            className={"bg-red-600"}
          />
        </div>
      </div>
    </div>
  );
};

export default Me;

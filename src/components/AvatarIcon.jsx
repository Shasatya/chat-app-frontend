const AvatarIcon = ({ name = "", photo, isGroup = false }) => {
  return (
    <div
      className={`w-12 h-12 rounded-full shrink-0 overflow-hidden flex items-center justify-center text-white font-semibold bg-linear-to-br ${
        isGroup ? "bg-primary" : "bg-primary"
      }`}
    >
      {photo ? (
        <img src={photo} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span className="text-sm">{name?.[0]?.toUpperCase()}</span>
      )}
    </div>
  );
};

export default AvatarIcon;

const Button = ({ onClick, text, className = "", type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 bg-linear-to-r text-white cursor-pointer ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;

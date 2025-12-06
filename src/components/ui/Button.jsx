const Button = ({
  children,
  type = "button",
  onClick = () => { },
  variant = "primary",
  className = "",
  ...props
}) => {
  let styles =
    "px-4 py-1.5 border-[1.5px] rounded-md font-medium transition duration-300 hover:scale-105 hover:shadow-md ";

  if (variant === "primary") {
    styles += "btn-gradient text-white border-none";
  } else if (variant === "secondary") {
    styles += "bg-base-100 text-base-content border-0 border-base-100";
  } else if (variant === "outline") {
    styles += "text-gradient border-2 border-transparent bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-border";
  } else if (variant === "danger") {
    styles += "bg-red-500 text-white border-0 border-red-500 hover:shadow-md";
  } else {
    styles += "bg-gray-200 text-black";
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

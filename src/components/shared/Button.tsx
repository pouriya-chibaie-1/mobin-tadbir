import { Button, ButtonProps } from "flowbite-react";
import React from "react";

interface CustomButtonProps extends ButtonProps {
  extendedClass?: string;
  textColor?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  outline,
  color,
  textColor,
  extendedClass,
  ...props
}) => {
  const colors: Record<string, string> = {
    primaryColor: "#034CA0",
    secondaryColor: "#0D6EFD",
    errorColor: "#B3261E",
  };

  // Determine the text color class based on the color prop
  const textColorClass = outline ? `text-[${colors[color ?? "#fff"]}]` : "";

  return (
    <Button
      {...props}
      color={color}
      outline={outline}
      className={`btn ${textColorClass} ${extendedClass} hover:text-white`}
      style={{ color: outline? colors[color ?? "primaryColor"]:textColor??"#fff" }}
    >
      {children}
    </Button>
  );
};

export default CustomButton;

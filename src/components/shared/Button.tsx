import { Button, ButtonProps } from "flowbite-react";
import React from "react";

interface CustomButtonProps extends ButtonProps {
  extendedClass?: string;
  textColor?: string;
  color: string;
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
 const hoverColor: Record<string, string> = {
  primaryColor: "#02336b",
  secondaryColor: "#0148b1",
  errorColor: "#781914",
 }
  // Determine the text color class based on the color prop
  const textColorClass = outline ? `text-[${colors[color]}]` : "";
  const bgColorClassHover = !outline ? `bg-[${hoverColor[color ?? "#fff"]}]` : "";
console.log("bgColorClassHover",bgColorClassHover);
  return (
    <Button
      {...props}
      color={color}
      outline={outline}
      className={`btn ${textColorClass}  ${extendedClass} hover:text-white hover:${bgColorClassHover??""} `}
      style={{ color: outline? colors[color ?? "primaryColor"]:textColor??"#fff" }}
    >
      {children}
    </Button>
  );
};

export default CustomButton;

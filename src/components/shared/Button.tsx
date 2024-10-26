import { Button, ButtonProps } from "flowbite-react";
import React from "react";
interface CustomButtonProps extends ButtonProps {
  extendedClass?: string;
}
const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  outline,
  color,
  extendedClass,
  ...props
}) => {
  const colors: any = {
    primaryColor: "#034CA0",
    secondaryColor: "#0D6EFD",
    errorColor: "#B3261E",
  };
  const textColor = `text-[${colors[color ?? "primaryColor"]}]`;
  return (
    <>
      <Button
        {...props}
        color={color}
        outline={outline}
        className={`${outline ? textColor : ""} ${extendedClass} hover:text-white`}
        style={{ color: colors[color ?? "primaryColor"] }}
      >
        {children}
      </Button>
    </>
  );
};

export default CustomButton;

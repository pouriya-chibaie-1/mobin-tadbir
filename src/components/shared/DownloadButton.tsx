import { useState } from "react";
import DownloadIcon from "../../assets/icon/download";
import CustomButton from "./Button";
import { ButtonProps } from "flowbite-react";
interface CustomButtonProps extends ButtonProps {
    extendedClass?: string;
  }
  
const DownloadButton :React.FC<CustomButtonProps>= ({children,extendedClass,...props}:any) => {
    const[isHover, setIsHover] = useState(false);
  return (
    <CustomButton
     onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      extendedClass={extendedClass}
      color="secondaryColor"
      outline={true}
      {...props}
    >
      <span className="flex gap-2 text-inherit">
        <DownloadIcon fill={isHover ? "#fff" : "#0D6EFD"} />{children}
      </span>
    </CustomButton>
  );
};

export default DownloadButton;

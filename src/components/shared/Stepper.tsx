import type { StepperInterface } from "../../types/component/Stepper";
import tick from '../../assets/icon/tick-circle-stepper.svg';
import { convertToPersian } from "../../utils/convertToPersian";
const Stepper = ({ items, activeStep }: StepperInterface) => {
  return (
    <div className="flex rounded-sm ">
      {items.map((item, index) => (
        <>
          <div 
            key={index}
            className={`relative  bg-[#E7EFF7]  w-full ${items.length - 1 == index ? "max-w-[156px]" : "max-w-[190px]"} h-10  flex-center gap-1`}
          >
            <span className={`text-sm w-6 h-6 ml-1 ${activeStep == index + 1?"":"bg-primary-color"} text-white rounded-full flex-center  font-bold`}>
              {activeStep == index + 1 ? <img src={tick} className="w-6 h-6"/> :convertToPersian(index + 1)}
            </span>
            {index == items.length - 1 && (
              <div className="absolute left-[7px] z-50 w-3 h-10 bg-[#E7EFF7]"></div>
            )}

            <span className="text-sm text-primary-color font-semibold">
              {item}
            </span>
            {index != items.length - 1 ? (
              <img
                src="/src/assets/right-arrow.svg"
                alt="1"
                className="absolute left-0 z-50 w-10 h-10 rotate-180 "
              />
            ) : (
           <div className="w-[28px] h-[28px] bg-[#E7EFF7] rotate-45 relative right-[16px]"></div>
            )}
          </div>
        </>
      ))}
    </div>
  );
};

export default Stepper;

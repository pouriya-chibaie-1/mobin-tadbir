import arrowRight from "../assets/icon/arrow-right.svg";

import {  useSelector } from "react-redux";
import Stepper from "../components/shared/Stepper";

import Uploader from "../components/shared/Uploader";

import AddUser from "../components/extras/AddUser";
import ReceivePassword from "../components/extras/ReceivePassword";
import { handleDownload } from "../utils/handleDownload";
import DownloadButton from "../components/shared/DownloadButton";

const Home = () => {
  const { users, errorMessages, step } = useSelector(
    (state: any) => state.users
  );

  console.log("errorMessages", errorMessages);
  return (
    <div className="flex flex-col">
      <h1 className="text-primary-color text-[24px] font-bold mb-10 flex gap-2 items-center">
        <img src={arrowRight} alt="1" />
        افزودن کاربر جدید به سازمان “اسنپ فود”
      </h1>
      <h3 className="text-subtitle-color text-base font-medium">
        افرودن گروهی کاربران
      </h3>
      <div className="mb-[30px] mt-4">
        <Stepper
          activeStep={step}
          items={["انتخاب روش", "تکمیل اطلاعات", "دریافت رمز عبور"]}
        />
      </div>
      {step != 3 && (
        <div className="flex w-full justify-between items-center">
          <p className="text-text-color text-sm font-medium mt-[30px] mb-[40px]">
            لطفا قالب نمونه اکسل را دانلود و پس از تکمیل آن را بارگذاری کنید.{" "}
          </p>
          <DownloadButton onClick={() => handleDownload('../../public/template.xlsx')}> دانلود قالب اماده اکسل</DownloadButton>
        </div>
      )}

      {step === 1 && <Uploader />}
      {step === 2 && users.length > 0 && <AddUser />}
      {step === 3 && <ReceivePassword />}

    </div>
  );
};

export default Home;

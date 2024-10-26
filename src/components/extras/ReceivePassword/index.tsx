import { useDispatch, useSelector } from "react-redux";
import Table from "../../shared/Table";
import visible from "../../../assets/icon/eye.svg";
import invisible from "../../../assets/icon/invisible.svg";
import copy from "../../../assets/icon/copy.svg";
import share from "../../../assets/icon/share.svg";
import { setPasswordVisible } from "../../../redux/slices/userSlice";
import done from "../../../assets/icon/done.svg";
import { handleDownloadExcel } from "../../../utils/generateExcel";
import DownloadButton from "../../shared/DownloadButton";
const ReceivePassword = () => {
  const dispatch = useDispatch();
  const columns = [
    {
      name: "name",
      faName: "نام کاربر",
    },
    {
      name: "email",
      faName: "نام کاربری",
    },
    {
      name: "password",
      faName: "رمز عبور اولیه",
    },
  ];

  const actions = [
    {
      label: (row: any) => (
        <img src={row?.passwordVisible ? visible : invisible} alt="Eye Icon" />
      ),
      handler: (row: any) => {
        dispatch(setPasswordVisible(row.id));
      },
    },
    {
      label: () => <img src={copy} alt="Copy Icon" />,
      handler: (row: any) => {
        navigator.clipboard.writeText(row.password);
      },
    },
    {
      label: () => <img src={share} alt="Share Icon" />,
      handler: (row: any) => {
        navigator.clipboard.writeText(row.password);
      },
    },
  ];
  const { users } = useSelector((state: any) => state.users);
  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <img src={done} alt="done" />
        <div className="flex flex-col items-center gap-4 pb-5">
          <p className="font-semibold">
            کاربران جدید با موفقیت به سازمان اضافه شدند.
          </p>
          <p className="text-gray-500 text-sm">
            رمز عبور برای کاربران پیامک شد. اما شما هم می‌توانید رمز را برای
            آن‌ها ارسال کنید. همچنین امکان دانلود جدول زیر برای شما وجود دارد.
          </p>
        </div>
        <div className="w-full flex-center mb-6">
          <DownloadButton
            extendedClass="w-[754px] "
            color="secondaryColor"
            outline
            onClick={() =>
              handleDownloadExcel(
                users.map((user: any) => {
                  return {
                    name: user.name,
                    email: user.email,
                    password: user.password,
                  };
                })
              )
            }
          >
            دانلود فایل اکسل
          </DownloadButton>
        </div>
      </div>
      <div className="w-full flex justify-center ">
        <Table
          columns={columns}
          rows={users}
          actions={actions}
          errorMessages={[]}
          extendedClass="max-w-[754px]"
        ></Table>
      </div>
    </>
  );
};

export default ReceivePassword;

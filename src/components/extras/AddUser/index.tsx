import { convertToPersian } from "../../../utils/convertToPersian";
import {
  deleteUser,
  deleteUsersWithErrors,
  receivePassword,
} from "../../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import trick from "../../../assets/icon/tick-circle.svg";
import close from "../../../assets/icon/close.svg";
import trash from "../../../assets/icon/trash.svg";
import Table from "../../shared/Table";
const AddUser = () => {
  const dispatch = useDispatch();
  const { errorMessages, users } = useSelector((state: any) => state.users);
  const columns = [
    { name: "name", faName: "نام کاربر" },
    { name: "email", faName: "نام کاربری" },
    { name: "phoneNumber", faName: "شماره همراه" },
    { name: "country", faName: "کشور" },
    { name: "limit", faName: "سقف حجم" },
  ];
  const actions = [
    {
      label: (row: any) => (
        <img src={errorMessages[row?.id] ? close : trick} alt="Action Icon" />
      ),
      handler: (row: any) => {
        console.log("row", row);
      },
    },
    {
      label: () => <img src={trash} alt="Delete Icon" />,
      handler: (row: any) => {
        dispatch(deleteUser(row?.id));
      },
    },
  ];
  return (
    <>
      <Table
        rows={users}
        columns={columns}
        actions={actions}
        errorMessages={errorMessages}
      ></Table>

      <div className="w-full flex gap-5 mt-[30px]">
        <button
          type="button"
          onClick={() => {
            dispatch(receivePassword());
          }}
          disabled={Object.keys(errorMessages).length === 0 ? false : true}
          className={`btn w-1/2 text-white bg-primary-color disabled:cursor-not-allowed  ${Object.keys(errorMessages).length === 0 ? "hover:bg-blue-900 focus:ring-4" : ""} focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}
        >
          {Object.keys(errorMessages).length === 0 ? (
            <span>
              {" "}
              افزودن{" "}
              <span className="mx-1">
                {convertToPersian(users?.length)}
              </span>{" "}
              کاربر به سازمان{" "}
            </span>
          ) : (
            "افزودن کاربران به سازمان"
          )}
        </button>
        <button
          onClick={() => {
            dispatch(deleteUsersWithErrors());
          }}
          type="button"
          className=" w-1/2 font-bold text-error-color hover:text-white border border-error-color hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300  rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
        >
          حذف کاربران دارای خطا
        </button>
      </div>
    </>
  );
};

export default AddUser;

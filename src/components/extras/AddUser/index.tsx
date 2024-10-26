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
import CustomButton from "../../shared/Button";
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
        <CustomButton
          onClick={() => {
            dispatch(receivePassword());
          }}
          extendedClass=" w-1/2 h-10"
          disabled={Object.keys(errorMessages).length === 0 ? false : true}
          color="primaryColor"
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
        </CustomButton>
        <CustomButton
          onClick={() => {
            dispatch(deleteUsersWithErrors());
          }}
          color="errorColor"
          extendedClass="w-1/2 h-10"
          outline
        >
          حذف کاربران دارای خطا
        </CustomButton>
      </div>
    </>
  );
};

export default AddUser;

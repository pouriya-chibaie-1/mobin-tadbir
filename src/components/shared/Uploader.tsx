import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import cloud from "../../assets/icon/cloud-upload.svg";
import toast, { Toaster } from "react-hot-toast";

// import excel from '../../assets/icon/excel.svg';
import trash from "../../assets/icon/trash.svg";
import * as XLSX from "xlsx";
import { useDispatch, useSelector } from "react-redux";
import {
  completeInformation,
  setErrorMessages,
  setUser,
} from "../../redux/slices/userSlice";
import { usersSchema } from "../../validation/users";
import { nanoid } from "nanoid";

const Uploader = () => {
  const [tempFile, setTempFile] = useState<File | null>(null);
  const dispatch = useDispatch();
  const { users, errorMessages } = useSelector((state: any) => state.users);
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const jsonData: any = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
        });
        const arrOfObj = [];

        for (let i = 1; i < jsonData.length; i++) {
          arrOfObj.push({
            id: nanoid(16),
            limit: jsonData[i][0],
            country: jsonData[i][1],
            phoneNumber: jsonData[i][3],
            email: jsonData[i][4],
            name: jsonData[i][5],
          });
        }
        if (jsonData[0].length == 6) {
          dispatch(setUser(arrOfObj));
          
        } else {
          toast.error("قالب فایل اشتباه است");
        }
      } catch (error) {
        console.error("Error reading file:", error);
      }
    };

    reader.onerror = (error) => {
      console.error("Error loading file:", error);
    };
    reader.readAsArrayBuffer(file);
  };
  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      handleFileUpload({ target: { files: [file] } } as any);
      setTempFile(file);
    }
  };


  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.ms-excel": [],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
    },
    multiple: false,
  });

  const clickSchema = () => {
    usersSchema.validate(users, { abortEarly: false }).catch((err) => {
      const formattedErrors = err.inner.reduce((acc: any, error: any) => {
        const index = error.path.match(/\[(\d+)\]/)[1];
        const field = error.path.split(".").pop();
        const errorMessage = error.message;

        if (!acc[index]) {
          acc[index] = {};
        }

        if (!acc[index][field]) {
          acc[index][field] = [];
        }

        acc[index][field].push(errorMessage);

        return acc;
      }, {});
      const newObj: any = {};
      Object.keys(formattedErrors).forEach((key) => {
        newObj[users[key].id] = formattedErrors[key];
        console.log(`formattedErrors[${key}]`, formattedErrors[key]);
      });
      dispatch(setErrorMessages(newObj));
    });
  };
  useEffect(() => {
    if (users && users.length > 0) {
      clickSchema();
    }
  }, [users]);
  useEffect(() => {
    if (users && users.length > 0) {
      dispatch(completeInformation());
    }
  }, [errorMessages]);

  return (
    <div>
      {tempFile && users.length>0 ? (
        <div className="flex-center cursor-pointer  border-[2px] border-dashed border-gray-300 duration-200 rounded-xl w-full min-h-[15rem]">
          <div className="flex items-center gap-2">
            <div className="flex flex-row-reverse items-center gap-2 bg-gray-200 p-3 rounded-md shadow-md">
              {/* <img src={excel} alt="excel" className="w-10 h-10" /> */}
              <p>{tempFile.name}</p>
            </div>
            <button
              onClick={() => setTempFile(null)}
              className="text-red-500 btn-error"
            >
              <img src={trash} alt="trash" className="w-7 h-7" />
            </button>
          </div>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`flex-center cursor-pointer border-[2px] border-dashed border-gray-300 duration-200 rounded-xl w-full min-h-[15rem] ${isDragActive ? "bg-gray-300 bg-opacity-80" : ""}`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-5">
            <img src={cloud} alt="cloud" className="w-20 h-20" />
            <p
              className={`${isDragActive ? "text-gray-600" : "text-slate-800"} text-center`}
            >
              برای بارگذاری فایل کلیک کنید و یا فایل را بکشید و اینجا رها کنید.
            </p>
          </div>
        </div>
      )}
      <div className="w-full bg-red-400">

            <Toaster
             position="top-center"
             toastOptions={{
               duration: 50000, 
              }} />

              </div>
    </div>
  );
};

export default Uploader;

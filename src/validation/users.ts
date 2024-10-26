import * as Yup from "yup";

export const usersSchema = Yup.array().of(
  Yup.object().shape({
    id: Yup.string().required("شناسه اجباری است"),
    name: Yup.string()
      .required("نام کاربر اجباری است")
      .min(3, "نام باید حداقل 3 کاراکتر باشد")
      .max(255, "نام نباید بیشتر از 255 کاراکتر باشد"),

    limit: Yup.number()
      .required("سقف حجم اجباری است")
      .min(0, "سقف حجم نباید کمتر از 0 باشد")
      .max(10, "سقف حجم نباید بیشتر از 10 باشد"),

    email: Yup.string().required("email اجباری است").email("ایمیل صحیح نیست"),

    phoneNumber: Yup.string()
      .required("شماره همراه اجباری است")
      .matches(/^\d{10}$/, "شماره همراه صحیح نیست"),
    country: Yup.string().required("کشور اجباری است"),
  })
);

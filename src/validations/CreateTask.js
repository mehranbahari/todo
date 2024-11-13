import * as yup from "yup";

export const CreateTaskVal = yup.object().shape({
  name: yup.string().required("لطفا نام پروژه را وارد کنید"),
  description: yup.string().required("لطفا موضوع پروژه را وارد کنید"),
  dueDate: yup.string().required("لطفا تاریخ تسک را وارد کنید"),
  status: yup.string().required("لطفا وضعیت تسک را وارد کنید"),
});

import * as yup from "yup";

export const CreateProjectVal = yup.object().shape({
  name: yup.string().required("لطفا نام پروژه را وارد کنید"),
  description: yup.string().required("لطفا موضوع پروژه را وارد کنید"),
});

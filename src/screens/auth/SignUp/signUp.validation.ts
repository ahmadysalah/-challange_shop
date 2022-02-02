import * as yup from "yup";

export const formSchema = () =>
  yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup.string().email().required("Email address is required"),
    password: yup.string().required("Password is required")
      .min(8, 'Password should be 8 digits length at least')
      .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Password should be contains number, capital letter and symbole'),
    passwordConfirmation: yup
      .string()
      .required("Password Confirmation is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
  });

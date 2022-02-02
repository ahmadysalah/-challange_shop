import * as yup from "yup";

export const updateUserSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(8, 'Password should be 8 digits length at least')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]$/, 'Password should be contains capital letter and number'),
  isAdmin: yup.boolean().required("Please select one of them"),
  dateOfBirth: yup.date().required('Required').max(new Date(), "Are you a time traveler?!"),
});

import * as yup from "yup";

export const formSchema = yup.object().shape({
  country: yup.string().required("Country is required"),
  city: yup.string().required("City is required"),
  zipCode: yup
    .number()
    .min(1000, "Zip Code must be at least 4 digits")
    .max(99999, "Zip Code must be at maximum 5 digits")
    .required("Zip Code is required"),
  streetAddress: yup.string().required("Street Address is required"),
  name: yup.string().required("Card Holder Name is required"),
  hasNumber: yup.boolean().required("Card Number is required"),
  hasExpiry: yup.boolean().required("Expiry Date is required"),
  hasCvc: yup.boolean().required("CVC is required"),
});
export interface Payment extends yup.InferType<typeof formSchema> {}

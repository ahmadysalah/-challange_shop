import { Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import * as yup from "yup";
import { Button } from "../../../../components/Button/Button.style";
import FormInput from "../../../../components/common/FormInput";
import { changePassword } from "../../../../redux/actions/auth.actions";
import { AppState } from "../../../../redux/store";
import { notify } from "../../../../utils/helpers";
import { FormWrapper } from "../../../auth/signIn/SignIn.styled";

const changeformSchema = () =>
  yup.object().shape({
    password: yup.string().required("Password is required"),
    passwordConfirmation: yup
      .string()
      .required("Password Confirmation is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
  });

const ChangePasswordForm = styled(FormWrapper)`
  margin-right: 0;
  @media (max-width: 1500px) {
    width: 100%;
  }
`;

export default function ChangePassword({
  handleClose,
}: {
  handleClose?: Function;
}) {
  const dispatch = useDispatch();
  const {
    auth: { user },
  } = useSelector((state: AppState) => state);

  const handleSubmit = useCallback(
    (values) => {
      dispatch(
        changePassword({ ...user, ...values }, () => {
          notify("success", "Password changed successfully");
          handleClose?.();
        })
      );
    },
    [dispatch, user, handleClose]
  );

  return (
    <ChangePasswordForm>
      <Formik
        initialValues={{
          password: "",
          passwordConfirmation: "",
        }}
        validationSchema={changeformSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <Typography variant="h4" color={"text.primary"}>
              Change password{" "}
            </Typography>
            <FormInput
              label={"Enter New password"}
              type="password"
              placeholder="******"
              name="password"
            />
            <FormInput
              name="passwordConfirmation"
              type="password"
              placeholder="******"
              label={"Confirm your password"}
            />
            <Button
              width="150px"
              fontSize="20px"
              style={{ marginTop: "10px", alignSelf: "flex-end" }}
              type="submit"
            >
              Confirm
            </Button>
          </Form>
        )}
      </Formik>
    </ChangePasswordForm>
  );
}

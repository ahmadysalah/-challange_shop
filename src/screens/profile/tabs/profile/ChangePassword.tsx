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
import { Row, Column } from "../../../../components/GlobalStyles";


const changeformSchema = () =>
  yup.object().shape({
    email: yup.string().email().required("Email address is required"),
    firstName: yup.string().required("First Name  is required"),
    lastName: yup.string().required("Last Name  is required"),
    password: yup.string().min(8, 'Password should be 8 digits length at least')
      .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]$/, 'Password should be contains capital letter and number'),
    passwordConfirmation: yup.string()
      .required("Password Confirmation is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
    dateOfBirth: yup.date().required('Required').max(new Date(), "Are you a time traveler?!"),
  });

const ChangePasswordForm = styled('div')`
  gap: 50px;
  & form {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 10px;
  }

  @media (max-width: 1500px) {
    width: 100%;
    margin-right: 3em;
  }

  @media (max-width: 768px) {
    margin: auto;
    width: 80%;
    padding: 20px 0;
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
          notify("success", " Update user successfully");
          handleClose?.();
        })
      );
    },
    [dispatch, user, handleClose]
  );

  return (
    <ChangePasswordForm>
      <Formik
        enableReinitialize
        initialValues={{
          firstName: user.firstName,
          lastName: user.lastName,
          password: '',
          email: user.email,
          dateOfBirth: user.dateOfBirth,
          passwordConfirmation: ""
        }}
        validationSchema={changeformSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <Typography variant="h4" color={"text.primary"}>
              Change Profile{" "}
            </Typography>
            <Row justfiyContent="flex-start" width="100%" gap="10%" wrap>
              <Column justfiyContent="flex-start" width="100%">
                <FormInput
                  label={"First Name"}
                  type="text"
                  name="firstName"
                />
              </Column>
              <Column justfiyContent="flex-start" width="100%">
                <FormInput
                  label={"LastName"}
                  type="text"
                  name="lastName"
                />
              </Column>
            </Row>
            <Row justfiyContent="flex-start" width="100%" gap="10%" wrap>
              <Column justfiyContent="flex-start" width="100%">
                <FormInput
                  label={"Email"}
                  type="text"
                  name="email"
                />
              </Column>
              <Column justfiyContent="flex-start" width="100%">
                <FormInput
                  label={"Date  of  Birthday "}
                  type="date"
                  name="dateOfBirth"
                />
              </Column>
            </Row>
            <Row justfiyContent="flex-start" width="100%" gap="10%" wrap>
              <Column justfiyContent="flex-start" width="100%">

                <FormInput
                  name="password"
                  type="password"
                  placeholder="******"
                  label={"Enter your password"}
                />
              </Column>
            </Row>
            <Row justfiyContent="flex-start" width="100%" gap="10%" wrap>
              <Column justfiyContent="flex-start" width="100%">

                <FormInput
                  name="passwordConfirmation"
                  type="password"
                  placeholder="******"
                  label={"Confirmation your password"}
                />
              </Column>
            </Row>


            <Button
              width="150px"
              fontSize="20px"
              style={{ marginTop: "10px", alignSelf: "flex-end" }}
              type="submit"
            >
              Updute
            </Button>
          </Form>
        )}
      </Formik>
    </ChangePasswordForm >
  );
}

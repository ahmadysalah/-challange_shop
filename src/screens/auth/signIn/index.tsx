import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { formSchema } from "./signIn.validation";
import FormInput from "../../../components/common/FormInput";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../redux/actions/auth.actions";
import { ILogin } from "../../../@types/auth.types";
import { AppState } from "../../../redux/store";
import {
  Button,
  Container,
  Divider,
  FormWrapper,
  Link,
  SignUpButton,
} from "./SignIn.styled";

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state: AppState) => state.auth);
  const [state, setState] = useState<ILogin>({
    email: "",
    password: "",
    remember_me: false,
  });

  const handleSubmit = (values: any) => {
    if (values.remember_me) {
      // const { password, ...rest } = values;
      localStorage.setItem("RememberMe", JSON.stringify(values));
    } else {
      localStorage.removeItem("RememberMe");
    }
    dispatch(
      login(values, () => {
        navigate("/");
      })
    );
  }

  useEffect(() => {
    let data = localStorage.getItem("RememberMe");
    const user: ILogin = data && JSON.parse(data);
    if (user) {
      setState(user);
    }
  }, []);

  return (
    <Container>
      <FormWrapper>
        <Typography variant="h1" color="text.primary" fontWeight="900">
          Login.
        </Typography>
        <Typography
          variant="h4"
          my="50px"
          color="text.secondary"
          fontSize="32px"
          fontWeight="500"
        >
          Login with your data that you entered during registration
        </Typography>
        <Formik
          enableReinitialize
          initialValues={{
            email: state.email || "",
            password: state.password || "",
            remember_me: state.remember_me || false,
          }}
          validationSchema={formSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <FormInput
                name="email"
                placeholder="name@example.com"
                label={"Enter your email address"}
                submitted={isSubmitting}
              />
              <FormInput
                name="password"
                type="password"
                placeholder="******"
                label={"Enter your password"}
                submitted={isSubmitting}
              />
              <Button type="submit" disabled={loading} onClick={() => setIsSubmitting(true)}>
                {!loading ? (
                  <Typography
                    variant="h6"
                    color="#000"
                    fontSize="22px"
                    fontWeight="500"
                  >
                    Login
                  </Typography>
                ) : (
                  <CircularProgress color="inherit" />
                )}
              </Button>
              <FormInput
                name="remember_me"
                type="checkbox"
                label={"Remember me"}
              />
              <Typography textAlign="center">
                <Link to={"/auth/forgot-password"}>Forgot your password?</Link>
              </Typography>

              <Divider />
              <SignUpButton to="/auth/signup" style={{ padding: "14px 35px" }}>
                <Typography variant="h6" color="text.primary">
                  Sign up now
                </Typography>
              </SignUpButton>
            </Form>
          )}
        </Formik>
      </FormWrapper>
      <img src={"/static/SignIn.png"} alt={"login pic"} />
    </Container >
  );
};

export default SignIn;

import React, { Component, useState } from "react";
import "./Signin.scss";
import { Formik } from "formik";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Drawer from "@material-ui/core/Drawer";
import { Drawer_control, Formik_control } from "./Signin.models";
import ChevronRightIcon from "@material-ui/icons/ChevronRightSharp";
import { AxiosResponse } from "axios";
import { validate_user, create_user } from "../../http/api.models";
import { useHistory } from "react-router-dom";
import { Divider } from "@material-ui/core";
import { setAuthToken } from "./store/actions";
import { useDispatch } from "react-redux";
import { unauthenticatedAxios } from "../../http/axios-interceptors";
function RegisterForm(prop: { drawer_control: Drawer_control }) {
  return (
    <Formik
      initialValues={{ email: "", password: "", confirm_password: "" }}
      validate={(values) => {
        const errors: { [key: string]: string } = {};
        if (!values.email) {
          errors["email"] = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors["email"] = "Invalid email address";
        }

        if (!values.password) {
          errors["password"] = "Required";
        }

        if (!values.confirm_password) {
          errors["confirm_password"] = "Required";
        } else if (values.password !== values.confirm_password) {
          errors["confirm_password"] = "Passwords must match";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        unauthenticatedAxios()
          .post(create_user, { email: values.email, password: values.password })
          .then((res) => {
            setSubmitting(false);
          })
          .catch((e) => {
            setSubmitting(false);
          });
      }}
    >
      {(formik_control: Formik_control) => (
        <form
          className="form register-block"
          onSubmit={formik_control.handleSubmit}
        >
          <Button
            className="back-button"
            variant="outlined"
            onClick={() => {
              prop.drawer_control.close();
            }}
          >
            <ChevronRightIcon />
          </Button>

          <div className="title">Register</div>
          <TextField
            className="fields"
            type="email"
            name="email"
            label="Email"
            variant="outlined"
            onChange={formik_control.handleChange}
            onBlur={formik_control.handleBlur}
            value={formik_control.values.email}
            //error section
            error={formik_control.errors.email !== undefined}
            helperText={formik_control.errors.email}
          />

          <TextField
            className="fields"
            label="Password"
            type="password"
            name="password"
            onChange={formik_control.handleChange}
            onBlur={formik_control.handleBlur}
            value={formik_control.values.password}
            autoComplete="current-password"
            variant="outlined"
            //error section
            error={formik_control.errors.password !== undefined}
            helperText={formik_control.errors.password}
          />
          <TextField
            className="fields"
            label="Confirm Password"
            type="password"
            name="confirm_password"
            onChange={formik_control.handleChange}
            onBlur={formik_control.handleBlur}
            value={formik_control.values.confirm_password}
            autoComplete="current-password"
            variant="outlined"
            //error section
            error={formik_control.errors.confirm_password !== undefined}
            helperText={formik_control.errors.confirm_password}
          />
          <div className="button-row">
            <Button
              type="submit"
              variant="outlined"
              disabled={formik_control.isSubmitting}
            >
              Register
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
}

function LoginForm(props: { drawer_control: Drawer_control } | any) {
  const [authenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validate={async (values) => {
        const errors = { password: "" };

        await unauthenticatedAxios()
          .post(
            validate_user,
            {},
            {
              auth: {
                username: values.email,
                password: values.password,
              },
            }
          )
          .then(
            (res: AxiosResponse<{ Authenticated: boolean; token: string }>) => {
              if (!res.data.Authenticated) {
                errors["password"] = "Incorrect Credentials";
              } else {
                dispatch(setAuthToken(res.data.token));
                setAuthenticated(true);
              }
            }
          )
          .catch((e) => {});
        return errors.password === "" ? {} : errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        if (authenticated) {
          history.push("/dashboard");
        }
      }}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {(formik_control: Formik_control) => (
        <form className="form" onSubmit={formik_control.handleSubmit}>
          <div className="title">Log In</div>
          <TextField
            className="fields"
            type="email"
            name="email"
            label="Email"
            variant="outlined"
            onChange={formik_control.handleChange}
            onBlur={formik_control.handleBlur}
            value={formik_control.values.email}
          />
          <TextField
            className="fields"
            label="Password"
            type="password"
            name="password"
            onChange={formik_control.handleChange}
            onBlur={formik_control.handleBlur}
            value={formik_control.values.password}
            autoComplete="current-password"
            variant="outlined"
            //error section
            error={formik_control.errors.password !== undefined}
            helperText={formik_control.errors.password}
          />
          <div className="button-row">
            <Button
              type="submit"
              variant="outlined"
              disabled={formik_control.isSubmitting}
            >
              Sign In
            </Button>
            <div style={{ margin: "0.5rem" }}></div>
            <Button
              variant="outlined"
              onClick={() => {
                props.drawer_control.open();
              }}
            >
              Register
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
}

function LoginDrawer() {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className="form">
      <Drawer variant="persistent" anchor="right" open={open}>
        <div className="form">
          <RegisterForm
            drawer_control={{
              open: handleDrawerOpen,
              close: handleDrawerClose,
            }}
          />
        </div>
      </Drawer>
      <main className="login-block">
        <div className="subblocks">
          <LoginForm
            drawer_control={{
              open: handleDrawerOpen,
              close: handleDrawerClose,
            }}
          />
        </div>

        <Divider />
        <div className="desc-paragraph subblocks">
          <div>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad magni
            quaerat deleniti assumenda. Nesciunt, maiores quas numquam tenetur
            illo porro, accusantium quam doloribus eius unde cupiditate
            consectetur, quibusdam placeat distinctio.
          </div>
        </div>
      </main>
    </div>
  );
}

export default class Signin extends Component {
  onSubmit() {}
  render() {
    return (
      <div className="host">
        <div className="row">
          <div className="title-block">
            <div className="title">Intsy</div>
            <div className="desc"> An Instagram Automation Manager </div>
          </div>
          <div className="form-block">
            <LoginDrawer />
          </div>
        </div>
        <div className="credit">
          Made with{" "}
          <span role="img" aria-label="taco">
            🌮
          </span>
          by{" "}
          <a
            href="https://jeffersonli.dev/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Jefferson Li
          </a>
        </div>
      </div>
    );
  }
}

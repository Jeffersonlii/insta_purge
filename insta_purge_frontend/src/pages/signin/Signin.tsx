import React, { Component, useState } from "react";
import "./Signin.scss";
import { Formik } from "formik";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Drawer from "@material-ui/core/Drawer";
import { Drawer_control, Formik_control } from "./Signin.models";
import ChevronRightIcon from "@material-ui/icons/ChevronRightSharp";

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
        console.log(errors);
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
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

function LoginForm(prop: { drawer_control: Drawer_control }) {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validate={(values) => {
        console.log(values);
        const errors = { password: "" };
        // !TODO check if combo is right
        if (true) {
          errors["password"] = "Incorrect Credentials";
        }
        return errors.password === "" ? {} : errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        console.log("asdfsd");
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
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
                prop.drawer_control.open();
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
        <LoginForm
          drawer_control={{ open: handleDrawerOpen, close: handleDrawerClose }}
        />
      </main>
    </div>
  );
}

export class Signin extends Component {
  onSubmit() {}
  render() {
    return (
      <div className="host">
        <div className="title-block">
          <div style={{ flexGrow: 999 }} />
          <div className="title">Insta Purge</div>
          <div className="desc"> An Instagram Follow Manager </div>
          <div style={{ flexGrow: 999 }} />
          <div className="credit">
            Made with{" "}
            <span role="img" aria-label="taco">
              🌮
            </span>{" "}
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
        <div style={{ flexGrow: 1 }}>
          <LoginDrawer />
        </div>
      </div>
    );
  }
}

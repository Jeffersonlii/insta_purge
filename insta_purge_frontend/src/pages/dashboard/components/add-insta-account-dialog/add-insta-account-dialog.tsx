import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import { newInstaAccount } from "../../dashboard.models";
import { Formik_control } from "../../../signin/Signin.models";
import { Formik } from "formik";
import { TextField, Button } from "@material-ui/core";
import "../../../signin/Signin.scss";

export default function AddInstaAccountDialog(props: {
  onClose: any;
  open: any;
}) {
  const { onClose, open } = props;
  const [accountValid, setAccountValid] = useState(false);

  const handleClose = () => {
    onClose();
  };

  const handleAddition = (account: newInstaAccount) => {
    onClose(account);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <Formik
        initialValues={{ userName: "", password: "" }}
        validate={async (values) => {
          //   const errors = { password: "" };

          //   return errors.password === "" ? {} : errors;
          setAccountValid(true);
          return {};
        }}
        onSubmit={(values, { setSubmitting }) => {
          if (accountValid) {
            handleAddition(values);
          }
        }}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {(formik_control: Formik_control) => {
          return (
            <form
              className="form standard-margin"
              onSubmit={formik_control.handleSubmit}
            >
              <div className="title">Add Instagram Account</div>
              <TextField
                className="fields"
                type="name"
                label="Instagram Username"
                name="userName"
                variant="outlined"
                onChange={formik_control.handleChange}
                onBlur={formik_control.handleBlur}
                value={formik_control.values.userName}
              />
              <TextField
                className="fields"
                label="Instagram password"
                name="password"
                type="password"
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
                  Add Account
                </Button>
              </div>
            </form>
          );
        }}
      </Formik>
    </Dialog>
  );
}

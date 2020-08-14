export interface Formik_control {
  values: any;
  errors: any;
  touched: any;
  handleChange: any;
  handleBlur: any;
  handleSubmit: ((event: React.FormEvent<HTMLFormElement>) => void) | undefined;
  isSubmitting: any;
}

export interface Drawer_control {
  open: Function;
  close: Function;
}

export interface logginInfo {
  email: string;
  password: string;
}

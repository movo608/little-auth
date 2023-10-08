import * as yup from "yup";

export const signupSchema = yup.object().shape({
  email: yup.string().required().email(),
  name: yup.string().required(),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-zA-Z]/, "Password must contain at least 1 letter")
    .matches(/\d/, "Password must contain at least 1 number")
    .matches(
      /.*[!@#$%^&*]/,
      "Password must contain at least 1 special character"
    )
    .required(),
});

export const loginSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .required(),
});

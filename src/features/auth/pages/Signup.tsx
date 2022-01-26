import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { AxiosError } from "axios";
import { ISignup } from "../models/ISugnup.interface";
import { IAuth } from "../models/IAuth.interface";
import { AuthEndpoints } from "../../../core/api/endpoints";
import axios from "../../../core/api/axios";

// Importing Material Ui Components  - Mudasir Nizamani
import { Typography } from "@mui/material";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";

// Validation Schema for Signup Form
const validationSchema = yup.object().shape({
  fullName: yup.string().required("FullName is required").min(2).max(20),
  email: yup
    .string()
    .required("Email is required")
    .email("Email must be a valid email"),
  password: yup.string().required("Password is required").min(6).max(30),
  confirmPassword: yup
    .string()
    .required("ConfirmPassword is required")
    .oneOf([yup.ref("password")], "Password do not match"),
});
function Signup() {
  const [isLoading, setLoading] = useState<boolean>();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IAuth>({
    resolver: yupResolver(validationSchema),
  });

  const Submit: SubmitHandler<IAuth> = async (formData: IAuth) => {
    setLoading(true);
    const model: ISignup = {
      email: formData.email,
      fullName: formData.fullName,
      profilePic: "/assets/images/users-default-profile-pic.jpg",
      password: formData.confirmPassword,
      role: "User",
    };
    await axios
      .post(AuthEndpoints.Signup, model)
      .then((res) => {
        setLoading(false);
        navigate("/", { replace: true });
        return enqueueSnackbar("Account is successfully created", {
          variant: "success",
        });
      })
      .catch((err: AxiosError) => {
        if (
          err.response?.data.error[0].code === "DuplicateUserName" ||
          err.response?.data.error[0].code === "DuplicateEmail"
        ) {
          setLoading(false);
          return enqueueSnackbar("This email address is already taken", {
            variant: "error",
          });
        }
        switch (err.response?.data.code) {
          case "InvalidRole":
            setLoading(false);
            enqueueSnackbar(err.response.data.error, {
              variant: "error",
            });
            break;
          case "ValidationError":
            setLoading(false);
            enqueueSnackbar("Server returned validation error", {
              variant: "error",
            });
            break;
          case "ServerError":
            setLoading(false);
            enqueueSnackbar("Something went wrong in Server, Plz try later", {
              variant: "error",
            });
            break;
          default:
            setLoading(false);
            enqueueSnackbar("Something went wrong", {
              variant: "warning",
            });
            break;
        }
      });
  };
  return (
    <div className="entry__wrap">
      <Typography
        component="div"
        variant="h2"
        className="entry__title"
        sx={{ fontWeight: "bold" }}
      >
        Sign Up
      </Typography>
      <div className="entry__info">Signup and access the features</div>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(Submit)}
        autoComplete="off"
        className="entry__form"
      >
        <div className="entry__group">
          <Controller
            name="fullName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                size="small"
                fullWidth={true}
                {...field}
                label="FullName"
                error={!!errors.fullName}
                helperText={errors.fullName ? errors.fullName?.message : ""}
                sx={{
                  marginBottom: "1.5rem",
                }}
                variant="outlined"
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                size="small"
                fullWidth={true}
                {...field}
                label="Email"
                error={!!errors.email}
                helperText={errors.email ? errors.email?.message : ""}
                sx={{
                  marginBottom: "1.5rem",
                }}
                variant="outlined"
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                size="small"
                fullWidth={true}
                {...field}
                label="Password"
                type="password"
                error={!!errors.password}
                helperText={errors.password ? errors.password?.message : ""}
                sx={{
                  marginBottom: "1.5rem",
                }}
                variant="outlined"
              />
            )}
          />

          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                size="small"
                fullWidth={true}
                {...field}
                label="Confirm Password"
                type="password"
                error={!!errors.confirmPassword}
                helperText={
                  errors.confirmPassword ? errors.confirmPassword?.message : ""
                }
                sx={{
                  marginBottom: "1.5rem",
                }}
                variant="outlined"
              />
            )}
          />
        </div>
        <LoadingButton
          sx={{
            borderRadius: "1rem",
            padding: "10px 5px",
          }}
          variant="contained"
          type="submit"
          loading={isLoading}
          fullWidth
          disableElevation
          endIcon={<PersonAddRoundedIcon />}
        >
          Submit
        </LoadingButton>
      </Box>
      <div className="entry__bottom">
        <Link to="/" className="entry__link">
          Already have an account? Sign In
        </Link>
      </div>
    </div>
  );
}

export default Signup;

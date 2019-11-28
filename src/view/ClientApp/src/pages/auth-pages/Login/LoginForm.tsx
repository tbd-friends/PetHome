import React from "react";
import { Formik, Form, Field } from "formik";
import {
  FormControl,
  makeStyles,
  Theme,
  createStyles,
  InputLabel,
  Input,
  InputAdornment,
  TextField,
  CardContent,
  CardActions,
  Button,
  Typography
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { LoginValues } from "./types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1)
    }
  })
);

interface LoginFormProps {
  initialValues: LoginValues;
  onSubmit: (values: LoginValues) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  initialValues,
  onSubmit
}) => {
  const classes = useStyles();
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        actions.setSubmitting(false);
        onSubmit(values);
      }}
      render={formikBag => (
        <>
          <Form autoComplete="off">
            <CardContent style={{ padding: 0 }}>
              <div
                style={{
                  padding: "50px 50px 15px 50px",
                  backgroundColor: "lightblue"
                }}
              >
                <Typography variant="h3" style={{ marginBottom: 15 }}>
                  Login
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  paddingTop: 15,
                  margin: "0 50px 15px 50px"
                }}
              >
                <Field
                  name="username"
                  render={({ field, form }: any) => (
                    <TextField {...field} name="username" label="Username" />
                  )}
                />
                <Field
                  name="password"
                  render={({ field, form }: any) => (
                    <TextField
                      {...field}
                      name="password"
                      label="Password"
                      type="password"
                    />
                  )}
                />
              </div>
              <div style={{ display: "flex" }}>
                <Button
                  type="submit"
                  style={{
                    flexGrow: 1,
                    margin: "15px 50px 50px 50px",
                    backgroundColor: "lightblue"
                  }}
                >
                  Login
                </Button>
              </div>
            </CardContent>
          </Form>
        </>
      )}
    />
  );
};

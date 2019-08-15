import React from "react";
import { Link } from "react-router-dom";

export interface SignInFormValues {
  username: string;
  password: string;
}

interface SingInFormProps {
  initialValues: SignInFormValues;
  onSignIn: (value: SignInFormValues) => void;
}

export const SignInForm: React.FC<SingInFormProps> = ({
  initialValues,
  onSignIn
}) => {
  const [values, setValues] = React.useState(initialValues);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSignIn(values);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          name="username"
          id="username"
          value={values.username}
          onChange={handleChange}
        />
        <label htmlFor="username">Username</label>
      </div>
      <div>
        <input
          type="password"
          name="password"
          id="password"
          value={values.password}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
      </div>
      <div>
        <Link to="/forgotpassword">Forgot Password</Link>
      </div>
      <div>
        <button type="submit">login</button>
      </div>
    </form>
  );
};

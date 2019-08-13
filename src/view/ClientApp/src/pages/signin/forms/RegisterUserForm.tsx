import React from "react";

export interface RegisterUserFormValues {
  fullname: string;
  username: string;
  password: string;
}

interface RegisterUserFormProps {
  initialValues: RegisterUserFormValues;
  onRegisterUser: (value: RegisterUserFormValues) => void;
}

export const RegisterUserForm: React.FC<RegisterUserFormProps> = ({
  initialValues,
  onRegisterUser
}) => {
  const [values, setValues] = React.useState(initialValues);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onRegisterUser(values);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          name="fullname"
          id="fullname"
          value={values.fullname}
          onChange={handleChange}
        />
        <label htmlFor="fullname">Full Name</label>
        <span aria-hidden="true" id="fullname1" />
      </div>
      <div>
        <input
          type="text"
          name="username"
          id="username"
          value={values.username}
          onChange={handleChange}
        />
        <label htmlFor="username">Username</label>
        <span aria-hidden="true" id="username1" />
      </div>
      <div>
        <input
          type="password"
          name="password"
          id="password"
          value={values.password}
          onChange={handleChange}
        />
        <label htmlFor="password">Set Password</label>
        <span aria-hidden="true" id="password1" />
      </div>
      <div>
        <button type="submit">register now</button>
      </div>
    </form>
  );
};

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Register() {
  const history = useNavigate();

  const initialValues = {
    username: "",
    password: "",
    level: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username cannot be empty"),
    password: Yup.string().required("Password required"),
    level: Yup.string().required("Select an option"),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data).then(() => {
      console.log(data);
    });
    history("/login");
  };

  return (
    <div className="addUniPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
        <label>Username: </label>
        <ErrorMessage name="username" component="span" />
        <Field
          autocomplete="off"
          id="inputAddEvent"
          name="username"
          placeholder="username"
        />

          <label>Password: </label>
          <ErrorMessage name="password" component="span" />
          <Field
            autocomplete="off"
            type="password"
            id="inputAddEvent"
            name="password"
            placeholder="•••••••••"
          />

          <label>User Level: </label>
          <ErrorMessage name="name" component="span" />
          <Field as="select" name="level" placeholder="category">
            <option value="default">    </option>
            <option value="student">Student</option>
            <option value="admin">Admin</option>
            <option value="superadmin">Super Admin</option>
          </Field>

          <button type="submit">Register</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Register;
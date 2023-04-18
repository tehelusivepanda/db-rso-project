import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddUni() {
    let history = useNavigate();

    const initVal = {
        name: "",
        description: "",
        location: "",
        num_students: 0,
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Can't be empty"),
        description: Yup.string(),
        location: Yup.string().required(),
        num_students: Yup.number().min(100).required("Please check fields again"),
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/universities", data).then((response) => {
            history("/");
        });
    };

    return (
        <div className="addUniPage">
            <Formik initialValues={initVal} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="formContainer">
                    <label>University Name: </label>
                    <ErrorMessage name="name" component="span" />
                    <Field id="inputAddEvent" name="name" placeholder="Name of university" />

                    <label>Description: </label>
                    <ErrorMessage name="name" component="span" />
                    <Field id="inputAddEvent" name="description" placeholder="Describe your university" />

                    <label>Location: </label>
                    <ErrorMessage name="name" component="span" />
                    <Field id="inputAddEvent" name="location" placeholder="Where are you?" />

                    <label>Student Population: </label>
                    <ErrorMessage name="name" component="span" />
                    <Field id="inputAddEvent" name="num_students" placeholder="How many students?" />

                    <button type="submit">Register University</button>
                </Form>
            </Formik>
        </div>
    );
}

export default AddUni;
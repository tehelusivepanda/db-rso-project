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
        num_students: Yup.number(),
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
                    <label>Name of Event: </label>
                    <ErrorMessage name="name" component="span" />
                    <Field id="inputAddEvent" name="name" placeholder="Name of event" />

                    <label>Description: </label>
                    <ErrorMessage name="name" component="span" />
                    <Field id="inputAddEvent" name="description" placeholder="Date" />

                    <label>Location: </label>
                    <ErrorMessage name="name" component="span" />
                    <Field id="inputAddEvent" name="location" placeholder="contact_phone #" />

                    <label>Student Population: </label>
                    <ErrorMessage name="name" component="span" />
                    <Field id="inputAddEvent" name="num_students" placeholder="Contact email" />

                    <button type="submit">Create Event</button>
                </Form>
            </Formik>
        </div>
    );
}

export default AddUni;
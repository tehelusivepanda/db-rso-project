import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddEvent() {
    let history = useNavigate();

    const initVal = {
        name: "",
        category: "",
        privacy: "",
        description: "",
        time: "",
        date: "",
        contact_phone: "",
        contact_email: ""
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Can't be empty"),
        category: Yup.string(),
        privacy: Yup.string().required("Please select an option"),
        description: Yup.string(),
        time: Yup.string().required(),
        date: Yup.string().required(),
        contact_phone: Yup.string(),
        contact_email: Yup.string()
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/events", data).then((response) => {
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

                    <label>Category: </label>
                    <ErrorMessage name="name" component="span" />
                    <Field as="select" id="inputAddEvent" name="category" placeholder="category">
                        <option value="default">    </option>
                        <option value="Educational">Educational</option>
                        <option value="Fundraiser">Fundraiser</option>
                        <option value="Event">Event</option>
                        <option value="Fun/Other">Fun/Other</option>
                    </Field>

                    <label>Public/Private?: </label>
                    <ErrorMessage name="name" component="span" />
                    <Field as="select" id="inputAddEvent" name="privacy" placeholder="privacy">
                        <option value="default">    </option>
                        <option value="Educational">Public</option>
                        <option value="Fundraiser">Private</option>
                        <option value="Fundraiser">RSO only</option>
                    </Field>

                    <label>Description (optional): </label>
                    <Field id="inputAddEvent" name="description" placeholder="Description" />

                    <label>Time: </label>
                    <ErrorMessage name="name" component="span" />
                    <Field id="inputAddEvent" name="time" placeholder="Time of event" />

                    <label>Date: </label>
                    <ErrorMessage name="name" component="span" />
                    <Field id="inputAddEvent" name="date" placeholder="Date" />

                    <label>Contact Phone Number: </label>
                    <ErrorMessage name="name" component="span" />
                    <Field id="inputAddEvent" name="contact_phone" placeholder="Contact phone" />

                    <label>Contact Email: </label>
                    <ErrorMessage name="name" component="span" />
                    <Field id="inputAddEvent" name="contact_email" placeholder="Contact email" />

                    <button type="submit">Create Event</button>
                </Form>
            </Formik>
        </div>
    );
}

export default AddEvent;
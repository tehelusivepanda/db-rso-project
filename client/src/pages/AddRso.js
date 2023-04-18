import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddRso() {
    let history = useNavigate();

    const initVal = {
        name: "",
        description: "",
        leader: "",
        member_2: "",
        member_3: "",
        member_4: "",
        university: "",
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Can't be empty"),
        description: Yup.string(),
        leader: Yup.string().required("Requires at least 4 members, add more later"),
        member_2: Yup.string().required("Requires at least 4 members, add more later"),
        member_3: Yup.string().required("Requires at least 4 members, add more later"),
        member_4: Yup.string().required("Requires at least 4 members, add more later"),
        university: Yup.string().required("Please select an option"),
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/rsos", data).then((response) => {
            history("/");
        });
    };

    return (
        <div className="addUniPage">
            <Formik initialValues={initVal} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="formContainer">
                    <label>Name of RSO: </label>
                    <ErrorMessage name="name" component="span" />
                    <Field id="inputAddEvent" name="name" placeholder="Name of event" />

                    <label>Description: </label>
                    <ErrorMessage name="name" component="span" />
                    <Field id="inputAddEvent" name="description" placeholder="Description" />

                    <label>Admin's Email: </label>
                    <ErrorMessage name="name" component="span" />
                    <Field id="inputAddEvent" name="leader" placeholder="example@gmail.com" />

                    <label>Member 2 Email: </label>
                    <ErrorMessage name="name" component="span" />
                    <Field id="inputAddEvent" name="member_2" placeholder="example@yahoo.com" />

                    <label>Member 3 Email: </label>
                    <ErrorMessage name="name" component="span" />
                    <Field id="inputAddEvent" name="member_3" placeholder="example@hotmail.com" />

                    <label>Member 4 Email: </label>
                    <ErrorMessage name="name" component="span" />
                    <Field id="inputAddEvent" name="member_4" placeholder="example@aol.com" />

                    <label>University: </label>
                    <ErrorMessage name="name" component="span" />
                    <Field as="select" name="university" placeholder="category">
                        <option value="default">    </option>
                        <option value="University of Central Florida">University of Central Florida</option>
                        <option value="University of South Florida">University of South Florida</option>
                    </Field>

                    <button type="submit">Register RSO</button>
                </Form>
            </Formik>
        </div>
    );
}

export default AddRso;
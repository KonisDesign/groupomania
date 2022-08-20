import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

function Registration() {
  const initialValues = {
    username: "",
    password: "",
    role: "visitor",
  };

  const [infos, setInfos] = useState("");

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(6).max(20).required(),
    password: Yup.string().min(4).max(20).required(),
  });

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/auth", data)
      .then((res) => {
        console.log(res);
        setInfos(res.data.msg);
      })
      .catch((err) => {
        setInfos(err.response.data.msg);
      });
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="signupContainer">
          <label>Nom d'utilisateur</label>
          <ErrorMessage name="username" component="span" />
          <Field
            autoComplete="off"
            name="username"
            placeholder="Nom d'utilisateur"
            className="field"
          />

          <label>Mot de passe</label>
          <ErrorMessage name="password" component="span" />
          <Field
            autoComplete="off"
            type="password"
            name="password"
            placeholder="Mot de passe"
            className="field"
          />
          <button className="signupButton" type="submit">
            S'inscrire
          </button>
        </Form>
      </Formik>
      <div>{infos}</div>
    </div>
  );
}

export default Registration;
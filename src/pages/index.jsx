import React from "react";
import { useState } from "react";
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { Formik } from "formik";
import { navigate } from "gatsby";

// CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import "./newLolly.css";

// C
import Lolly from "../components/lolly";

const ADD_LOLLY = gql`
mutation addLolly($c1: String!,$c2: String!,$c3: String!, $sender: String!,$message: String!,$rec: String!){
  addLolly(c1: $c1,c2: $c2,c3:$c3,sender: $sender,message: $message, rec: $rec){
     link
  }
}`
export default function Home() {
  const [addLolly] = useMutation(ADD_LOLLY)
  const [c1, setC1] = useState("#d52358");
  const [c2, setC2] = useState("#e95946");
  const [c3, setC3] = useState("#deaa43");
  return (
    <div className="container">
      <div className="row align-items-center">
        <div className="col-md-6">
          <div className="lolly-color-picker d-flex justify-content-around align-items-center">
            <Lolly top={c1} middle={c2} bottom={c3} />
            <div className="color-pickers d-flex flex-column">
              <input type="color" value={c1} onChange={(e) => { setC1(e.target.value) }} className="mb-3" />
              <input type="color" value={c2} onChange={(e) => { setC2(e.target.value) }} className="mb-3" />
              <input type="color" value={c3} onChange={(e) => { setC3(e.target.value) }} className="mb-3" />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card border-default my-5" >
            <div className="card-header text-center  text-white bg-dark">
              <h5 className="card-title mb-0">Virtual Lolly Pop</h5>
            </div>
            {/* Body */}
            <div className="card-body text-primary">
              <Formik
                initialValues={{ rec: '', message: '', from: '' }}
                validate={values => {
                  const errors = {};
                  if (!values.rec) {
                    errors.rec = 'This field is required.';
                  } if (!values.message) {
                    errors.message = 'This field is required.';
                  } if (!values.from) {
                    errors.from = 'This field is required.';
                  }
                  return errors;
                }}
                onSubmit={(values, { resetForm }) => {
                  addLolly({
                    variables: {
                      c1, c2, c3,
                      sender: values.from,
                      message: values.message,
                      rec: values.rec,
                    },
                  }).then(result => {
                    navigate(`/lollies/${result.data.addLolly.link}`)
                  });
                  resetForm({})
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                }) => (
                  <form noValidate autoComplete="off" onSubmit={handleSubmit} >
                    <div className="form-group">
                      <label className="text-dark" htmlFor="rec">To</label>
                      <input type="text" name="rec" className={"form-control " + (errors.rec && touched.rec ? 'border-danger' : '')} onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.rec} required />
                      <p className="text-danger">{errors.rec && touched.rec && errors.rec}</p>
                    </div>

                    <div className="form-group">
                      <label className="text-dark" htmlFor="message"> Message</label>
                      <textarea name="message" className={"form-control " + (errors.message && touched.message ? 'border-danger' : '')} onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.message} required></textarea>
                      <p className="text-danger">{errors.message && touched.message && errors.message}</p>
                    </div>

                    <div className="form-group">
                      <label className="text-dark" htmlFor="from">From</label>
                      <input type="text" name="from" className={"form-control " + (errors.from && touched.from ? 'border-danger' : '')} onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.from} placeholder="@jhon" required />
                      <p className="text-danger">{errors.from && touched.from && errors.from}</p>
                    </div>

                    <div className="form-group text-right mb-0">
                      <button type="submit" className="btn btn-dark">
                        submit
                      </button>
                    </div>

                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



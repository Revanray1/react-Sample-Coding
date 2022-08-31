import React, { Component } from "react";
import Modals from "./App";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import * as Yup from "yup";
import {
  Formik,
  FormikValues,
  values,
  handleSubmit,
  handleFileRead,
  handleChange,
  Textarea,
  Field,
  Form,
  ErrorMessage,
  validateYupSchema,
} from "formik";

class Addrecipies1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userimage: null,
      fields: this.props.updateditem || {},
    };
  }

  validationSchema(e) {

     
    return Yup.object().shape({
      name: Yup.string()
        .required("name is required")
        .matches(/^[0-9A-Za-z]+$/, "No Special Character Allowed"),

      price: Yup.string()
        .required("price is required")
        .matches(/^[0-9]+$/, "Only Numbers Allowed"),
      description: Yup.string().required("description is required"),
      img: Yup.mixed().required("image is required"),
    });
  
  }

  render() {
    console.log(this.props.updateditem);
    return (
      <div className="register-form">
        <Formik
          initialValues={{
            img: this.props.updateditem ? this.props.updateditem.img : "",
            name: this.props.updateditem ? this.props.updateditem.name : "",
            price: this.props.updateditem ? this.props.updateditem.price : "",
            description: this.props.updateditem
              ? this.props.updateditem.description
              : "",
          }}
          validationSchema={this.validationSchema}
          onSubmit={(e) => {
            if (!this.props.updateditem) {
            
              this.props.onAddRecipe(e);
            }
            if (this.props.updateditem) {
            
              console.log(e);
              this.props.upitem(e);
            }
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleFileRead,
            handleBlur,
            setFieldValue,
            setValues,
            values,
            errors,
          }) => (
            <Form>
              <div className="container">
                <div
                  className="row mt-5"
                  style={{ height: "50px", padding: "5px", marginTop: "20px" }}
                >
                  <div className="col-md-1"></div>
                  <div className="col-md-2">
                    <label>IMAGE</label>
                  </div>
                  <div className="col-md-2">
                    <label>-</label>
                  </div>
                  <div className="col-md-2">
                    <input
                      name="img"
                      id="img"
                      type="file"
                      className="form-control"
                      onChange={(e) => {
                        let reader = new FileReader();
                        reader.onload = () => {
                          if (reader.readyState === 2) {
                            console.log(reader.result);

                            setFieldValue("img", reader.result);

                            this.setState({ userimage: reader.result });
                          }
                        };
                        reader.readAsDataURL(e.target.files[0]);
                      }}
                    ></input>

                    <ErrorMessage
                      name="img"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="col-md-2"></div>

                  <div
                    className="col-sm-2"
                    style={{
                      padding: "0px",
                      border: "1px rgb(15, 15, 15) solid",
                    }}
                  >
                    <div
                      className="short-div"
                      style={{ position: "relative", zIndex: "1" }}
                    >
                      {this.props.updateditem && (
                        <img
                          src={this.props.updateditem.img}
                          className="card-img-top"
                          style={{
                            height: "200px",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            backgroundImage: `url(${this.props.updateditem.img})`,
                            zIndex: "2",
                          }}
                          id="bimage"
                        />
                      )}

                      {!this.props.updateditem && (
                        <img
                          src={this.state.userimage}
                          className="card-img-top"
                          style={{ height: "200px" }}
                          id="bimage"
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div
                  className="row mt-5"
                  style={{
                    padding: "0px 0px 0px 0px",
                    height: "50px",
                    marginTop: "35px",
                  }}
                >
                  <div className="col-md-1"></div>
                  <div className="col-md-2">
                    <label>NAME</label>
                  </div>
                  <div className="col-md-2">
                    <label>-</label>
                  </div>
                  <div className="col-md-3">
                    {!this.props.updateditem && (
                      <Field
                        name="name"
                        id="name"
                        type="text"
                        className="form-control"
                      />
                    )}

                    {this.props.updateditem && (
                      <Field
                        name="name"
                        id="name"
                        type="text"
                        value={values.name}
                        onChange={(e) => {
                          console.log(
                            e.currentTarget.name,
                            e.currentTarget.value
                          );
                          handleChange(e);
                        }}
                        className="form-control"
                      />
                    )}
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="col-md-2"></div>
                  <div className="col-sm-2"></div>
                  <div className="col-md-2"></div>
                </div>

                {/* price */}
                <div
                  className="row mt-5"
                  style={{
                    padding: "0px 0px 0px 0px",
                    height: "50px",
                    marginTop: "35px",
                  }}
                >
                  <div className="col-md-1"></div>
                  <div className="col-md-2">
                    <label>PRICE</label>
                  </div>
                  <div className="col-md-2">
                    <label>-</label>
                  </div>
                  <div className="col-md-3">
                    {!this.props.updateditem && (
                      <Field
                        name="price"
                        id="price"
                        type="text"
                        className="form-control"
                      />
                    )}

                    {this.props.updateditem && (
                      <Field
                        name="price"
                        id="price"
                        type="text"
                        className="form-control"
                        onChange={this.onchangefields}
                        value={values.price}
                        onChange={(e) => {
                          console.log(
                            e.currentTarget.name,
                            e.currentTarget.value
                          );
                          handleChange(e);
                        }}
                      />
                    )}

                    <ErrorMessage
                      name="price"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="col-md-2"></div>
                  <div className="col-sm-2"></div>
                  <div className="col-md-2"></div>
                </div>
                {/* description */}

                <div
                  className="row mt-5"
                  style={{
                    padding: "0px 0px 0px 0px",
                    height: "50px",
                    marginTop: "35px",
                  }}
                >
                  <div className="col-md-1"></div>
                  <div className="col-md-2">
                    <label>DESCRIPTION</label>
                  </div>
                  <div className="col-md-2">
                    <label>-</label>
                  </div>
                  <div className="col-md-3">
                    {!this.props.updateditem && (
                      <Field
                        as="textarea"
                        name="description"
                        id="description"
                        type="text"
                        className="form-control"
                      />
                    )}

                    {this.props.updateditem && (
                      <Field
                        as="textarea"
                        name="description"
                        id="description"
                        type="text"
                        className="form-control"
                        value={values.description}
                        onChange={(e) => {
                          console.log(
                            e.currentTarget.name,
                            e.currentTarget.value
                          );
                          handleChange(e);
                        }}
                      />
                    )}

                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-danger"
                    />
                    {this.props.updateditem && (
                      <div style={{ width: "350px", fontSize: "12px" }}>
                        Maximum letters to be entered:
                        {this.state.count
                          ? this.state.count
                          : this.props.updateditem.description.length}
                        /3000
                      </div>
                    )}
                    {!this.props.updateditem && (
                      <div style={{ width: "350px", fontSize: "12px" }}>
                        Maximum letters to be entered:
                        {this.state.count ? this.state.count : 0}/3000
                      </div>
                    )}
                  </div>
                  <div className="col-md-2"></div>
                  <div className="col-sm-2"></div>
                  <div className="col-md-2"></div>
                </div>
                <br></br>
                <br></br>

                <div className="row">
                  <div className="col-5"></div>
                  <div className="col-2">
                    {this.props.updateditem && (
                      <button
                        type="submit"
                        className="btn btn-primary float-right mb-2"
                        style={{ float: "right" }}
                      >
                        Update
                      </button>
                    )}
                    {!this.props.updateditem && (
                      <button
                        type="submit"
                        className="btn btn-primary float-right mb-2"
                        style={{ float: "right" }}
                      >
                        Submit
                      </button>
                    )}
                  </div>
                  <div className="col-5"></div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}
export default Addrecipies1;

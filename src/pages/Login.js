import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import ACTIONS from "../store/actions/index.js";
import { Link, withRouter } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthApi from "../api/Auth";
import { GoogleLogin } from "react-google-login-component";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

import Logo from "../../public/assets/images/logo2.png";
import Logo2 from "../../public/assets/images/Logo3.png";
import logIcon from "../../public/assets/images/logIcon.png";
import backgroundLogin from "../../public/assets/images/loginSo.jpg";

import loignImage1 from "../../public/assets/images/login image/login1.jpg";
import loignImage2 from "../../public/assets/images/login image/login2.jpg";
import loignImage3 from "../../public/assets/images/login image/login3.jpg";
import loignImage4 from "../../public/assets/images/login image/login4.jpg";
import loignImage5 from "../../public/assets/images/login image/login5.jpg";

import socketConnection from "../socketConnection";

import BtnLoader from "../components/ApiLoader";

import googleImage from "../../public/assets/images/icon-1.png";

// import io from 'socket.io-client';
// let socket = io.connect(process.env.REACT_APP_BASE_URL)

let validationSchemaLogin = Yup.object({
  email: Yup.string()
    .required("Email is Required.")
    .email("Email is not valid."),
  password: Yup.string()
    .required("Password is Required.")
    .min(6, "Must be greater then 6 characters."),
});

class Login extends Component {
  constructor(props) {
    super();
    this.state = {
      apiLoader: false,
      ApiError: "",
      google_facebook_login_loader: false,
      google_facebook_login_error: "",
    };
    this.responseGoogle = this.responseGoogle.bind(this);
  }

  componentDidMount() {
    let token = localStorage.getItem("token");
    if (token) {
      this.props.history.push("/");
    }
    let data={
      email:"mrahman9pk@gmail.com",
      password:"11223344"
    }
    // AuthApi.login(data)
    //   .then((res) => {
    //     if (res.data.Error == false) {
    //       socketConnection.emit("login", res.data._id);
    //       localStorage.setItem("token", res.data.token);

    //       this.props.removePosts();
    //       this.props.loadProfile(res.data.userProfile);
    //       this.props.history.push("/");
    //     }
    //     this.setState({
    //       apiLoader: false,
    //     });
    //   })
  }
  responseGoogle(googleUser) {
    console.log("googleUser", googleUser);
    let data = googleUser.vu;
    console.log(data);
    let googleres = {
      email: data.jv,
      name: data.jf,
      password: data.sW,
      account_type: "google",
    };
    console.log("googleUser", googleres);

    this.setState({
      google_facebook_login_loader: true,
      google_facebook_login_error: "",
    });

    AuthApi.socialLogin(googleres)
      .then((res) => {
        // console.log(res)
        if (res.data.Error == false) {
          socketConnection.emit("login", res.data.userProfile._id);
          localStorage.setItem("token", res.data.token);

          this.props.removePosts();
          this.props.loadProfile(res.data.userProfile);
          this.props.history.push("/");
        } else {
          this.setState({ google_facebook_login_error: res.data.msg });
        }

        this.setState({ google_facebook_login_loader: false });
      })
      .catch((error) => {
        // console.log(error)
        if (error.response.Error == true) {
          this.setState({ google_facebook_login_error: error.response.msg });
        }
        this.setState({ google_facebook_login_loader: false });
      });
  }
  responseFacebook = (response) => {
    console.log(response);
  };
  componentClicked = (response) => {
    console.log(response);
  };

  render() {
    return (
      <Fragment>
        <div className="main-wrap">
          <div className="bg-transparent border-0 shadow-none nav-header bg-mbile-white">
            <div className="nav-top w-100 justify-content-start ">
              <Link to="/" className="loginbgImageControl">
                <img src="assets/images/Logo3.png" style={{ height: "60px" }} />
                {/* <i className="feather-zap text-success display2-size me-3 ms-0"></i>
                        <span className="mb-0 text-current d-inline-block fredoka-font ls-3 fw-600 font-xxl logo-text">
                            Sociala.
                        </span> */}
              </Link>
              {/* <Link to="/"><i className="feather-zap text-success display1-size me-2 ms-0"></i><span className="mb-0 text-current d-inline-block fredoka-font ls-3 fw-600 font-xxl logo-text">Sociala. </span> </Link> */}

              {/* <Link to="/login" className="p-3 text-center text-white header-btn d-none d-lg-block bg-dark fw-500 font-xsss ms-auto w100 lh-20 rounded-xl">Login</Link> */}
              {/* <Link to="/register" className="p-3 text-center text-white bg-current header-btn d-none d-lg-block fw-500 font-xsss ms-2 w100 lh-20 rounded-xl">Register</Link> */}
            </div>
          </div>
          <div
            className="row backgroundImageControler h-100"
            style={{
              backgroundImage: `url(${loignImage5})`,
              marginLeft: "0px",
            }}
          >
            <div
              className="p-0 col-xl-7 d-none d-xl-block "
              // bg-image-cover style={{ backgroundImage: `url(${backgroundLogin})` }}
            >
              {/* <img src={loignImage4} className='loginBackGroundImage' /> */}
            </div>
            <div className="overflow-hidden col-xl-5 loginScreenCover h-100 align-items-center d-flex rounded-3">
              <div className="bg-transparent border-0 shadow-none card ms-auto me-auto login-card">
                <div className="mt-5 text-left card-body rounded-0">
                  <h2 className="mb-3 text-white fw-700 display1-size display2-md-size">
                    Login into <br />
                    your account
                  </h2>
                  <Formik
                    initialValues={{
                      email: "",
                      password: "",
                    }}
                    validationSchema={validationSchemaLogin}
                    onSubmit={async (values) => {
                      this.setState({
                        apiLoader: true,
                        ApiError: "",
                      });
                      AuthApi.login(values)
                        .then((res) => {
                          if (res.data.Error == false) {
                            socketConnection.emit("login", res.data._id);
                            localStorage.setItem("token", res.data.token);

                            this.props.removePosts();
                            this.props.loadProfile(res.data.userProfile);
                            this.props.history.push("/");
                          }
                          this.setState({
                            apiLoader: false,
                          });
                        })
                        .catch((error) => {
                          console.log("error api ", error);
                          if (error.response.data.Error == true) {
                            this.setState({
                              apiLoader: false,
                              ApiError: error.response.data.msg,
                            });
                          } else {
                            this.setState({
                              apiLoader: false,
                              ApiError: "Server error.",
                            });
                          }
                        });
                    }}
                  >
                    <Form>
                      <div className="mb-0 form-group icon-input rounded-circle">
                        {/* <i className="font-sm ti-email text-grey-500 pe-0"></i> */}
                        <Field
                          id="email"
                          name="email"
                          className="style2-input form-control text-grey-900 font-xsss fw-600"
                          placeholder="Your Email Address"
                        />
                      </div>
                      <small className="text-danger">
                        <b>
                          <ErrorMessage name="email" />
                        </b>
                      </small>
                      <div className="mt-3 mb-0 form-group icon-input">
                        {/* <i className="font-sm ti-lock text-grey-500 pe-0"></i> */}
                        <Field
                          id="password"
                          type="password"
                          name="password"
                          className="style2-input form-control text-grey-900 font-xsss fw-600"
                          placeholder="Password"
                        />

                        {/* <input
                                                    type="password"
                                                    name="changepassword"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.changepassword}
                                                /> */}
                      </div>
                      <small className="text-danger">
                        <b>
                          <ErrorMessage name="password" />
                        </b>
                      </small>
                      <div className="my-3 text-left form-check">
                        <input
                          type="checkbox"
                          className="form-check-input "
                          id="exampleCheck5"
                        />
                        <label className="text-white form-check-label font-xsss">
                          Remember me
                        </label>
                        <Link
                          to="/forgot"
                          className="float-right text-white fw-600 font-xsss"
                        >
                          Forgot your Password?
                        </Link>
                      </div>
                      <small className="my-3 text-danger ">
                        <b>{this.state.ApiError}</b>
                      </small>
                      <div className="p-0 mt-2 text-left col-sm-12">
                        <div className="mb-1 form-group">
                          {this.state.apiLoader && (
                            <button
                              type="button"
                              className="p-0 text-center text-white border-0 form-control style2-input fw-600 bg-dark "
                            >
                              Loading....
                            </button>
                          )}
                          {!this.state.apiLoader && (
                            <button
                              type="submit"
                              className="p-0 text-center text-white border-0 form-control style2-input fw-600 bg-dark "
                            >
                              Login
                            </button>
                          )}
                        </div>
                        <h6 className="mt-0 mb-0 text-white font-xsss fw-500 lh-32">
                          Dont have account{" "}
                          <Link to="/register" className="fw-700 ms-1">
                            Register
                          </Link>
                        </h6>
                      </div>
                    </Form>
                  </Formik>
                  {/* ************************************* */}
                  <div
                    className={`col-sm-12 p-0 text-center mt-2 d-flex justify-content-center align-items-center ${
                      !this.state.google_facebook_login_loader ? "d-none" : ""
                    }`}
                    style={{ height: "200px" }}
                  >
                    <BtnLoader />
                  </div>
                  <div
                    className={`col-sm-12 p-0 text-center mt-2 ${
                      this.state.google_facebook_login_loader ? "d-none" : ""
                    }`}
                  >
                    <h6 className="mb-0 mb-3 text-white d-inline-block fw-500 font-xsss">
                      Or, Sign in with your social account{" "}
                    </h6>
                    <p>
                      {" "}
                      <small className="mt-3 text-danger ">
                        <b>{this.state.google_facebook_login_error}</b>
                      </small>
                    </p>

                    <GoogleLogin
                      socialId={process.env.REACT_APP_GOOGLE_LOGIN_KEY}
                      className="google-login"
                      redirectUri={"https://globalfansy.com/login"}
                      fetchBasicProfile={true}
                      responseHandler={this.responseGoogle}
                      className="bg-transparent border-0 w-100"
                    >
                      <div className="mb-1 form-group">
                        <div className="p-0 mb-2 text-left text-white border-0 form-control style2-input fw-600 bg-facebook">
                          <img
                            src={googleImage}
                            alt="icon"
                            className="mb-1 ms-2 w40 me-5"
                          />{" "}
                          Sign in with Google
                        </div>
                      </div>
                    </GoogleLogin>
                    {/* <FacebookLogin
                                            appId="1088597931155576"
                                            autoLoad={false}
                                            fields="name,email,picture"
                                            onClick={() => {
                                                this.componentClicked()
                                            }}
                                            callback={() => {
                                                this.responseFacebook()
                                            }}
                                            render={renderProps => (
                                                <div onClick={renderProps.onClick} className="mb-1 cursor-pointer form-group">
                                                    <div className="p-0 text-left text-white border-0 form-control style2-input fw-600 bg-twiiter ">
                                                        <img src="assets/images/icon-3.png" alt="icon" className="mb-1 ms-2 w40 me-5" />
                                                        Sign in with Facebook
                                                    </div>
                                                </div>
                                            )}
                                        /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    removePosts: (data) => {
      dispatch(ACTIONS.removePosts(data));
    },
    loadProfile: (data) => {
      dispatch(ACTIONS.loadProfile(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));

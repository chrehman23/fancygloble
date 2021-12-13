import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import ACTIONS from '../store/actions/index.js';
import { Link, withRouter } from 'react-router-dom'

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import AuthApi from '../api/Auth';

import Logo from '../../public/assets/images/logo2.png'
import Logo2 from '../../public/assets/images/Logo3.png'
import logIcon from '../../public/assets/images/logIcon.png';



import backgroundLogin from '../../public/assets/images/loginSo.jpg';

import loignImage1 from '../../public/assets/images/login image/login1.jpg'
import loignImage2 from '../../public/assets/images/login image/login2.jpg'
import loignImage3 from '../../public/assets/images/login image/login3.jpg'
import loignImage4 from '../../public/assets/images/login image/login4.jpg'
import loignImage5 from '../../public/assets/images/login image/login5.jpg'

const formikValidateSchema = Yup.object().shape({
  name: Yup.string().required('Name is required').min(4, "Name should grater then 4 digits."),
  user_name: Yup.string().required('User name is required').min(4, "User name should grater then 4 digits.").max(20, "User name should less then 20 digits."),
  email: Yup.string().required('Email is required.').email('Email is not valid.'),
  // password: Yup.string().required("Password is required.").min(6, "Password should 6 digits."),
  termsAndConditions: Yup.boolean().oneOf([true], 'Accept Terms & Conditions is required'),
  // password_confirmation: Yup.string().required("password confirmation is required.").min(6, "password confirmation should 6 digits.").when("password", {
  //     is: val => (val && val.length > 0 ? true : false),
  //     then: Yup.string().oneOf(
  //         [Yup.ref("password")],
  //         "Both password need to be the same"
  //     )
  // })
});

class Register extends Component {
  constructor(props) {
    super();
    this.state = {
      apiLoader: false,
      ApiError: "",
      account_varification: false,
      apiErrorStatus: "text-danger"
    }
  }
  render() {
    return (


      <>
        <div className="login-wrapper">
          <div className="login-nav-bg">
            <div className="container">
              <nav className="navbar navbar-expand-lg">
                <Link to="/" className="navbar-brand" href="#">
                  <img src="assets/images/Logo3.png" style={{ width: "110px" }} />
                </Link>
                {/* <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button> */}
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav ms-auto">
                    <li className="nav-item active">
                      <Link to="/login" className="nav-link" >
                        <button type="button" class="btn btn-login  px-4">Login</button>

                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/register" className="nav-link" >
                        <button type="button" class="btn btn-regsiter  px-4">Register</button>
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
          <div className="form-wrapper">
            <div className="container">
              <div className="row d-flex justify-content-center align-items-center">
                <div className="col-lg-5 col-12 form-bg  p-md-5 py-5   rounded my-5">
                  <div className="text-center">
                    <h2 className="font-xxl login-heading pb-2">Create your account</h2>
                    <p>
                      Already have an account?
                      <Link to='/login'>
                        <span className="font-bold"> Login</span>
                      </Link>
                    </p>
                  </div>

                  <Formik
                    initialValues={{
                      name: '',
                      user_name: '',
                      email: '',
                      email: '',
                      password: '',
                      password_confirmation: '',
                      termsAndConditions: false
                    }}
                    validationSchema={formikValidateSchema}
                    onSubmit={async (values) => {
                      this.setState({
                        apiLoader: true,
                        ApiError: "",
                      })
                      let data = { ...values }
                      // data.user_name = `@${data.user_name}`
                      console.log(data)
                      data.user_name.replace(" ", "")
                      AuthApi.UserRegister(data).then(res => {
                        console.log(res)
                        if (res.data.Error == false) {
                          // localStorage.setItem("token", res.data.token)
                          this.props.removePosts()
                          this.setState({
                            apiErrorStatus: "text-success",
                            account_varification: true,
                            ApiError: res.data.msg
                          })
                          // this.props.loadProfile(res.data.userProfile)
                          // this.props.history.push("/")
                        } else {
                          this.setState({
                            apiErrorStatus: "text-danger"
                          })
                        }
                        this.setState({
                          apiLoader: false,
                        })

                      }).catch(error => {
                        console.log("error api ", error);
                        this.setState({
                          apiErrorStatus: "text-danger"
                        })
                        if (error.response.data.Error == true) {
                          if (error.response.data.msg = "Validation errors.") {
                            this.setState({
                              apiLoader: false,
                              ApiError: error.response.data.validation
                            })
                          } else {
                            this.setState({
                              apiLoader: false,
                              ApiError: [error.response.data.msg]
                            })
                          }

                        } else {
                          this.setState({
                            apiLoader: false,
                            ApiError: ["Server error."]
                          })
                        }

                      })
                    }}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      /* and other goodies */
                    }) => (

                      <Form>
                        {!this.state.account_varification && (
                          <>
                            <div className="mb-0 form-group icon-input ">
                              <label for="exampleInputEmail1">Full Name</label>
                              <Field id="name" name="name" className="form-control input-bg rounded" placeholder="Your Name" />

                            </div>
                            <small className='text-danger'><p><ErrorMessage name="name" /></p></small>

                            <div className="mt-3 mb-0 form-group icon-input">
                              <label for="exampleInputEmail1">User Name</label>
                              <Field id="user_name" name="user_name" className="form-control input-bg rounded" placeholder="User Name" />
                              {values.user_name ? (
                                <span className='text-white'>
                                  @<b>{values.user_name.replace(" ", "")}</b> will be your account name
                                </span>
                              ) : ""}
                            </div>
                            <small className='text-danger'><p><ErrorMessage name="user_name" /></p></small>

                            <div className="mt-3 mb-0 form-group icon-input">
                              <label for="exampleInputEmail1">Email address</label>
                              <Field id="email" name="email" className="form-control input-bg rounded" placeholder="Your Email Address" />

                            </div>
                            <small className='text-danger d-block'><p><ErrorMessage name="email" /></p></small>
                            <small id="emailHelp" className="form-text text-muted d-block">We'll never share your email with anyone else.</small>
                            {/* 
                                          <div className="mt-3 mb-0 form-group icon-input"> 
                                              <Field type='password' id="password" name="password" className="form-control input-bg rounded" placeholder="Password" />

                                          </div>
                                          <small className='text-danger'><b><ErrorMessage name="password" /></b></small>
                                          <div className="mt-3 mb-0 form-group icon-input"> 
                                              <Field type='password' id="password_confirmation" name="password_confirmation" className="form-control input-bg rounded" placeholder="Confirm Password" />

                                          </div>
                                          <small className='text-danger'><b><ErrorMessage name="password_confirmation" /></b></small> */}

                            <div className="my-3 text-left form-check ">
                              <Field type='checkbox' name="termsAndConditions" className="cursor-pointer form-check-input" />

                              <label className="form-check-label font-xsss">Accept <Link to='/Terms_Conditions' className="font-bold">Term and Conditions</Link></label>
                            </div>
                            <small className='text-danger'><p><ErrorMessage name="termsAndConditions" /></p></small>

                          </>
                        )}


                        <small className={`my-3 ${this.state.apiErrorStatus}`}><p>{this.state.ApiError}</p></small>

                        <div className="p-0 mt-2 text-left col-sm-12">
                          {!this.state.account_varification && (
                            <div className="mb-1 form-group">
                              {this.state.apiLoader && (
                                <button type="button" className="w-100 btn btn-regsiter">Loading....</button>
                              )}
                              {!this.state.apiLoader && (
                                <button type='submit' className="w-100 btn btn-regsiter">Register</button>
                              )}
                            </div>
                          )}


                        </div>
                      </Form>
                    )}

                  </Formik>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-basic">
            <footer>
              <div className="social">
                <a href="#"><i className="fab fa-facebook"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-linkedin-in"></i></a>
              </div>
              <ul className="list-inline">
                <li className="list-inline-item"><Link to='/about'>About</Link></li>
                <li className="list-inline-item"><Link to='/Terms_Conditions' >Terms</Link></li>
                <li className="list-inline-item"><a href="https://sites.google.com/view/globalfansy/home/privacy-policy?authuser=0" target='_blank'>Privacy Policy</a></li>
                <li className="list-inline-item"><a href="https://sites.google.com/view/globalfansy/home/supporrt" target='_blank'>Help & Support</a></li>




              </ul>
              <p className="copyright">© Copyright 2021 Global fansy oy. All Rights Reserved.</p>
            </footer>
          </div>

        </div>
      </>
      // <Fragment>
      //     <div className="main-wrap">
      //         <div className="bg-transparent border-0 shadow-none nav-header bg-mbile-white">
      //             <div className="nav-top justify-content-start w-100">
      //                 <Link to="/">
      //                     <img src="assets/images/Logo3.png" style={{ height: "60px" }} />
      //                     {/* <i className="feather-zap text-success display2-size me-3 ms-0"></i>
      //             <span className="mb-0 text-current d-inline-block fredoka-font ls-3 fw-600 font-xxl logo-text">
      //                 Sociala.
      //             </span> */}
      //                 </Link>
      //                 {/* <Link to="/"><i className="feather-zap text-success display1-size me-2 ms-0"></i><span className="mb-0 text-current d-inline-block fredoka-font ls-3 fw-600 font-xxl logo-text">Sociala. </span> </Link> */}


      //                 {/* <Link to="/login" className="p-3 text-center text-white header-btn d-none d-lg-block bg-dark fw-500 font-xsss ms-auto w100 lh-20 rounded-xl">Login</Link> */}
      //                 {/* <Link to="/register" className="p-3 text-center text-white bg-current header-btn d-none d-lg-block fw-500 font-xsss ms-2 w100 lh-20 rounded-xl">Register</Link> */}
      //             </div>
      //         </div>


      //         <div className="row backgroundImageControler" style={{ backgroundImage: `url(${loignImage5})`, marginLeft: "0px" }}>
      //             <div className="p-0 pt-5 bg-no-repeat col-xl-7 d-none d-xl-block"
      //             // bg-image-cover style={{ backgroundImage: `url("https://via.placeholder.com/800x950.png")` }}
      //             >

      //                 <br />
      //                 <br />
      //                 {/* <img src={Logo2} className='px-5 pt-5 mt-5 w-100' /> */}
      //             </div>
      //             <div className="overflow-hidden col-xl-5 loginScreenCover align-items-center d-flex rounded-3">
      //                 <div className="bg-transparent border-0 shadow-none card ms-auto me-auto login-card">
      //                     <div className="mt-5 text-left card-body rounded-0">
      //                         <h2 className="mb-4 text-white fw-700 display1-size display2-md-size">Create <br />your account</h2>
      //                         <Formik
      //                             initialValues={{
      //                                 name: '',
      //                                 user_name: '',
      //                                 email: '',
      //                                 email: '',
      //                                 password: '',
      //                                 password_confirmation: '',
      //                                 termsAndConditions: false
      //                             }}
      //                             validationSchema={formikValidateSchema}
      //                             onSubmit={async (values) => {
      //                                 this.setState({
      //                                     apiLoader: true,
      //                                     ApiError: "",
      //                                 })
      //                                 let data = { ...values }
      //                                 // data.user_name = `@${data.user_name}`
      //                                 console.log(data)
      //                                 data.user_name.replace(" ", "")
      //                                 AuthApi.UserRegister(data).then(res => {
      //                                     console.log(res)
      //                                     if (res.data.Error == false) {
      //                                         // localStorage.setItem("token", res.data.token)
      //                                         this.props.removePosts()
      //                                         this.setState({
      //                                             account_varification: true,
      //                                             ApiError: res.data.msg
      //                                         })
      //                                         // this.props.loadProfile(res.data.userProfile)
      //                                         // this.props.history.push("/")
      //                                     }
      //                                     this.setState({
      //                                         apiLoader: false,
      //                                     })

      //                                 }).catch(error => {
      //                                     console.log("error api ", error);

      //                                     if (error.response.data.Error == true) {
      //                                         if (error.response.data.msg = "Validation errors.") {
      //                                             this.setState({
      //                                                 apiLoader: false,
      //                                                 ApiError: error.response.data.validation
      //                                             })
      //                                         } else {
      //                                             this.setState({
      //                                                 apiLoader: false,
      //                                                 ApiError: [error.response.data.msg]
      //                                             })
      //                                         }

      //                                     } else {
      //                                         this.setState({
      //                                             apiLoader: false,
      //                                             ApiError: ["Server error."]
      //                                         })
      //                                     }

      //                                 })
      //                             }}
      //                         >
      //                             {({
      //                                 values,
      //                                 errors,
      //                                 touched,
      //                                 handleChange,
      //                                 handleBlur,
      //                                 handleSubmit,
      //                                 isSubmitting,
      //                                 /* and other goodies */
      //                             }) => (

      //                                 <Form>
      //                                     {!this.state.account_varification && (
      //                                         <>
      //                                             <div className="mb-0 form-group icon-input ">
      //                                                 {/* <i className="font-sm ti-user text-grey-500 pe-0"></i> */}
      //                                                 <Field id="name" name="name" className="form-control input-bg rounded" placeholder="Your Name" />

      //                                             </div>
      //                                             <small className='text-danger'><b><ErrorMessage name="name" /></b></small>

      //                                             <div className="mt-3 mb-0 form-group icon-input">
      //                                                 {/* <i className="font-sm ti-user text-grey-500 pe-0"></i> */}
      //                                                 <Field id="user_name" name="user_name" className="form-control input-bg rounded" placeholder="User Name" />
      //                                                 {values.user_name ? (
      //                                                     <span className='text-white'>
      //                                                         @<b>{values.user_name.replace(" ", "")}</b> will be your account name
      //                                                     </span>
      //                                                 ) : ""}
      //                                             </div>
      //                                             <small className='text-danger'><b><ErrorMessage name="user_name" /></b></small>

      //                                             <div className="mt-3 mb-0 form-group icon-input">
      //                                                 {/* <i className="font-sm ti-email text-grey-500 pe-0"></i> */}
      //                                                 <Field id="email" name="email" className="form-control input-bg rounded" placeholder="Your Email Address" />

      //                                             </div>
      //                                             <small className='text-danger'><b><ErrorMessage name="email" /></b></small>
      //                                             {/* 
      //                                     <div className="mt-3 mb-0 form-group icon-input"> 
      //                                         <Field type='password' id="password" name="password" className="form-control input-bg rounded" placeholder="Password" />

      //                                     </div>
      //                                     <small className='text-danger'><b><ErrorMessage name="password" /></b></small>
      //                                     <div className="mt-3 mb-0 form-group icon-input"> 
      //                                         <Field type='password' id="password_confirmation" name="password_confirmation" className="form-control input-bg rounded" placeholder="Confirm Password" />

      //                                     </div>
      //                                     <small className='text-danger'><b><ErrorMessage name="password_confirmation" /></b></small> */}

      //                                             <div className="my-3 text-left form-check ">
      //                                                 <Field type='checkbox' name="termsAndConditions" className="cursor-pointer form-check-input" />

      //                                                 <label className="text-white form-check-label font-xsss">Accept <a href="https://sites.google.com/view/globalfansy/home/terms-conditions" target="_blank"><u><b>Term and Conditions </b></u></a></label>
      //                                             </div>
      //                                             <small className='text-danger'><b><ErrorMessage name="termsAndConditions" /></b></small>

      //                                         </>
      //                                     )}


      //                                     <small className='my-3 text-danger '><b>{this.state.ApiError}</b></small>

      //                                     <div className="p-0 mt-2 text-left col-sm-12">
      //                                         {!this.state.account_varification && (
      //                                             <div className="mb-1 form-group">
      //                                                 {this.state.apiLoader && (
      //                                                     <button type="button" className="p-0 text-center text-white border-0 form-control style2-input fw-600 bg-dark ">Loading....</button>
      //                                                 )}
      //                                                 {!this.state.apiLoader && (
      //                                                     <button type='submit' className="p-0 text-center text-white border-0 form-control style2-input fw-600 bg-dark ">Register</button>
      //                                                 )}
      //                                             </div>
      //                                         )}

      //                                         <h6 className="mt-0 mb-0 text-white font-xsss fw-500 lh-32">Already have account <Link to="/login" className="fw-700 ms-1">Login</Link></h6>
      //                                     </div>
      //                                 </Form>
      //                             )}

      //                         </Formik>
      //                         {/* ************************************* */}


      //                     </div>
      //                 </div>
      //             </div>

      //         </div>
      //         <div class="row bg-white py-5">
      //             <div className="col-md-12">
      //                 <div className="d-flex justify-content-center w-100">
      //                     <div className="mx-2"><Link to="/about" className="loginbgImageControl link-dark">   About Us  </Link></div>
      //                     <div className="mx-2"><a target="_blank" href="https://sites.google.com/view/globalfansy/home/terms-conditions?authuser=0" className="loginbgImageControl link-dark">   Terms &amp; Conditions  </a></div>
      //                     <div className="mx-2"><a target="_blank" href="https://sites.google.com/view/globalfansy/home/privacy-policy?authuser=0" className="loginbgImageControl link-dark">   Privacy Policy  </a></div>
      //                     <div className="mx-2"><a target="_blank" href="https://sites.google.com/view/globalfansy/home/supporrt" className="loginbgImageControl link-dark">   Help & Support  </a></div>
      //                 </div>
      //             </div>
      //         </div>
      //         <div className="row border-top ">
      //             <div className="py-2 text-center col-12">
      //                 <p>© Copyright 2021 Global fansy oy. All Rights Reserved.</p>
      //             </div>
      //         </div>
      //     </div>
      // </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removePosts: (data) => {
      dispatch(ACTIONS.removePosts(data))
    },
    loadProfile: (data) => {
      dispatch(ACTIONS.loadProfile(data))
    },

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register))
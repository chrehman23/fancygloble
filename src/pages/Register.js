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
    user_name: Yup.string().required('User name is required').min(4, "User name should grater then 4 digits.").max(12, "User name should less then 12 digits."),
    email: Yup.string().required('Email is required.').email('Email is not valid.'),
    password: Yup.string().required("Password is required.").min(6, "Password should 6 digits."),
    termsAndConditions: Yup.boolean().oneOf([true], 'Accept Terms & Conditions is required'),
    password_confirmation: Yup.string().required("password confirmation is required.").min(6, "password confirmation should 6 digits.").when("password", {
        is: val => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
            [Yup.ref("password")],
            "Both password need to be the same"
        )
    })
});

class Register extends Component {
    constructor(props) {
        super();
        this.state = {
            apiLoader: false,
            ApiError: ""
        }
    }
    render() {
        return (
            <Fragment>
                <div className="main-wrap">
                    <div className="nav-header bg-transparent shadow-none border-0">
                        <div className="nav-top justify-content-start w-100">
                            <Link to="/">
                                <img src="assets/images/Logo3.png" style={{ height: "60px" }} />
                                {/* <i className="feather-zap text-success display2-size me-3 ms-0"></i>
                        <span className="d-inline-block fredoka-font ls-3 fw-600 text-current font-xxl logo-text mb-0">
                            Sociala.
                        </span> */}
                            </Link>
                            {/* <Link to="/"><i className="feather-zap text-success display1-size me-2 ms-0"></i><span className="d-inline-block fredoka-font ls-3 fw-600 text-current font-xxl logo-text mb-0">Sociala. </span> </Link> */}
                            <button className="nav-menu me-0 ms-auto"></button>

                            {/* <Link to="/login" className="header-btn d-none d-lg-block bg-dark fw-500 text-white font-xsss p-3 ms-auto w100 text-center lh-20 rounded-xl">Login</Link> */}
                            {/* <Link to="/register" className="header-btn d-none d-lg-block bg-current fw-500 text-white font-xsss p-3 ms-2 w100 text-center lh-20 rounded-xl">Register</Link> */}
                        </div>
                    </div>


                    <div className="row backgroundImageControler" style={{ backgroundImage: `url(${loignImage5})`, marginLeft: "0px" }}>
                        <div className="col-xl-7 d-none d-xl-block p-0 pt-5   bg-no-repeat"
                        // bg-image-cover style={{ backgroundImage: `url("https://via.placeholder.com/800x950.png")` }}
                        >

                            <br />
                            <br />
                            {/* <img src={Logo2} className='w-100 px-5  mt-5 pt-5' /> */}
                        </div>
                        <div className="col-xl-5 loginScreenCover   align-items-center d-flex   rounded-3 overflow-hidden">
                            <div className="card bg-transparent shadow-none border-0 ms-auto me-auto login-card">
                                <div className="card-body rounded-0 text-left">
                                    <h2 className="fw-700 display1-size text-white display2-md-size mb-4">Create <br />your account</h2>
                                    <Formik
                                        initialValues={{
                                            name: '',
                                            user_name: '',
                                            email: '',
                                            email: '',
                                            password: '',
                                            password_confirmation: '',
                                            termsAndConditions:false
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
                                                    localStorage.setItem("token", res.data.token)
                                                    this.props.removePosts()
                                                    this.props.loadProfile(res.data.userProfile)
                                                    this.props.history.push("/")
                                                }
                                                this.setState({
                                                    apiLoader: false,
                                                })

                                            }).catch(error => {
                                                console.log("error api ", error);

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
                                                <div className="form-group icon-input mb-0 ">
                                                    {/* <i className="font-sm ti-user text-grey-500 pe-0"></i> */}
                                                    <Field id="name" name="name" className="style2-input   form-control text-grey-900 font-xsss fw-600" placeholder="Your Name" />

                                                </div>
                                                <small className='text-danger'><b><ErrorMessage name="name" /></b></small>

                                                <div className="form-group icon-input mb-0 mt-3">
                                                    {/* <i className="font-sm ti-user text-grey-500 pe-0"></i> */}
                                                    <Field id="user_name" name="user_name" className="style2-input   form-control text-grey-900 font-xsss fw-600" placeholder="User Name" />
                                                    {values.user_name ? (
                                                        <span className='text-white'>
                                                            @<b>{values.user_name.replace(" ","")}</b> will be your account name
                                                        </span>
                                                    ) : ""}
                                                </div>
                                                <small className='text-danger'><b><ErrorMessage name="user_name" /></b></small>

                                                <div className="form-group icon-input mb-0 mt-3">
                                                    {/* <i className="font-sm ti-email text-grey-500 pe-0"></i> */}
                                                    <Field id="email" name="email" className="style2-input   form-control text-grey-900 font-xsss fw-600" placeholder="Your Email Address" />

                                                </div>
                                                <small className='text-danger'><b><ErrorMessage name="email" /></b></small>

                                                <div className="form-group icon-input mb-0 mt-3">
                                                    {/* <i className="font-sm ti-lock text-grey-500 pe-0"></i> */}
                                                    <Field type='password' id="password" name="password" className="style2-input   form-control text-grey-900 font-xsss fw-600" placeholder="Password" />

                                                </div>
                                                <small className='text-danger'><b><ErrorMessage name="password" /></b></small>
                                                <div className="form-group icon-input mb-0 mt-3">

                                                    {/* <i className="font-sm ti-lock text-grey-500 pe-0"></i> */}
                                                    <Field type='password' id="password_confirmation" name="password_confirmation" className="style2-input   form-control text-grey-900 font-xsss fw-600" placeholder="Confirm Password" />

                                                </div>
                                                <small className='text-danger'><b><ErrorMessage name="password_confirmation" /></b></small>

                                                <div className="form-check text-left my-3 ">
                                                    <Field type='checkbox' name="termsAndConditions" className="form-check-input cursor-pointer" />

                                                    <label className="form-check-label font-xsss text-white">Accept <a href="https://sites.google.com/view/globalfansy/home/terms-conditions" target="_blank"><u><b>Term and Conditions </b></u></a></label>
                                                </div>
                                                <small className='text-danger'><b><ErrorMessage name="termsAndConditions" /></b></small>
                                                <small className='text-danger my-3 '><b>{this.state.ApiError}</b></small>
                                                <div className="col-sm-12 p-0 text-left mt-2">
                                                    <div className="form-group mb-1">
                                                        {this.state.apiLoader && (
                                                            <button type="button" className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0 ">Loading....</button>
                                                        )}
                                                        {!this.state.apiLoader && (
                                                            <button type='submit' className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0 ">Register</button>
                                                        )}
                                                    </div>
                                                    <h6 className=" font-xsss fw-500 mt-0 mb-0 lh-32 text-white">Already have account <Link to="/login" className="fw-700 ms-1">Login</Link></h6>
                                                </div>
                                            </Form>
                                        )}

                                    </Formik>
                                    {/* ************************************* */}


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
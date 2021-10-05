import React, { Component, Fragment } from "react";
import { Link } from 'react-router-dom'
import Logo2 from '../../public/assets/images/Logo3.png'

import loignImage5 from '../../public/assets/images/login image/login5.jpg'

import ApiLoader from '../components/ApiLoader'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import AuthApi from '../api/Auth';

const formikValidateSchema = Yup.object().shape({
    password: Yup.string().required("Password is required.").min(6, "Password should 6 digits."),
    // password_confirmation: Yup.string().required("password confirmation is required.").min(6, "Password should 6 digits."),
    password_confirmation: Yup.string().required("password confirmation is required.").min(6, "password confirmation should 6 digits.").when("password", {
        is: val => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
            [Yup.ref("password")],
            "Both password need to be the same"
        )
    })
});


class ChangePassword extends Component {
    constructor(props) {
        super();
        this.state = {
            email:"",
            otp:"",

            apiLoader: false,
            ApiError: "",
            otpEmailVerifing: true,
            otpEmailError: false,

            successApi:false,
            successApiMsg:'',
        }
    }

    componentDidMount() {
        let { email, otp } = this.props.match.params
        console.log(`${email} and otp is ${otp}`);

        let data = {
            email,
            otp
        }
        AuthApi.otpVerification(data).then(res => {
            console.log(res.data)
            if (res.data.Error == false) {
                this.setState({ 
                    otpEmailError: false,
                    email:email,
                    otp:otp
                 })
            } else {
                this.setState({ otpEmailError: true })
            }
            this.setState({
                otpEmailVerifing: false
            })
        }).catch(error => {
            console.log('error link verirfication')
        })

    }
    render() {
        return (
            <Fragment>
                <div className="main-wrap">
                    <div className="nav-header bg-transparent shadow-none border-0">
                        <div className="nav-top w-100 justify-content-start ">
                            <Link to="/" className='loginbgImageControl'>
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

                    <div className="row backgroundImageControler h-100" style={{ backgroundImage: `url(${loignImage5})`, marginLeft: "0px" }}>
                        {/* <div className="col-xl-5 d-none d-xl-block p-0 vh-100 bg-image-cover bg-no-repeat"
                        style={{backgroundImage: `url("https://via.placeholder.com/800x950.png")`}}></div> */}

                        <div className="col-xl-7 d-none d-xl-block p-0 "
                        // bg-image-cover style={{ backgroundImage: `url(${backgroundLogin})` }}
                        >
                            {/* <img src={loignImage4} className='loginBackGroundImage' /> */}
                        </div>
                        <div className="col-xl-5 vh-100 align-items-center d-flex   loginScreenCover rounded-3 overflow-hidden">
                            <div className="card bg-transparent shadow-none border-0 ms-auto me-auto login-card">
                                <div className="card-body text-white bg-transparent rounded-0 text-left">
                                    {this.state.successApi && (
                                        <>
                                            <p className='text-white'><b>{this.state.successApiMsg}</b></p>
                                        </>
                                    )}
                                    {!this.state.successApi && (
                                        <>
                                            <h2 className="fw-700 display1-size display2-md-size mb-4 text-white">Change <br />your password</h2>
                                            {this.state.otpEmailVerifing && (
                                                <>
                                                    <div className='d-flex'>
                                                        <div ><ApiLoader /></div>
                                                        <div style={{ paddingLeft: '5px' }}> verifying link</div>
                                                    </div>
                                                </>
                                            )}
                                            {!this.state.otpEmailVerifing && this.state.otpEmailError && (
                                                <>
                                                    <small className='text-white '><b>Error: link not verified</b></small>

                                                </>
                                            )}
                                            {!this.state.otpEmailVerifing && !this.state.otpEmailError && (
                                                <>
                                                    <Formik
                                                        initialValues={{
                                                            password: "",
                                                            password_confirmation: '',
                                                        }}
                                                        validationSchema={formikValidateSchema}
                                                        onSubmit={async (values) => {
                                                            this.setState({
                                                                apiLoader: true,
                                                                ApiError: "",
                                                            })
                                                            let data = {
                                                                email: this.state.email,
                                                                otp: this.state.otp,
                                                                password: values.password
                                                            }
                                                            AuthApi.resetPassword(data).then(res => {
                                                                console.log(res)
                                                                if (res.data.Error == false) {
                                                                    this.setState({
                                                                        successApi: true,
                                                                        successApiMsg: res.data.msg
                                                                    })
                                                                }
                                                                this.setState({
                                                                    apiLoader: false,
                                                                })

                                                            }).catch(error => {
                                                                console.log("error api ", error);

                                                                if (error.response.data.Error == true) {
                                                                    if (error.response.data.msg == "Validation errors.") {
                                                                        this.setState({
                                                                            apiLoader: false,
                                                                            ApiError: error.response.data.msg
                                                                        })
                                                                    } else {
                                                                        this.setState({
                                                                            apiLoader: false,
                                                                            ApiError: error.response.data.msg
                                                                        })
                                                                    }

                                                                } else {
                                                                    this.setState({
                                                                        apiLoader: false,
                                                                        ApiError: "Server error."
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

                                                                <small className='text-danger my-3 '><b>{this.state.ApiError}</b></small>
                                                                <div className="col-sm-12 p-0 text-left mt-2">
                                                                    <div className="form-group mb-5 mt-3">
                                                                        {this.state.apiLoader && (
                                                                            <button type="button" className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0 ">Loading....</button>
                                                                        )}
                                                                        {!this.state.apiLoader && (
                                                                            <button type='submit' className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0 ">Register</button>
                                                                        )}
                                                                    </div>

                                                                </div>
                                                            </Form>
                                                        )}

                                                    </Formik>
                                                    {/* ************************************* */}
                                                </>
                                            )}
                                        </>
                                    )}
                                   
                                    <h6 className=" font-xsss fw-500 mt-0 mb-0 lh-32 text-white mt-4">Already have account <Link to="/login" className="fw-700 ms-1">Login</Link></h6>
                                   

                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </Fragment>
        );
    }
}

export default ChangePassword;
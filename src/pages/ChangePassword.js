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
                    <div className="bg-transparent border-0 shadow-none nav-header">
                        <div className="nav-top w-100 justify-content-start ">
                            <Link to="/" className='loginbgImageControl'>
                                <img src="/assets/images/Logo3.png" style={{ height: "60px" }} />
                                {/* <i className="feather-zap text-success display2-size me-3 ms-0"></i>
                        <span className="mb-0 text-current d-inline-block fredoka-font ls-3 fw-600 font-xxl logo-text">
                            Sociala.
                        </span> */}
                            </Link>
                            {/* <Link to="/"><i className="feather-zap text-success display1-size me-2 ms-0"></i><span className="mb-0 text-current d-inline-block fredoka-font ls-3 fw-600 font-xxl logo-text">Sociala. </span> </Link> */}
                            <button className="nav-menu me-0 ms-auto"></button>

                            {/* <Link to="/login" className="p-3 text-center text-white header-btn d-none d-lg-block bg-dark fw-500 font-xsss ms-auto w100 lh-20 rounded-xl">Login</Link> */}
                            {/* <Link to="/register" className="p-3 text-center text-white bg-current header-btn d-none d-lg-block fw-500 font-xsss ms-2 w100 lh-20 rounded-xl">Register</Link> */}
                        </div>
                    </div>

                    <div className="row backgroundImageControler h-100" style={{ backgroundImage: `url(${loignImage5})`, marginLeft: "0px" }}>
                        {/* <div className="p-0 bg-no-repeat col-xl-5 d-none d-xl-block vh-100 bg-image-cover"
                        style={{backgroundImage: `url("https://via.placeholder.com/800x950.png")`}}></div> */}

                        <div className="p-0 col-xl-7 d-none d-xl-block"
                        // bg-image-cover style={{ backgroundImage: `url(${backgroundLogin})` }}
                        >
                            {/* <img src={loignImage4} className='loginBackGroundImage' /> */}
                        </div>
                        <div className="overflow-hidden col-xl-5 vh-100 align-items-center d-flex loginScreenCover rounded-3">
                            <div className="bg-transparent border-0 shadow-none card ms-auto me-auto login-card">
                                <div className="text-left text-white bg-transparent card-body rounded-0">
                                    {this.state.successApi && (
                                        <>
                                            <p className='text-white'><b>{this.state.successApiMsg}</b></p>
                                        </>
                                    )}
                                    {!this.state.successApi && (
                                        <>
                                            <h2 className="mb-4 text-white fw-700 display1-size display2-md-size">Update <br />your password</h2>
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

                                                                <div className="mt-3 mb-0 form-group icon-input">
                                                                    {/* <i className="font-sm ti-lock text-grey-500 pe-0"></i> */}
                                                                    <Field type='password' id="password" name="password" className="style2-input form-control text-grey-900 font-xsss fw-600" placeholder="Password" />

                                                                </div>
                                                                <small className='text-danger'><b><ErrorMessage name="password" /></b></small>
                                                                <div className="mt-3 mb-0 form-group icon-input">

                                                                    {/* <i className="font-sm ti-lock text-grey-500 pe-0"></i> */}
                                                                    <Field type='password' id="password_confirmation" name="password_confirmation" className="style2-input form-control text-grey-900 font-xsss fw-600" placeholder="Confirm Password" />

                                                                </div>
                                                                <small className='text-danger'><b><ErrorMessage name="password_confirmation" /></b></small>

                                                                <small className='my-3 text-danger '><b>{this.state.ApiError}</b></small>
                                                                <div className="p-0 mt-2 text-left col-sm-12">
                                                                    <div className="mt-3 mb-5 form-group">
                                                                        {this.state.apiLoader && (
                                                                            <button type="button" className="p-0 text-center text-white border-0 form-control style2-input fw-600 bg-dark ">Loading....</button>
                                                                        )}
                                                                        {!this.state.apiLoader && (
                                                                            <button type='submit' className="p-0 text-center text-white border-0 form-control style2-input fw-600 bg-dark ">Register</button>
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
                                   
                                    <h6 className="mt-0 mt-4 mb-0 text-white font-xsss fw-500 lh-32">Already have account <Link to="/login" className="fw-700 ms-1">Login</Link></h6>
                                   

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
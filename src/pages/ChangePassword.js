import React, { Component, Fragment } from "react";
import { Link } from 'react-router-dom'
import Logo from '../../public/assets/images/Logo3.png'

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
            email: "",
            otp: "",

            apiLoader: false,
            ApiError: "",
            otpEmailVerifing: true,
            otpEmailError: false,

            successApi: false,
            successApiMsg: '',
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
                    email: email,
                    otp: otp
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
                <div className="login-wrapper">
                    <div className="login-nav-bg">
                        <div className="container">
                            <nav className="navbar navbar-expand-lg">
                                <Link to="/" className="navbar-brand" href="#">
                                    <img src={Logo} style={{ width: "110px" }} />
                                </Link>

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
                                    <div className="text-left">
                                        <h2 className="font-xxl login-heading pb-2">Update Your Password</h2>
                                        {this.state.successApi && (
                                            <>
                                                <p className='text-success'><p>{this.state.successApiMsg}</p></p>
                                            </>
                                        )}
                                        {!this.state.successApi && (
                                            <>
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
                                                        <small className='text-danger '><p>Error: link not verified</p></small>

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
                                                                        <Field type='password' id="password" name="password" className="form-control input-bg rounded" placeholder="Password" />

                                                                    </div>
                                                                    <small className='text-danger'><p><ErrorMessage name="password" /></p></small>
                                                                    <div className="mt-3 mb-0 form-group icon-input">

                                                                        {/* <i className="font-sm ti-lock text-grey-500 pe-0"></i> */}
                                                                        <Field type='password' id="password_confirmation" name="password_confirmation" className="form-control input-bg rounded" placeholder="Confirm Password" />

                                                                    </div>
                                                                    <small className='text-danger'><p><ErrorMessage name="password_confirmation" /></p></small>

                                                                    <small className='my-3 text-danger '><p>{this.state.ApiError}</p></small>
                                                                    <div className="p-0 mt-2 text-left col-sm-12">
                                                                        <div className="mt-3 mb-5 form-group">
                                                                            {this.state.apiLoader && (
                                                                                <button type="button" className="w-100 btn btn-regsiter">Loading....</button>
                                                                            )}
                                                                            {!this.state.apiLoader && (
                                                                                <button type='submit' className="w-100 btn btn-regsiter">Update</button>
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




                                    </div>
                                    <form>



                                        <div className="form-group form-check py-3">
                                            <Link to="/login" className="d-flex justify-content-end align-items-center font-bold">Login your account</Link>
                                        </div>
                                        {/* <button type="submit" className="w-100 btn btn-regsiter">Login</button> */}
                                    </form>
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



            </Fragment>
        );
    }
}

export default ChangePassword;
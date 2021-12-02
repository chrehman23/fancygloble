import React, { Component, Fragment } from "react";
import { Link } from 'react-router-dom'
import Logo2 from '../../public/assets/images/Logo3.png'

import AuthApi from "../api/Auth";
import loignImage5 from '../../public/assets/images/login image/login5.jpg'

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

let validationSchemaLogin = Yup.object({
    email: Yup.string().required('Email is Required.').email('Email is not valid.'),
})
class Forgot extends Component {
    constructor(props) {
        super();
        this.state = {
            apiLoader: false,
            ApiError: "",
        }
    }

    sendResetPasswordOtp = () => {
        let data = {
            emaill: "mrahma9pk@gmail.com"
        }
        AuthApi.sendResetPasswordOtp(data).then(res => {
            console.log(res.data)
        }).catch(error => {
            console.log(error)
        })
    }
    render() {
        return (
            <Fragment>
                <div className="main-wrap">
                    <div className="nav-header bg-transparent shadow-none border-0 bg-mbile-white">
                        <div className="nav-top w-100 justify-content-start ">
                            <Link to="/" className='loginbgImageControl'>
                                <img src="assets/images/Logo3.png" style={{ height: "60px" }} />
                                {/* <i className="feather-zap text-success display2-size me-3 ms-0"></i>
                        <span className="d-inline-block fredoka-font ls-3 fw-600 text-current font-xxl logo-text mb-0">
                            Sociala.
                        </span> */}
                            </Link>
                            {/* <Link to="/"><i className="feather-zap text-success display1-size me-2 ms-0"></i><span className="d-inline-block fredoka-font ls-3 fw-600 text-current font-xxl logo-text mb-0">Sociala. </span> </Link> */}
                            

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
                                <div className="card-body bg-transparent rounded-0 text-left">
                                    <h2 className="fw-700 display1-size display2-md-size mb-4 text-white">Reset <br />your password</h2>
                                    <Formik
                                        initialValues={{
                                            email: '',
                                        }}
                                        validationSchema={validationSchemaLogin}
                                        onSubmit={async (values) => {
                                            this.setState({
                                                apiLoader: true,
                                                ApiError: "",
                                            })
                                            AuthApi.sendResetPasswordOtp(values).then(res => {
                                                if (res.data.Error == false) {
                                                    this.setState({
                                                        apiLoader: false,
                                                        ApiError: res.data.msg
                                                    })
                                                }
                                                this.setState({
                                                    apiLoader: false,
                                                })

                                            }).catch(error => {
                                                console.log("error api ", error);
                                                if (error.response.data.Error == true) {
                                                    this.setState({
                                                        apiLoader: false,
                                                        ApiError: error.response.data.msg
                                                    })
                                                } else {
                                                    this.setState({
                                                        apiLoader: false,
                                                        ApiError: "Server error."
                                                    })
                                                }

                                            })
                                        }}
                                    >
                                        <Form>
                                            <div className="form-group icon-input mb-0 rounded-circle">
                                                {/* <i className="font-sm ti-email text-grey-500 pe-0"></i> */}
                                                <Field id="email" name="email" className="style2-input  form-control text-grey-900 font-xsss fw-600" placeholder="Your Email Address" />

                                            </div>
                                            <small className='text-white'><b><ErrorMessage name="email" /></b></small>
                                         
                                            <small className='text-white my-3 '><b>{this.state.ApiError}</b></small>
                                            <div className="col-sm-12 p-0 text-left mt-5">
                                                <div className="form-group mb-1">
                                                    {this.state.apiLoader && (
                                                        <button type="button" className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0 ">Loading....</button>
                                                    )}
                                                    {!this.state.apiLoader && (
                                                        <button type='submit' className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0 ">Reset Password</button>
                                                    )}
                                                </div>
                                                <h6 className=" font-xsss fw-500 mt-0 mb-0 mt-4 lh-32 text-white">Already have account <Link to="/login" className="fw-700 ms-1">Login</Link></h6>
                                            </div>

                                        </Form>
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

export default Forgot;
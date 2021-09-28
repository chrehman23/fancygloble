import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import ACTIONS from '../store/actions/index.js';
import { Link, withRouter } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import AuthApi from '../api/Auth';
import { GoogleLogin } from 'react-google-login-component';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'


import Logo from '../../public/assets/images/logo2.png'
import Logo2 from '../../public/assets/images/Logo3.png'
import logIcon from '../../public/assets/images/logIcon.png';
import backgroundLogin from '../../public/assets/images/loginSo.jpg';

import loignImage1 from '../../public/assets/images/login image/login1.jpg'
import loignImage2 from '../../public/assets/images/login image/login2.jpg'
import loignImage3 from '../../public/assets/images/login image/login3.jpg'
import loignImage4 from '../../public/assets/images/login image/login4.jpg'
import loignImage5 from '../../public/assets/images/login image/login5.jpg'

import socketConnection from '../socketConnection'

import BtnLoader from '../components/ApiLoader'

// import io from 'socket.io-client';
// let socket = io.connect(process.env.REACT_APP_BASE_URL)


let validationSchemaLogin = Yup.object({
    email: Yup.string().required('Email is Required.').email('Email is not valid.'),
    password: Yup.string().required('Password is Required.').min(6, 'Must be greater then 6 characters.'),
})

class Login extends Component {
    constructor(props) {
        super();
        this.state = {
            apiLoader: false,
            ApiError: "",
            google_facebook_login_loader: false,
            google_facebook_login_error: ''
        }
        this.responseGoogle = this.responseGoogle.bind(this)
    }

    componentDidMount() {
        let token = localStorage.getItem("token")
        if (token) {
            this.props.history.push("/")
        }
    }
    responseGoogle(googleUser) {
        console.log("googleUser", googleUser)
        let data = googleUser.dt
        console.log(data)
        let googleres = {
            email: data.Ot,
            name : data.Se,
            password: data.fT,
            account_type: "google"
        }
        console.log("googleUser", googleres)

        this.setState({
            google_facebook_login_loader: true,
            google_facebook_login_error: "",
        })

        AuthApi.socialLogin(googleres).then(res => {
            // console.log(res)
            if (res.data.Error == false) {
                socketConnection.emit("login", res.data.userProfile._id)
                localStorage.setItem("token", res.data.token)

                this.props.removePosts()
                this.props.loadProfile(res.data.userProfile)
                this.props.history.push("/")
            } else {
                this.setState({ google_facebook_login_error: res.data.msg })
            }

            this.setState({ google_facebook_login_loader: false })
        }).catch(error => {
            // console.log(error)
            if (error.response.Error == true) {

                this.setState({ google_facebook_login_error: error.response.msg })
            }
            this.setState({ google_facebook_login_loader: false })
        })

    }
    responseFacebook = (response) => {
        console.log(response);
    }
    componentClicked = (response) => {
        console.log(response);
    }

    render() {
        return (
            <Fragment>
                <div className="main-wrap">
                    <div className="nav-header bg-transparent shadow-none border-0">
                        <div className="nav-top w-100 justify-content-start ">
                            <Link to="/" className='loginbgImageControl'>
                                <img src={Logo2} style={{ height: "60px" }} />
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
                    <div className="row backgroundImageControler h-100" style={{ backgroundImage: `url(${loignImage5})`,marginLeft:"0px" }}>
                        <div className="col-xl-7 d-none d-xl-block p-0 "
                        // bg-image-cover style={{ backgroundImage: `url(${backgroundLogin})` }}
                        >
                            {/* <img src={loignImage4} className='loginBackGroundImage' /> */}
                        </div>
                        <div className="col-xl-5 loginScreenCover h-100 align-items-center d-flex   rounded-3 overflow-hidden">
                            <div className="card shadow-none border-0 bg-transparent ms-auto me-auto login-card">
                                <div className="card-body  rounded-0 text-left">
                                    <h2 className="fw-700 display1-size display2-md-size mb-3 text-white">Login into <br />your account</h2>
                                    <Formik
                                        initialValues={{
                                            email: '',
                                            password: '',
                                        }}
                                        validationSchema={validationSchemaLogin}
                                        onSubmit={async (values) => {
                                            this.setState({
                                                apiLoader: true,
                                                ApiError: "",
                                            })
                                            AuthApi.login(values).then(res => {
                                                if (res.data.Error == false) {
                                                    socketConnection.emit("login", res.data._id)
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
                                            <small className='text-danger'><b><ErrorMessage name="email" /></b></small>
                                            <div className="form-group icon-input mb-0 mt-3">
                                                {/* <i className="font-sm ti-lock text-grey-500 pe-0"></i> */}
                                                <Field id="password" type='password' name="password" className="style2-input  form-control text-grey-900 font-xsss fw-600" placeholder="Password" />

                                                {/* <input
                                                    type="password"
                                                    name="changepassword"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.changepassword}
                                                /> */}
                                            </div>
                                            <small className='text-danger'><b><ErrorMessage name="password" /></b></small>
                                            <div className="form-check text-left my-3">
                                                <input type="checkbox" className="form-check-input " id="exampleCheck5" />
                                                <label className="form-check-label font-xsss text-white">Remember me</label>
                                                <Link to="/forgot" className="fw-600 font-xsss     float-right text-white">Forgot your Password?</Link>
                                            </div>
                                            <small className='text-danger my-3 '><b>{this.state.ApiError}</b></small>
                                            <div className="col-sm-12 p-0 text-left mt-2">
                                                <div className="form-group mb-1">
                                                    {this.state.apiLoader && (
                                                        <button type="button" className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0 ">Loading....</button>
                                                    )}
                                                    {!this.state.apiLoader && (
                                                        <button type='submit' className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0 ">Login</button>
                                                    )}
                                                </div>
                                                <h6 className=" font-xsss fw-500 mt-0 mb-0 lh-32 text-white">Dont have account <Link to="/register" className="fw-700 ms-1">Register</Link></h6>
                                            </div>

                                        </Form>
                                    </Formik>
                                    {/* ************************************* */}

                                    <div className={`col-sm-12 p-0 text-center mt-2 d-flex justify-content-center align-items-center ${!this.state.google_facebook_login_loader ? "d-none" : ""}`} style={{ height: '200px' }}>
                                        <BtnLoader />
                                    </div>
                                    <div className={`col-sm-12 p-0 text-center mt-2 ${this.state.google_facebook_login_loader ? "d-none" : ""}`}>
                                        <h6 className="mb-0 d-inline-block   fw-500 font-xsss  mb-3 text-white">Or, Sign in with your social account </h6>
                                        <p> <small className='text-danger mt-3 '><b>{this.state.google_facebook_login_error}</b></small></p>

                                        <GoogleLogin
                                            socialId={process.env.REACT_APP_GOOGLE_LOGIN_KEY}
                                            className="google-login"
                                            redirectUri={"https://master.d3gqmduw2r7u7n.amplifyapp.com/login"}
                                            fetchBasicProfile={true}
                                            responseHandler={this.responseGoogle}
                                            className='w-100 bg-transparent border-0'
                                        >
                                            <div className="form-group mb-1"><div className="form-control text-left style2-input text-white fw-600 bg-facebook border-0 p-0 mb-2"><img src="assets/images/icon-1.png" alt="icon" className="ms-2 w40 mb-1 me-5" /> Sign in with Google</div></div>

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
                                                <div onClick={renderProps.onClick} className="form-group cursor-pointer mb-1">
                                                    <div className="form-control text-left style2-input text-white fw-600 bg-twiiter border-0 p-0 ">
                                                        <img src="assets/images/icon-3.png" alt="icon" className="ms-2 w40 mb-1 me-5" />
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))
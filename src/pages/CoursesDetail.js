import React, { Component, Fragment } from "react";
import { Modal } from 'react-bootstrap'
import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Rightchat from '../components/Rightchat';
import Pagetitle from '../components/Pagetitle';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';
import ApiLoader from '../components/ApiLoader'
import { connect } from 'react-redux';
import ACTIONS from '../store/actions/index.js';
import SweetAlert from 'react-bootstrap-sweetalert'
import { Link, withRouter } from 'react-router-dom'
import CourseApi from '../api/Courses'
import CopyToClipboard from '../components/CopyToClipBoardPost'
import CoursesSectionDetail from "../components/CoursesSectionDetail";
import StripeCheckout from 'react-stripe-checkout';
import moment from "moment";
import Enroll_users from "../components/Enroll_users";
import Course_comments from "../components/Course_comments";
import ContentLoader, { Facebook } from 'react-content-loader'
import { Formik, ErrorMessage, Field,Form } from 'formik';
import * as Yup from 'yup';
import AuthApi from "../api/Auth";

let validationSchemaEmail = Yup.object({
    email: Yup.string().required("Email is Required.").email("Email is not valid."),
    name: Yup.string().required("Name is Required.").min(2, "Must be greater then 2 characters."),
    phone: Yup.string().required("Phone number is Required."),
    massege: Yup.string().required("massege is Required.").min(5, "Must be greater then 5 characters."),
});







class CoursesDetail extends Component {
    constructor() {
        super()
        this.state = {
            emailsending:false,
            emailsendingmsg:"",
            coupon_input: "",
            coupon_discount: 0,
            coupon_loader: false,
            coupon_have: false,
            coupon_info: false,

            updateingCourse: false,
            loadingCourse: true,

            TitleEdite: false,
            titleInput: "",
            desEdite: false,
            desInput: "",

            Course_id: "",
            enrol_users: 0,

            learning_points: "",
            requirements: "",
            course_level: "",
            audio_language: "",
            course_category: "",
            paid_amount: "",
            discount_amount: "",
            video_url: "",
            thumbnail: "",
            user_paid: false,
            user_details: {},

            vedioUploading: false,
            publish: false,

            paymentLoader: false,
            created_by: "",
            tabs: 1,
            apiLoader: true,
            payment_notify: false,
            payment_status: false,
            pyment_error_msg: " Your card was declined.",
            emailModal: false,
        }

    }
    componentDidMount() {
        let Course_id = this.props.match.params.id
        if (Course_id) {
            let data = {
                course_id: Course_id
            }
            CourseApi.courseDetails(data).then(res => {
                console.log(res)
                if (res.data.Error == false) {
                    this.setState({
                        apiLoader: false,
                        titleInput: res.data.data.title,
                        desInput: res.data.data.description,
                        user_details: res.data.data.created_by,
                        learning_points: res.data.data.learning_points,
                        requirements: res.data.data.requirements,
                        course_level: res.data.data.course_level,
                        audio_language: res.data.data.audio_language,
                        course_category: res.data.data.course_category,
                        paid_amount: res.data.data.paid_amount,
                        discount_amount: res.data.data.discount_amount,
                        video_url: res.data.data.video_url,
                        thumbnail: res.data.data.thumbnail,
                        publish: res.data.data.publish,
                        user_paid: res.data.data.user_paid,
                        created_by: res.data.data.created_by,
                        enrol_users: res.data.data.enrol_users,

                        Course_id: res.data.data._id,
                        loadingCourse: false,

                        start_date: res.data.data.start_date,
                    })
                }
            }).catch(error => {
                console.log(error)
            })
        }

    }

    updateCourse = (data) => {
        data.append('course_id', this.state.Course_id)
        this.setState({
            updateingCourse: true,
        })
        CourseApi.updateCourse(data).then(res => {
            console.log(res)
            if (res.data.Error == false) {
                this.setState({
                    updateingCourse: false,
                    video_url: res.data.data.video_url,
                    thumbnail: res.data.data.thumbnail,
                    publish: res.data.data.publish,
                    vedioUploading: false
                })
            }
            if (res.data.data.publish == true) {
                localStorage.removeItem("add_course_id");
                this.props.history.goBack("/courses")
            }
        }).catch(error => {
            console.log(error)
        })
    }

    onToken = (token) => {
        let data = {
            course_id: this.state.Course_id,
            payment_token: token.id,
            coupon_code: this.state.coupon_input,
        };
        this.setState({ paymentLoader: true })
        CourseApi.coursePayment(data).then(res => {
            console.log(res)
            if (res.data.Error == false) {
                this.setState({
                    user_paid: true,
                    paymentLoader: false,
                    payment_status: res.data.payment_status,
                    payment_notify: true
                })
            }
            if (res.data.error_msg) {
                this.setState({
                    pyment_error_msg: res.data.error_msg
                })
            } else {
                this.setState({
                    pyment_error_msg: " Your card was declined. "
                })
            }
            this.setState({
                paymentLoader: false,
                payment_notify: true
            })
        }).catch(error => {
            console.log(error)
            this.setState({
                pyment_error_msg: " Your card was declined. ",
                paymentLoader: false,
                payment_status: false,
                payment_notify: true
            })
        })
    }

    checkCourseCoupon = () => {
        let data = {
            course_id: this.state.Course_id,
            coupon_code: this.state.coupon_input
        }
        this.setState({ coupon_loader: true })
        CourseApi.checkCourseCoupon(data).then(res => {
            console.log(res)
            if (res.data.Error == false) {
                this.setState({
                    coupon_discount: res.data.discount_amount,
                    coupon_loader: false,
                    coupon_info: res.data.msg,

                })
            }
        }).catch(error => {
            console.log(error)
        })
    }

    render() {
        return (
            <Fragment>
                <Header />
                <Leftnav />
                <Rightchat />

                {this.state.payment_notify && (
                    <>
                        {this.state.payment_status ? (

                            <SweetAlert success title="Payment Done!"
                                customButtons={
                                    <React.Fragment>
                                        <button className='px-2 btn btn-primary bgthwh ms-2 btn-sm' onClick={() => this.setState({ payment_notify: false })}>Okay</button>
                                    </React.Fragment>
                                }    >
                                Payment process done enjoy your course.
                            </SweetAlert>
                        ) : (
                            <SweetAlert warning title="Payment Error!"
                                customButtons={
                                    <React.Fragment>
                                        <button className='px-2 btn btn-primary bgthwh ms-2 btn-sm' onClick={() => this.setState({ payment_notify: false })}>Okay</button>
                                    </React.Fragment>
                                }    >
                                {this.state.pyment_error_msg}
                            </SweetAlert>
                        )}
                    </>
                )}

                <div className="main-content right-chat-active">
                    <div className={this.state.apiLoader ? "px-0 middle-sidebar-bottom bg-white" : "px-0 middle-sidebar-bottom course_details_bg"}>
                        <div className="w-100">


                            {/* ************************************************************* */}
                            <section className="course-details">
                                <div className="page__title-wrapper-overly">
                                    <div className="container">
                                        <h1
                                            className='cursor-pointer'
                                            onClick={() => {
                                                this.props.history.push("/courses")
                                            }}
                                        ><i className="text-white ti-arrow-left font-sm me-2"

                                        ></i>Course Details</h1>
                                    </div>
                                </div>
                            </section>
                            <div className="container">
                                {this.state.apiLoader && (
                                    <div className="row">
                                        <div className="col-md-8">

                                            <div className='p-3'>
                                                <ContentLoader viewBox="0 0 380 70">
                                                    {/* Only SVG shapes */}
                                                    <rect y="17" rx="4" ry="4" width="300" height="8" />
                                                    <rect y="40" rx="3" ry="3" width="250" height="6" />
                                                </ContentLoader>

                                                <ContentLoader viewBox="0 0 380 70">
                                                    {/* Only SVG shapes */}
                                                    <rect x="0" y="0" rx="5" ry="5" width="100%" height="300px" />
                                                </ContentLoader>
                                                <ContentLoader viewBox="0 0 380 70">
                                                    {/* Only SVG shapes */}
                                                    <rect x="0" y="0" rx="5" ry="5" width="100%" height="300px" />
                                                </ContentLoader>
                                                <ContentLoader viewBox="0 0 380 70">
                                                    {/* Only SVG shapes */}
                                                    <rect x="0" y="0" rx="5" ry="5" width="100%" height="300px" />
                                                </ContentLoader>
                                            </div>


                                        </div>
                                        <div className="pt-md-5 col-md-4">
                                            <div className="py-4">
                                                <ContentLoader viewBox="0 0 380 70">
                                                    {/* Only SVG shapes */}
                                                    <rect y="17" rx="4" ry="4" width="300" height="13" />
                                                    <rect y="40" rx="3" ry="3" width="250" height="10" />
                                                </ContentLoader>
                                                <ContentLoader viewBox="0 0 380 70">
                                                    {/* Only SVG shapes */}
                                                    <rect y="17" rx="4" ry="4" width="300" height="13" />
                                                    <rect y="40" rx="3" ry="3" width="250" height="10" />
                                                </ContentLoader>
                                                <ContentLoader viewBox="0 0 380 70">
                                                    {/* Only SVG shapes */}
                                                    <rect y="17" rx="4" ry="4" width="300" height="13" />
                                                    <rect y="40" rx="3" ry="3" width="250" height="10" />
                                                </ContentLoader>
                                                <ContentLoader viewBox="0 0 380 70">
                                                    {/* Only SVG shapes */}
                                                    <rect y="17" rx="4" ry="4" width="300" height="13" />
                                                    <rect y="40" rx="3" ry="3" width="250" height="10" />
                                                </ContentLoader>
                                                <ContentLoader viewBox="0 0 380 70">
                                                    {/* Only SVG shapes */}
                                                    <rect y="17" rx="4" ry="4" width="300" height="13" />
                                                    <rect y="40" rx="3" ry="3" width="250" height="10" />
                                                </ContentLoader>
                                                <ContentLoader viewBox="0 0 380 70">
                                                    {/* Only SVG shapes */}
                                                    <rect y="17" rx="4" ry="4" width="300" height="13" />
                                                    <rect y="40" rx="3" ry="3" width="250" height="10" />
                                                </ContentLoader>
                                            </div>

                                        </div>
                                    </div>
                                )}
                                {!this.state.apiLoader && (
                                    <div className="row">
                                        <div className="col-md-8 col-12">
                                            <div className="inner-title">
                                                <h1 className="pb-0">{this.state.titleInput}</h1>
                                            </div>
                                            <div className="flex-row course-instructor-detail d-md-flex">
                                                <div className="course__teacher me-2">
                                                    <img src={this.state.user_details && this.state.user_details.profile_photo} />
                                                </div>
                                                <div className="mb-4 course__teacher-info me-5">
                                                    <h5 className="pb-0">Teacher</h5>
                                                    <small>{this.state.user_details && this.state.user_details.name}</small>
                                                </div>
                                                <div className="mb-4 course__update me-5 d-none">
                                                    <h5>Last Update:</h5>
                                                    <p>September 28, 2021</p>
                                                </div>

                                            </div>
                                            <div className="py-2 course__img">
                                                {this.state.thumbnail !== '' && (
                                                    <img src={this.state.thumbnail} className="img-fluid w-100" />
                                                )}

                                            </div>
                                            <div className="tutor-course-content-content">
                                                <p>
                                                    {this.state.desInput}
                                                </p>
                                            </div>
                                            <div className=" tutor-single-course-segment tutor-course-benefits-wrap">
                                                <div className="course-benefits-title">
                                                    <h4 className="mb-0 tutor-segment-title">What Will I Learn?</h4>
                                                </div>
                                                <div className="tutor-course-benefits-content">
                                                    {this.state.learning_points}
                                                </div>
                                            </div>
                                            <div className=" tutor-single-course-segment tutor-course-benefits-wrap">
                                                <div className="course-benefits-title">
                                                    <h4 className="mb-0 tutor-segment-title">Requirements</h4>
                                                </div>
                                                <div className="tutor-course-benefits-content">
                                                    {this.state.requirements}
                                                </div>
                                            </div>
                                            <div className="mb-1 course__tab-2">
                                                <ul className="border-0 nav nav-tabs" id="courseTab" role="tablist">
                                                    <li className="my-2 nav-item"
                                                        onClick={() => {
                                                            this.setState({ tabs: 1 })
                                                        }}
                                                    >
                                                        <button className={this.state.tabs == 1 ? "active nav-link" : "nav-link"} type="button">
                                                            <i className="icon_ribbon_alt"></i> <span>Course content</span>
                                                        </button>
                                                    </li>
                                                    <li className="my-2 nav-item"
                                                        onClick={() => {
                                                            this.setState({ tabs: 2 })
                                                        }}
                                                    >
                                                        <button className={this.state.tabs == 2 ? "active nav-link" : "nav-link"} type="button">
                                                            <i className="icon_book_alt"></i> <span>Enrolled </span>
                                                        </button>
                                                    </li>
                                                    {this.state.user_paid && !this.state.paymentLoader && this.state.Course_id && (
                                                        <li className="my-2 nav-item"
                                                            onClick={() => {
                                                                this.setState({ tabs: 3 })
                                                            }}
                                                        >
                                                            <button className={this.state.tabs == 3 ? "active nav-link" : "nav-link"} type="button">
                                                                <i className="icon_star_alt"></i> <span>Comments</span>
                                                            </button>
                                                        </li>
                                                    )}

                                                    <li className="my-2 nav-item"
                                                        onClick={() => {
                                                            this.setState({ tabs: 4 })
                                                        }}
                                                    >
                                                        <button className={this.state.tabs == 4 ? "active nav-link" : "nav-link"} type="button">
                                                            <span>Instructor</span>
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                            {this.state.tabs == 1 && (
                                                <>
                                                    {!this.state.paymentLoader && this.state.Course_id && <CoursesSectionDetail
                                                        lacture_title={this.state.titleInput}
                                                        lacture_des={this.state.desInput}
                                                        course_id={this.state.Course_id} />}
                                                </>
                                            )}
                                            {this.state.tabs == 2 && (
                                                <div class="card bg-white rounded p-2">

                                                    {!this.state.paymentLoader && this.state.Course_id && <Enroll_users course_id={this.state.Course_id} />}
                                                </div>
                                            )}
                                            {this.state.tabs == 3 && (
                                                <div class="card bg-white rounded p-2">
                                                    {this.state.user_paid && !this.state.paymentLoader && this.state.Course_id && <Course_comments course_id={this.state.Course_id} />}
                                                </div>
                                            )}
                                            {this.state.tabs == 4 && (
                                                <div className="course__member mb-45">
                                                    <h4 className="tutor-segment-title tutor-segment-title-700">
                                                        About the instructor
                                                    </h4>
                                                    <div className=" tutor-course-instructors-wrap tutor-single-course-segment" id="single-course-ratings">
                                                        <div className="flex-row course-instructor-detail d-md-flex">
                                                            <div className="course__teacher me-2">
                                                                <img src={this.state.user_details && this.state.user_details.profile_photo} />
                                                            </div>
                                                            <div className="mb-4 course__teacher-info me-5">
                                                                <h5 className="pb-0">Teacher</h5>
                                                                <small>{this.state.user_details && this.state.user_details.name}</small>
                                                            </div>
                                                            <div className="mb-4 course__update me-5 d-none">
                                                                <h5>Last Update:</h5>
                                                                <p>September 28, 2021</p>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                        </div>
                                        <div className="col-md-4 col-12">
                                            <div className="p-4 my-4 bg-white right-col">
                                                <div className="tutor-lesson-video-wrap">
                                                    <div className="tutor-video-embeded-wrap"> {!this.state.vedioUploading && this.state.video_url && (
                                                        <div className="p-0 mt-3 mb-3 card-body d-block" >
                                                            <div className='row'>
                                                                <div className='col-12'>
                                                                    <video className='p-0 border-0 vedioPlayer' controls controlsList="nodownload" >
                                                                        <source src={this.state.video_url} type="video/mp4" />
                                                                        Your browser does not support HTML5 video.
                                                                    </video>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    </div>
                                                    <div className="py-3 course__video-price">
                                                        {!this.state.user_paid && (
                                                            <p>
                                                                €{this.state.paid_amount - this.state.coupon_discount} <del>{(this.state.discount_amount + this.state.coupon_discount) > 0 && (`€ ${this.state.discount_amount + this.state.paid_amount}`)}</del>
                                                            </p>
                                                        )}
                                                        {this.state.created_by && this.state.created_by._id == this.props.profile_id && (
                                                            <button
                                                                // onClick={() => {
                                                                //     this.props.history.push(`/course-start/${this.state.Course_id}`)
                                                                // }}
                                                                className='py-2 btn btn-primary btn-sm w-100 bgthwh disabled'>Own Course</button>
                                                        )}
                                                        {this.state.paymentLoader && (
                                                            <button className='py-2 btn btn-primary btn-sm w-100 bgthwh disabled'>payment processing... </button>
                                                        )}
                                                        {this.state.created_by && this.state.created_by._id != this.props.profile_id && (
                                                            <>
                                                                {this.state.paid_amount > 0 && !this.state.paymentLoader && (
                                                                    <>
                                                                        {!this.state.user_paid && (
                                                                            // <StripeCheckout
                                                                            //     token={this.onToken}
                                                                            //     stripeKey={process.env.REACT_APP_STRIP_KEY}
                                                                            //     image={this.state.user_details && this.state.user_details.profile_photo}
                                                                            //     // panelLabel="Give Money" // prepended to the amount in the bottom pay button
                                                                            //     amount={(this.state.paid_amount - this.state.coupon_discount) * 100} // cents
                                                                            //     ComponentClassName="div"
                                                                            //     currency="EUR"
                                                                            //     name={this.state.user_details && this.state.user_details.name} // the pop-in header title
                                                                            //     description={`Your are paying €${this.state.paid_amount - this.state.coupon_discount} for course.`} // the pop-in header subtitle
                                                                            // >
                                                                            //     <button className='py-2 btn btn-primary btn-sm w-100 bgthwh'>€{this.state.paid_amount - this.state.coupon_discount} BUY NOW</button>
                                                                            // </StripeCheckout>
                                                                            <button className='py-2 btn btn-primary btn-sm w-100 bgthwh'
                                                                                onClick={() => { this.setState({ emailModal: true, emailsendingmsg:""})}}
                                                                            >Ilmoittaudu valmennukseen</button>

                                                                        )}
                                                                        {this.state.user_paid && (
                                                                            <button
                                                                                onClick={() => {
                                                                                    this.props.history.push(`/course-start/${this.state.Course_id}`)
                                                                                }}
                                                                                className='py-2 btn btn-primary btn-sm w-100 bgthwh'>Start Course (payment done)</button>
                                                                        )}
                                                                    </>
                                                                )}
                                                            </>
                                                        )}


                                                    </div>
                                                    <div className="mb-5 course__video-content">
                                                        <ul className="list-unstyled courses_side_details_bar">
                                                            {!this.state.user_paid && (
                                                                <li className="">
                                                                    <div class="input-group mb-3">
                                                                        <a href="#" className="py-2 text-dark"
                                                                            onClick={() => {
                                                                                this.setState({
                                                                                    coupon_have: !this.state.coupon_have,
                                                                                    coupon_info: ""
                                                                                })
                                                                            }}
                                                                        >Have a Coupen Code ?</a>
                                                                        {this.state.coupon_have && (
                                                                            <div class="input-group mb-3">
                                                                                <input type="text" class="form-control course-input p-1 m-0 promo-input-group" placeholder="Enter Coupen Code" aria-label="Recipient's username" aria-describedby="basic-addon2"
                                                                                    onChange={(e) => {
                                                                                        this.setState({
                                                                                            coupon_input: e.target.value
                                                                                        })
                                                                                    }}
                                                                                />
                                                                                {/* <span class="input-group-text btn-sm" id="basic-addon2">Check</span> */}
                                                                                {this.state.coupon_input && (
                                                                                    <button class="input-group-text btn-sm btn btn-primary px-2 btn-sm coupon_btn  bgthwh ms-n1"
                                                                                        onClick={() => {
                                                                                            if (this.state.coupon_loader == false) {
                                                                                                this.checkCourseCoupon()
                                                                                            }
                                                                                        }}
                                                                                    >{this.state.coupon_loader ? "loading..." : "Verify"}</button>
                                                                                )}
                                                                            </div>
                                                                        )}
                                                                        <small className='text-grey-600'>{this.state.coupon_have && this.state.coupon_info}</small>
                                                                    </div>

                                                                </li>
                                                            )}



                                                            <li className="">
                                                                <div className="px-2 course__video-icon d-inline-flex">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house-door" viewBox="0 0 16 16">
                                                                        <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z" />
                                                                    </svg>
                                                                </div>
                                                                <div className="d-inline-flex course__video-info">
                                                                    <h5><span>Instructor :</span> {this.state.user_details && this.state.user_details.name}</h5>
                                                                </div>
                                                            </li>
                                                            <li className="d-none">
                                                                <div className="px-2 course__video-icon d-inline-flex">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-book" viewBox="0 0 16 16">
                                                                        <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
                                                                    </svg>
                                                                </div>
                                                                <div className="d-inline-flex course__video-info">
                                                                    <h5><span>Lectures  :</span> 4</h5>
                                                                </div>
                                                            </li>
                                                            <li className="d-none">
                                                                <div className="px-2 course__video-icon d-inline-flex">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-stopwatch" viewBox="0 0 16 16">
                                                                        <path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5V5.6z" />
                                                                        <path d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64a.715.715 0 0 1 .012-.013l.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354a.512.512 0 0 1-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5zM8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3z" />
                                                                    </svg>
                                                                </div>
                                                                <div className="d-inline-flex course__video-info">
                                                                    <h5><span>Duration  :</span> 16h 52m 36s</h5>
                                                                </div>
                                                            </li>
                                                            <li className="">
                                                                <div className="px-2 course__video-icon d-inline-flex">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                                                                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                                                                    </svg>
                                                                </div>
                                                                <div className="d-inline-flex course__video-info">
                                                                    <h5><span>Enrolled :</span> {this.state.enrol_users} students</h5>
                                                                </div>
                                                            </li>
                                                            <li className="">
                                                                <div className="px-2 course__video-icon d-inline-flex">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-tags" viewBox="0 0 16 16">
                                                                        <path d="M3 2v4.586l7 7L14.586 9l-7-7H3zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2z" />
                                                                        <path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1v5.086z" />
                                                                    </svg>
                                                                </div>
                                                                <div className="d-inline-flex course__video-info">
                                                                    <h5><span>Course level :</span> {this.state.course_level}</h5>
                                                                </div>
                                                            </li>
                                                            <li className="">
                                                                <div className="px-2 course__video-icon d-inline-flex">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-globe" viewBox="0 0 16 16">
                                                                        <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z" />
                                                                    </svg>
                                                                </div>
                                                                <div className="d-inline-flex course__video-info">
                                                                    <h5><span>Language :</span> {this.state.audio_language}</h5>
                                                                </div>
                                                            </li>
                                                            <li className="">
                                                                <div className="px-2 course__video-icon d-inline-flex">
                                                                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-share" viewBox="0 0 16 16">
                                                                        <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
                                                                    </svg> */}
                                                                </div>
                                                                <div className="d-inline-flex course__video-info">
                                                                    <h5 className='cursor-pointer'>
                                                                        {/* <span>Share:</span> */}
                                                                        <CopyToClipboard copyText={`${window.location.hostname}/course-detail/${this.state.Course_id}`} />
                                                                    </h5>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </div>


                            <Modal show={this.state.emailModal} onHide={() => { this.setState({ emailModal:false})}}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Ilmoittaudu sähköpostilla</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Formik
                                        initialValues={{
                                            name: '',
                                            email: '',
                                            phone: '',
                                            massege: '',
                                            product: `product # ${this.state.Course_id} and ${this.state.titleInput}`, 
                                        }}
                                        validationSchema={validationSchemaEmail}
                                        onSubmit={(values, { setSubmitting }) => {
                                            console.log(values)
                                            setSubmitting(true)
                                            AuthApi.sendEmailforcourses(values).then(res=>{
                                                if (res.data.Error == false) {
                                                    this.setState({
                                                        // emailsendingmsg: res.data.msg,
                                                        emailsendingmsg:"Kiitos tilauksesta. Saat vahvistuksen sähköpostiisi. Nähdään valmennuksessa!"
                                                    })
                                                }
                                                setSubmitting(false)
                                            }).catch(error=>{
                                                setSubmitting(false)
                                                this.setState({
                                                    emailsendingmsg: "Ilmoittautuminen epäonnistui"
                                                })
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
                                            setFieldValue
                                            /* and other goodies */
                                        }) => (
                                            <Form>
                                                <div className="mb-0 form-group icon-input rounded-circle">
                                                    {/* <i className="font-sm ti-email text-grey-500 pe-0"></i> */}
                                                    <Field
                                                        name="name"
                                                        className="style2-input form-control text-grey-900 font-xsss fw-600"
                                                        placeholder="Nimi"
                                                    />
                                                </div>
                                                <small className="text-danger">
                                                    <b>
                                                        <ErrorMessage name="name" />
                                                    </b>
                                                </small>
                                                <div className="mb-0 form-group icon-input rounded-circle mt-1">
                                                    {/* <i className="font-sm ti-email text-grey-500 pe-0"></i> */}
                                                    <Field
                                                        name="email"
                                                        className="style2-input form-control text-grey-900 font-xsss fw-600"
                                                        placeholder="Sähköposti"
                                                    />
                                                </div>
                                                <small className="text-danger">
                                                    <b>
                                                        <ErrorMessage name="email" />
                                                    </b>
                                                </small>
                                                <div className="mb-0 form-group icon-input rounded-circle mt-1">
                                                    {/* <i className="font-sm ti-email text-grey-500 pe-0"></i> */}
                                                    <Field
                                                        name="phone"
                                                        className="style2-input form-control text-grey-900 font-xsss fw-600"
                                                        placeholder="Puhelinnumero"
                                                    />
                                                </div>
                                                <small className="text-danger">
                                                    <b>
                                                        <ErrorMessage name="phone" />
                                                    </b>
                                                </small>

                                                <div className="mb-0 form-group icon-input rounded-circle mt-1">
                                                    <textarea name="massege"
                                                        placeholder=""
                                                     className="form-control"
                                                    onChange={(e)=>{
                                                        setFieldValue("massege",e.target.value,true)
                                                    }}
                                                    >

                                                    </textarea>
                                                </div>
                                                <small className="text-danger">
                                                    <b>
                                                        <ErrorMessage name="massege" />
                                                    </b>
                                                </small>
                                                <small className="my-3 text-danger ">
                                                    <b>{this.state.emailsendingmsg}</b>
                                                </small>
                                                <br></br>
                                                <br></br>
                                                {this.state.emailsendingmsg =="" &&  (
                                                    <div className="p-0 mt-2 text-left col-sm-12">
                                                        <div className="mb-1 form-group">
                                                            {isSubmitting && (
                                                                <button
                                                                    type="button"
                                                                    className="p-0 text-center text-white border-0 form-control style2-input fw-600 bg-dark "
                                                                >
                                                                    Lähetetään ilmoittautumista
                                                                </button>
                                                            )}
                                                            {!isSubmitting && (
                                                                <button
                                                                    type="submit"
                                                                    className="p-0 text-center text-white border-0 form-control style2-input fw-600 bg-dark "
                                                                >
                                                                    VARAA
                                                                </button>
                                                            )}
                                                        </div>

                                                    </div>
                                                )}
                                               
                                            </Form>

                                        )}
                                    </Formik>
                                </Modal.Body>
                                <Modal.Footer>

                                </Modal.Footer>
                            </Modal>
                            {/* ************************************************************* */}

                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />



                            {/* ************************************ */}
                        </div>
                    </div>
                </div>
                {/* ******************************** */}
                <Popupchat />
                <Appfooter />
            </Fragment>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        profile_id: state.UserProfile.profile._id
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CoursesDetail))
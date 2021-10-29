import React, { Component, Fragment } from "react";
import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Rightchat from '../components/Rightchat';
import Pagetitle from '../components/Pagetitle';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import ApiLoader from '../components/ApiLoader'

import CourseApi from '../api/Courses'

import CoursesSectionDetail from "../components/CoursesSectionDetail";
import StripeCheckout from 'react-stripe-checkout';

class CoursesDetail extends Component {
    constructor() {
        super()
        this.state = {
            updateingCourse: false,
            loadingCourse: true,

            TitleEdite: false,
            titleInput: "Course Title",
            desEdite: false,
            desInput: "Course des",

            Course_id: "",

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

            vedioUploading: false,
            publish: false,

            paymentLoader: false
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
                        titleInput: res.data.data.title,
                        desInput: res.data.data.description,
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

                        Course_id: res.data.data._id,
                        loadingCourse: false
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
            payment_token: token.id
        }
        this.setState({ paymentLoader: true })
        CourseApi.coursePayment(data).then(res => {
            console.log(res)
            if (res.data.Error == false) {
                this.setState({
                    user_paid: true,
                    paymentLoader: false
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

                <div className="main-content right-chat-active">
                    <div className="middle-sidebar-bottom">
                        <div className="middle-sidebar-left pe-0">




                            {!this.state.loadingCourse && (
                                <>
                                    <div className="card border-0 px-3 mb-3">
                                        <div className="row bgthwh rounded">
                                            <div className="col-7">
                                                <div className="card-body p-4 w-100 bgthwh border-0 d-flex rounded-3">
                                                    <a href="#"
                                                        className="d-inline-block mt-2"
                                                        onClick={() => {
                                                            this.props.history.goBack()
                                                        }}
                                                    >
                                                        <i className="ti-arrow-left font-sm text-white"></i>
                                                    </a>
                                                    {/* <Link to="/" className="d-inline-block mt-2"></Link> */}
                                                    <h4 className="font-xs text-white fw-600 ms-4 mb-0 mt-2"> Course Details</h4>
                                                </div>
                                                <h1 className='mb-0 fw-900 text-white ms-4' >{this.state.titleInput}</h1>
                                                <p className='ms-4'>{this.state.desInput}</p>
                                            </div>
                                            <div className="col-5">
                                                {!this.state.vedioUploading && this.state.video_url && (
                                                    <div className="card-body d-block p-0 mb-3 mt-3" >
                                                        <div className='row'>
                                                            <div className='col-12'>
                                                                <video className='vedioPlayer' controls autoplay>
                                                                    <source src={this.state.video_url} type="video/mp4" />
                                                                    Your browser does not support HTML5 video.
                                                                </video>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card shadow-xss w-100 d-block d-flex border-0 p-4 mb-3">

                                        <div className="row">
                                            <div className="col-6">
                                                <label htmlFor="">What will students learn in your course?</label>
                                                <p> {this.state.learning_points}</p>
                                            </div>
                                            <div className="col-6">
                                                <label htmlFor="">Requirements</label>
                                                <p> {this.state.requirements}</p>
                                            </div>
                                            <div className="col-6">
                                                <label htmlFor="">Course Level</label>
                                                <p>{this.state.course_level}</p>
                                            </div>
                                            <div className="col-6">
                                                <label htmlFor="">Audio Language</label>
                                                <p>{this.state.audio_language}</p>
                                            </div>
                                            <div className="col-6">
                                                <label htmlFor="">Course Category</label>
                                                {this.state.course_category}
                                            </div>
                                            <div>
                                                <label htmlFor="">Course Price</label>
                                                <h6 className="font-xsss fw-600 text-grey-500 ls-2">${this.state.paid_amount} <del>${this.state.discount_amount}</del> </h6>

                                            </div>


                                            <div className="col-6">
                                                <label htmlFor="">thumbnail</label>
                                                <div>
                                                    {this.state.thumbnail !== '' && (
                                                        <img src={this.state.thumbnail} className='img-fluid' />
                                                    )}
                                                </div>
                                            </div>

                                            <div className="col-6">
                                                {this.state.paymentLoader && (
                                                    <button className='btn btn-primary btn-sm'>Loading...</button>
                                                )}
                                                {!this.state.paymentLoader && (
                                                    <>
                                                        {!this.state.user_paid && (
                                                            <StripeCheckout
                                                                token={this.onToken}
                                                                stripeKey={process.env.REACT_APP_STRIP_KEY}
                                                                // image="https://node.globalfansy.com/assets/user.png"
                                                                // panelLabel="Give Money" // prepended to the amount in the bottom pay button
                                                                amount={this.state.paid_amount * 100} // cents
                                                                ComponentClass="div"
                                                                currency="USD"
                                                            // name="Three Comma Co." // the pop-in header title
                                                            // description="Big Data Stuff" // the pop-in header subtitle
                                                            >
                                                                <button className='btn btn-primary btn-sm'>Pay ${this.state.paid_amount} to enroll</button>
                                                            </StripeCheckout>

                                                        )}
                                                        {this.state.user_paid && (
                                                            <button className='btn btn-primary btn-sm'>Start Course (payment done)</button>
                                                        )}
                                                    </>
                                                )}




                                            </div>

                                        </div>

                                        {!this.state.paymentLoader && this.state.Course_id && <CoursesSectionDetail course_id={this.state.Course_id} />}



                                    </div>
                                </>
                            )}




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

export default withRouter(CoursesDetail);
import React, { Component, Fragment } from "react";
import { Formik, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';

import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Rightchat from '../components/Rightchat';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';


import { connect } from 'react-redux';
import ACTIONS from '../store/actions/index.js.js';
import { Link, withRouter } from 'react-router-dom'

let validationSchemaLogin = Yup.object({
    email: Yup.string().required('Email is Required.').email('Email is not valid.'),
    password: Yup.string().required('Password is Required.').min(6, 'Must be greater then 6 characters.'),
})

class AddEvents extends Component {

    constructor(props) {
        super();
        this.state = {
            loader:true,
        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState,) {
  
    }

    render() {
 
        return (
            <Fragment>
                <Header />
                <Leftnav />
                <Rightchat />

                <div className="main-content bg-lightblue theme-dark-bg right-chat-active">
                    <div className="middle-sidebar-bottom">
                        <div className="middle-sidebar-left">
                            <div className="middle-wrap">
                                {/* **************** */}

                                {!this.props.profileLoading && (
                                    <Formik
                                        initialValues={{
                                            // isPrivate: this.props.profile.isPrivate,
                                            // about: this.props.profile.about,
                                            // bio: this.props.profile.bio,
                                            // profile_photo: this.props.profile.profile_photo,
                                            // profile_cover: this.props.profile.profile_cover,
                                            // paypalEmail: this.props.profile.paypalEmail,
                                            // name: this.props.profile.name,
                                            // phone: this.props.profile.phone,
                                            // email: this.props.profile.email,
                                        }}
                                        validationSchema={validationSchemaLogin}
                                        onSubmit={(values, { setSubmitting }) => {
                                            setTimeout(() => {
                                                alert(JSON.stringify(values, null, 2));
                                                setSubmitting(false);
                                            }, 400);
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
                                            <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                                                <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-3">
                                                    <Link to="/events" className="d-inline-block mt-2"><i className="ti-arrow-left font-sm text-white"></i></Link>
                                                    <h4 className="font-xs text-white fw-600 ms-4 mb-0 mt-2">Add Event</h4>
                                                </div>

                                                <div className="card w-100   overflow-hidden border-0    d-none    ">
                                                    <div className="card-body position-relative h150 bg-image-cover bg-image-center"
                                                        style={{ backgroundImage: `url("https://via.placeholder.com/1200x250.png")` }}></div>
                                                    <div className="card-body d-block pt-4 text-center">
                                                        <figure className="avatar mt--6 position-relative w75 z-index-1 w100 z-index-1 ms-auto me-auto"><img src="assets/images/user.png" alt="avater" className="p-1 bg-white rounded-xl w-100" /></figure>
                                                        {/* <h4 className="font-xs ls-1 fw-700 text-grey-900">Surfiya Zakir <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">@surfiyazakir22</span></h4> */}
                                                    </div>


                                                </div>
                                                <div className="card-body p-lg-5 p-4 pt-n-5 pt-0 w-100 border-0 ">


                                                    <form onSubmit={handleSubmit}>
                                                        <div className="row">
                                                            <div className="col-lg-12 mb-3">
                                                                <div className="form-group">
                                                                    <label className="mont-font fw-600 font-xsss mb-2">Title</label>
                                                                   
                                                                    <Field id="name" name="name" className="form-control" placeholder="Event title" />

                                                                    <ErrorMessage
                                                                        name='name'
                                                                        component="small"
                                                                        className="text-danger"
                                                                    />

                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6 mb-3">
                                                                <div className="form-group">
                                                                    <label className="mont-font fw-600 font-xsss mb-2">Start Date</label>
                                                                    <Field id="email" name="email" className="form-control" placeholder="Event start date" />

                                                                    <ErrorMessage
                                                                        name='email'
                                                                        component="small"
                                                                        className="text-danger"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6 mb-3">
                                                                <div className="form-group">
                                                                    <label className="mont-font fw-600 font-xsss mb-2">End Date</label>
                                                                    <Field id="email" name="email" className="form-control" placeholder="Event end date" />

                                                                    <ErrorMessage
                                                                        name='email'
                                                                        component="small"
                                                                        className="text-danger"
                                                                    />
                                                                </div>
                                                            </div>

                                                        </div>

                                                        <div className="row">

                                                            <div className="col-lg-6 mb-3">
                                                                <div className="form-group">
                                                                    <label className="mont-font fw-600 font-xsss mb-2">Event Type</label>
                                                                    
                                                                    <Field id="paypalEmail" name="paypalEmail" className="form-control" placeholder="Event type" />

                                                                    <ErrorMessage
                                                                        name='paypalEmail'
                                                                        component="small"
                                                                        className="text-danger"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6 mb-3">
                                                                <div className="form-group">
                                                                    <label className="mont-font fw-600 font-xsss mb-2">Thumbnail</label>
                                                                    
                                                                    <Field id="paypalEmail" type='file' name="paypalEmail" className="form-control" placeholder="Thumbnail of event" />

                                                                    <ErrorMessage
                                                                        name='paypalEmail'
                                                                        component="small"
                                                                        className="text-danger"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6 mb-3">
                                                                <div className="form-group">
                                                                    <label className="mont-font fw-600 font-xsss mb-2">Paid/Free</label>
                                                                    
                                                                    <Field id="paypalEmail" name="paypalEmail" className="form-control" placeholder="Event Fee" />

                                                                    <ErrorMessage
                                                                        name='paypalEmail'
                                                                        component="small"
                                                                        className="text-danger"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6 mb-3">
                                                                <div className="form-group">
                                                                    <label className="mont-font fw-600 font-xsss mb-2">Limited/Unlimited</label>
                                                                    
                                                                    <Field id="paypalEmail" name="paypalEmail" className="form-control" placeholder="Event Seats" />

                                                                    <ErrorMessage
                                                                        name='paypalEmail'
                                                                        component="small"
                                                                        className="text-danger"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12 mb-3">
                                                                <div className="form-group">
                                                                    <label className="mont-font fw-600 font-xsss mb-2">Location</label>
                                                                    
                                                                    <Field id="paypalEmail" name="paypalEmail" className="form-control" placeholder="Event location" />

                                                                    <ErrorMessage
                                                                        name='paypalEmail'
                                                                        component="small"
                                                                        className="text-danger"
                                                                    />
                                                                </div>
                                                            </div>

 

                                                        
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-lg-12 d-flex justify-content-end">
                                                                <button type="submit" disabled={true} className="btn btn-primary">Add Event</button>
                                                            </div>


                                                        </div>

                                                    </form>
                                                </div>
                                            </div>

                                        )}
                                    </Formik>

                                )}
                                {/* **************** */}

                            </div>
                        </div>

                    </div>
                </div>

                <Popupchat />
                <Appfooter />
            </Fragment>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        profileLoading: state.UserProfile.loading,
        profile: state.UserProfile.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // removePosts: (data) => {
        //     dispatch(ACTIONS.removePosts(data))
        // },
        // loadProfile: (data) => {
        //     dispatch(ACTIONS.loadProfile(data))
        // },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddEvents))
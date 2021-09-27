import React, { Component, Fragment } from "react";
import { Formik, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';

import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Rightchat from '../components/Rightchat';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';

import backgroundImage from '../../public/assets/images/product.png'
import { connect } from 'react-redux';
import ACTIONS from '../store/actions/index.js.js';
import { Link, withRouter } from 'react-router-dom'

import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker'

import Events from '../api/Events'

let validationSchemaEvent = Yup.object({
    title: Yup.string().required('Title is required.'),
    event_type: Yup.string().required('Event type is required.'),
    paid_status: Yup.string().required('Paid/Fee is required.'),
    dateTime: Yup.array().min(1, 'Start date and end date is required.').required('Start date and end date is required.'),
    thumbnail: Yup.string().required('Thumbnail is required.'),
    seats_status: Yup.string().required('Event status is required.'),

    paid_amount: Yup.string().when("paid_status", {
        is: val => (val && val == 'Paid' ? true : false),
        then: Yup.string().required('Event paid amount is required.'),
    }),
    location: Yup.string().when("event_type", {
        is: val => (val && val !== "Physical" ? false : true),
        then: Yup.string().required('Location is required.'),
    }),
    event_seats: Yup.string().when("seats_status", {
        is: val => (val && val !== "Limited" ? false : true),
        then: Yup.string().required('Event seats is required.'),
    }),
    // password: Yup.string().required('Password is Required.').min(6, 'Must be greater then 6 characters.'),
})

class AddEvents extends Component {

    constructor(props) {
        super();
        this.state = {
            loader: true,
            value: "",
            thumbnail: "",
            serverError: "",

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
                                            title: '',
                                            event_type: '',
                                            location: '',
                                            paid_amount: '',
                                            paid_status: '',
                                            dateTime: "",
                                            seats_status: "",
                                            event_seats: "",
                                            thumbnail: ""

                                        }}
                                        validationSchema={validationSchemaEvent}
                                        onSubmit={(values, { setSubmitting }) => {


                                            let data = new FormData();
                                            data.append('title', values.title)
                                            data.append('event_type', values.event_type)
                                            data.append('location', values.location)
                                            data.append('paid_amount', values.paid_amount) 
                                            data.append('paid_status', values.paid_status)
                                            data.append('start_date', new Date(values.dateTime[0]))
                                            data.append('end_date', new Date(values.dateTime[1]))
                                            data.append('seats_status', values.seats_status)
                                            data.append('event_seats', values.event_seats)
                                            data.append('thumbnail', values.thumbnail)

                                            Events.addEvent(data).then(res => {
                                                console.log(res)
                                                if (res.data.Error == false) { 
                                                    this.props.history.push("/events") 
                                                } else {
                                                    this.setState({ serverError: res.data.msg })
                                                }
                                                setSubmitting(false);
                                            }).catch(error => {
                                                console.log(error)
                                                if (error.response.data.Error==true){
                                                    this.setState({ serverError: error.response.data.msg })
                                                }
                                                setSubmitting(false);
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
                                            <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                                                <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-3">
                                                    <Link to="/events" className="d-inline-block mt-2"><i className="ti-arrow-left font-sm text-white"></i></Link>
                                                    <h4 className="font-xs text-white fw-600 ms-4 mb-0 mt-2">Add Event</h4>
                                                </div>

                                                <div className="card w-100   overflow-hidden border-0      ">
                                                    <div className="card-body position-relative h150 bg-image-cover bg-image-center"
                                                        style={{ backgroundImage: `url("${this.state.thumbnail ? this.state.thumbnail : backgroundImage}")` }}>
                                                        <span className='editebtn baner'
                                                            onClick={() => { document.getElementById("thumbnail").click() }}
                                                        ><i className="font-sm ti-pencil-alt text-grey-500 pe-0 "></i></span>
                                                    </div>


                                                    <input type='file' name='profile_photo' id="thumbnail"
                                                        onChange={(e) => {
                                                            if (e.target.value) {
                                                                if (e.currentTarget.files[0].type.split('/')[0] == "image") {
                                                                    const file = e.currentTarget.files[0];
                                                                    let reader = new FileReader();
                                                                    reader.onloadend = () => {
                                                                        setFieldValue("thumbnail", file)
                                                                        this.setState({
                                                                            thumbnail: reader.result,
                                                                        }, () => {
                                                                            // console.log(this.state.profileImageURL)
                                                                        });
                                                                    };
                                                                    reader.readAsDataURL(file);
                                                                } else {
                                                                    setFieldValue("thumbnail", '')
                                                                    this.setState({
                                                                        profileImage: '',
                                                                    })
                                                                }

                                                            } else {
                                                                setFieldValue("thumbnail", '')
                                                                this.setState({
                                                                    profileImage: '',
                                                                })
                                                            }


                                                        }}
                                                        className='d-none' />



                                                </div>
                                                <div className="card-body p-lg-5 p-4 pt-n-5 pt-0 w-100 border-0 ">
                                                    <form onSubmit={handleSubmit}>
                                                        <div className="row">
                                                            <div className="col-lg-12 mb-3">
                                                                <ErrorMessage
                                                                    name='thumbnail'
                                                                    component="small"
                                                                    className="text-danger"
                                                                />
                                                            </div>
                                                            <div className="col-lg-12 mb-3">
                                                                <div className="form-group">
                                                                    <label className="mont-font fw-600 font-xsss mb-2">Title</label>

                                                                    <Field id="title" name="title" className="form-control" placeholder="Event title" />
                                                                    <ErrorMessage
                                                                        name='title'
                                                                        component="small"
                                                                        className="text-danger"
                                                                    />

                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12 mb-3">
                                                                {/* {JSON.stringify(this.state.value)} */}
                                                                <div className="form-group">
                                                                    <label className="mont-font fw-600 font-xsss mb-2">Start Date/End Date</label>
                                                                    <DateTimeRangePicker
                                                                        // dateTtime={true}
                                                                        // format="D-M-Y h:mm a"
                                                                        minDate={new Date()}
                                                                        className='form-control dateTimepicker'
                                                                        onChange={(e) => {
                                                                            console.log(e)
                                                                            if(e==null){
                                                                                setFieldValue("dateTime", [])
                                                                            }else{
                                                                                setFieldValue("dateTime", e)
                                                                            }
                                                                            this.setState({ value: e })
                                                                        }}
                                                                        value={this.state.value}
                                                                    />
                                                                    <ErrorMessage
                                                                        name='dateTime'
                                                                        component="small"
                                                                        className="text-danger"
                                                                    />
                                                                </div>
                                                            </div>


                                                        </div>

                                                        <div className="row">

                                                            <div className="col-lg-4 mb-3">
                                                                <div className="form-group">
                                                                    <label className="mont-font fw-600 font-xsss mb-2">Event Type</label>

                                                                    <select className="form-control" placeholder="Event type"
                                                                        onChange={(e) => {
                                                                            setFieldValue("event_type", e.target.value)
                                                                        }}
                                                                    >
                                                                        <option value=''>Select Event Type</option>
                                                                        <option value='Physical'>Physical</option>
                                                                        <option value='Stream'>Stream</option>
                                                                    </select>
                                                                    <ErrorMessage
                                                                        name='event_type'
                                                                        component="small"
                                                                        className="text-danger"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className={`${values.seats_status == "Limited" ? "col-lg-4" : "col-lg-8"} mb-3`}>
                                                                <div className="form-group">
                                                                    <label className="mont-font fw-600 font-xsss mb-2">Limited/Unlimited</label>
                                                                    <select className="form-control" placeholder="Event type"
                                                                        onChange={(e) => {
                                                                            setFieldValue("seats_status", e.target.value)
                                                                        }}
                                                                    >
                                                                        <option value=''>Select Limited/Unlimited</option>
                                                                        <option value='Unlimited'>Unlimited</option>
                                                                        <option value='Limited'>Limited</option>
                                                                    </select>
                                                                    <ErrorMessage
                                                                        name='seats_status'
                                                                        component="small"
                                                                        className="text-danger"
                                                                    />
                                                                </div>
                                                            </div>
                                                            {values.seats_status == "Limited" && (
                                                                <div className="col-lg-4 mb-3">
                                                                    <div className="form-group">
                                                                        <label className="mont-font fw-600 font-xsss mb-2">Event seats</label>

                                                                        <Field id="event_seats" name="event_seats" type='number' className="form-control" placeholder="Event Seats" />

                                                                        <ErrorMessage
                                                                            name='event_seats'
                                                                            component="small"
                                                                            className="text-danger"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            )}

                                                            {values.event_type == 'Physical' && (
                                                                <div className="col-lg-12 mb-3">
                                                                    <div className="form-group">
                                                                        <label className="mont-font fw-600 font-xsss mb-2">Location</label>

                                                                        <Field id="location" name="location" className="form-control" placeholder="Event location" />

                                                                        <ErrorMessage
                                                                            name='location'
                                                                            component="small"
                                                                            className="text-danger"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            )}
                                                            <div className="col-lg-6 mb-3">
                                                                <div className="form-group">
                                                                    <label className="mont-font fw-600 font-xsss mb-2">Paid/Free</label>

                                                                    <select className="form-control" placeholder="Event type"
                                                                        onChange={(e) => {
                                                                            setFieldValue("paid_status", e.target.value)
                                                                        }}
                                                                    >
                                                                        <option value=''>Select Paid/Free</option>
                                                                        <option value='Free'>Free</option>
                                                                        <option value='Paid'>Paid</option>
                                                                    </select>
                                                                    <ErrorMessage
                                                                        name='paid_status'
                                                                        component="small"
                                                                        className="text-danger"
                                                                    />
                                                                </div>
                                                            </div>

                                                            {values.paid_status == "Paid" && (

                                                                <div className="col-lg-6 mb-3">
                                                                    <div className="form-group">
                                                                        <label className="mont-font fw-600 font-xsss mb-2">Paid Amount</label>

                                                                        <Field type="number" name="paid_amount" className="form-control" placeholder="Payment Amount" />

                                                                        <ErrorMessage
                                                                            name='paid_amount'
                                                                            component="small"
                                                                            className="text-danger"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            )}

                                                        </div>
                                                        {this.state.serverError && (
                                                            <div className="row">
                                                                <div className="col-lg-12">
                                                                    <div className='alert alert-danger'>
                                                                        {this.state.serverError}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                        {isSubmitting && (
                                                            <div className="row">
                                                                <div className="col-lg-12 d-flex justify-content-end">
                                                                    <button type="button" className="btn btn-primary">Loading...</button>
                                                                </div>
                                                            </div>
                                                        )}
                                                        {!isSubmitting && (
                                                            <div className="row">
                                                                <div className="col-lg-12 d-flex justify-content-end">
                                                                    <button type="submit" className="btn btn-primary">Add Event</button>
                                                                </div>
                                                            </div>
                                                        )}
                                                      
                                                        

                                                    </form>
                                                    <br/>
                                                    <br/>
                                                    <br/>
                                                    <br/>
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
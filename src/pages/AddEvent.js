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
    start_date: Yup.string().required('start date and time is required.'),
    end_date: Yup.string().required('End date and time is required.'),
    // dateTime: Yup.array().min(1, 'Start date and end date is required.').required('Start date and end date is required.'),
    thumbnail: Yup.array().required('Thumbnail is required.'),
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
            thumbnail: [],
            thumbnailObject: [],
            fileError: "",
            serverError: "",
            vedioUrl: '',
            vedioFile: '',

        }
    }

    componentDidMount() {

    }

    removeImage = (index) => {
        let imagesList = this.state.thumbnail;
        imagesList.splice(index, 1);
        let imagesList2 = this.state.thumbnailObject;
        imagesList2.splice(index, 1);
        this.setState({
            thumbnail: imagesList,
            thumbnailObject: imagesList2,

        })
    }
    readVideo(event) {
        let file = event.currentTarget.files[0]
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                // videoSrc.src = e.target.result
                // videoTag.load()
                this.setState({
                    vedioUrl: e.target.result,
                    vedioFile: file,
                })
            }.bind(this)

            reader.readAsDataURL(event.target.files[0]);
        }
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

                                            seats_status: "",
                                            event_seats: "",
                                            thumbnail: "",
                                            start_date: "",
                                            end_date: "",
                                            description: "",


                                        }}
                                        validationSchema={validationSchemaEvent}
                                        onSubmit={(values, { setSubmitting }) => {
                                            console.log(values)
                                            let data = new FormData();
                                            data.append('title', values.title)
                                            data.append('event_type', values.event_type)
                                            data.append('location', values.location)
                                            data.append('paid_amount', values.paid_amount)
                                            data.append('paid_status', values.paid_status)
                                            data.append('start_date', values.start_date)
                                            data.append('description', values.description)
                                            data.append('end_date', values.end_date)
                                            data.append('seats_status', values.seats_status)
                                            data.append('event_seats', values.event_seats)
                                            data.append('video_url', this.state.vedioFile)
                                            // data.append('thumbnail', values.thumbnail)
                                            let images = values.thumbnail

                                            for (let i = 0; i < images.length; i++) {
                                                data.append('thumbnail', images[i])
                                            }

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
                                                if (error.response.data.Error == true) {
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
                                                <div className="card-body p-4 w-100 bgthwh border-0 d-flex rounded-3">
                                                    <Link to="/events" className="d-inline-block mt-2"><i className="ti-arrow-left font-sm text-white"></i></Link>
                                                    <h4 className="font-xs text-white fw-600 ms-4 mb-0 mt-2">Add Event</h4>
                                                </div>

                                                <div className="card w-100   overflow-hidden border-0      ">



                                                    <input type='file' name='profile_photo' id="thumbnail"
                                                        onChange={(e) => {
                                                            if (e.target.value) {
                                                                let mb = parseInt((e.currentTarget.files[0].size / (1024 * 1024)).toFixed(2));
                                                                if (mb > 10) {
                                                                    this.setState({
                                                                        fileError: "File size should less then 10MB",
                                                                    })
                                                                } else {
                                                                    if (e.currentTarget.files[0].type.split('/')[0] == "image") {
                                                                        const file = e.currentTarget.files[0];
                                                                        let reader = new FileReader();
                                                                        reader.onloadend = () => {
                                                                            setFieldValue("thumbnail", [...this.state.thumbnailObject, file])
                                                                            this.setState({
                                                                                thumbnail: [...this.state.thumbnail, reader.result],
                                                                                thumbnailObject: [...this.state.thumbnailObject, file],
                                                                                fileError: ""
                                                                            }, () => {
                                                                                // console.log(this.state.profileImageURL)
                                                                            });
                                                                        };
                                                                        reader.readAsDataURL(file);
                                                                    } else {
                                                                        // setFieldValue("thumbnail", '')
                                                                        this.setState({
                                                                            profileImage: '',
                                                                            fileError: "",
                                                                            fileError: "File format does not supported.Upload file in JPG/JPEG/PNG format."
                                                                        })
                                                                    }
                                                                }

                                                            } else {
                                                                // setFieldValue("thumbnail", '')
                                                                this.setState({
                                                                    profileImage: '',
                                                                })
                                                            }


                                                        }}
                                                        className='d-none' />


                                                    <input type='file' id="post_vedio"
                                                        // value={this.state.post_images}
                                                        onChange={(e) => {
                                                            this.setState({
                                                                vedioUrl: "",
                                                            })
                                                            if (e.target.value) {
                                                                let mb = parseInt((e.currentTarget.files[0].size / (1024 * 1024)).toFixed(2));
                                                                // console.log("mb", typeof mb)
                                                                if (mb > 50) {
                                                                    this.setState({
                                                                        fileError: "File size should less then 50MB",
                                                                    })
                                                                } else {

                                                                    if (e.currentTarget.files[0].type.split('/')[0] == "video") {
                                                                        this.readVideo(e);
                                                                    } else {
                                                                        this.setState({
                                                                            vedioUrl: "",
                                                                            vedioFile: "",
                                                                            fileError: "File format does not supported.Upload file in MP4 format."
                                                                        })
                                                                    }

                                                                }

                                                            } else {
                                                                this.setState({
                                                                    vedioUrl: "",
                                                                    vedioFile: ""
                                                                })
                                                            }


                                                        }}
                                                        className='d-none' />




                                                </div>
                                                <div className="card-body  p-4 ">
                                                    <div className="row ">
                                                        {this.state.thumbnail.map((data, index) => {
                                                            return (
                                                                <div className="col-md-6 col-12 pb-5"
                                                                    key={index}
                                                                    onClick={async () => {
                                                                        await this.removeImage(index)
                                                                        console.log(this.state.thumbnailObject)
                                                                        setTimeout(() => {
                                                                            if (this.state.thumbnailObject.length == 0) {
                                                                                setFieldValue("thumbnail", '')
                                                                            } else {
                                                                                setFieldValue("thumbnail", this.state.thumbnailObject)
                                                                            }
                                                                        }, 500);
                                                                    }}
                                                                >
                                                                    <div className="evetImagePre">
                                                                        <img src={data} alt="" />
                                                                    </div>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                    <form onSubmit={handleSubmit}>
                                                        <div className="row ">
                                                            <div className="col-md-6 col-12 pb-3">
                                                                <div className="courseUploadVedio bgthwh rounded">
                                                                    <div className='text-center' onClick={() => { document.getElementById("thumbnail").click() }}>
                                                                        <button type='button' className='btn btn-danger'>Upload Picture</button>
                                                                        <p className='mb-0 pb-0'>File Format:.JPG/JPEG/PNG</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                {!this.state.vedioUrl && (
                                                                    <div className="courseUploadVedio bgthwh rounded">
                                                                        <div className='text-center' onClick={() => { document.getElementById("post_vedio").click() }}>
                                                                            <button type='button' className='btn btn-danger'>Upload Video</button>
                                                                            <p className='mb-0 pb-0'>File Format:.mp4</p>
                                                                        </div>
                                                                    </div>
                                                                )}

                                                                {this.state.vedioUrl && (
                                                                    <div className="card-body d-block p-0 mb-3 mt-3">
                                                                        <div className='row'>
                                                                            <div className='col-12'>
                                                                                <video className='vedioPlayer' controls autoplay>
                                                                                    <source src={this.state.vedioUrl} type="video/mp4" />
                                                                                    Your browser does not support HTML5 video.
                                                                                </video>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-lg-12 mb-3">
                                                                <ErrorMessage
                                                                    name='thumbnail'
                                                                    component="small"
                                                                    className="text-danger"
                                                                />
                                                                {this.state.fileError && (
                                                                    <p className='text-danger font-weight-bold'><small>{this.state.fileError}</small></p>
                                                                )}
                                                            </div>
                                                            <div className="col-lg-12 mb-3">
                                                                <div className="form-group">
                                                                    <label className="mont-font fw-600 font-xsss mb-2">Title</label>
                                                                    <Field id="title" name="title" className="form-control course-input " placeholder="Event title" />
                                                                    <ErrorMessage
                                                                        name='title'
                                                                        component="small"
                                                                        className="text-danger"
                                                                    />

                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12 mb-3">
                                                                <div className="form-group">
                                                                    <label className="mont-font fw-600 font-xsss mb-2">Description</label>
                                                                    <Field id="description" name="description" className="form-control course-input " placeholder="Event description" />
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
                                                                    <label className="mont-font fw-600 font-xsss mb-2">Start date and time</label>
                                                                    <input type="datetime-local" className='form-control course-input '
                                                                        onChange={(e) => {
                                                                            console.log(e)
                                                                            if (e == null) {
                                                                                setFieldValue("start_date", "")
                                                                            } else {
                                                                                setFieldValue("start_date", e.target.value)
                                                                            }
                                                                        }}
                                                                    />

                                                                    <ErrorMessage
                                                                        name='start_date'
                                                                        component="small"
                                                                        className="text-danger"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12 mb-3">
                                                                {/* {JSON.stringify(this.state.value)} */}
                                                                <div className="form-group">
                                                                    <label className="mont-font fw-600 font-xsss mb-2">End Date and time</label>
                                                                    <input type="datetime-local"
                                                                        onChange={(e) => {
                                                                            console.log(e)
                                                                            if (e == null) {
                                                                                setFieldValue("end_date", "")
                                                                            } else {
                                                                                setFieldValue("end_date", e.target.value)
                                                                            }
                                                                        }}
                                                                        className='form-control course-input ' />

                                                                    <ErrorMessage
                                                                        name='end_date'
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

                                                                    <select className="form-control course-input " placeholder="Event type"
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
                                                                    <select className="form-control course-input " placeholder="Event type"
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
                                                                        <label className="mont-font fw-600 font-xsss mb-2">Event Seats</label>

                                                                        <Field id="event_seats" name="event_seats" type='number' className="form-control course-input " placeholder="Event seats" />

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

                                                                        <Field id="location" name="location" className="form-control course-input " placeholder="Event location" />

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

                                                                    <select className="form-control course-input " placeholder="Event type"
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

                                                                        <Field type="number" name="paid_amount" className="form-control course-input " placeholder="Payment Amount" />

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
                                                                    <button type="button" className="btn btn-primary bgthwh">Loading...</button>
                                                                </div>
                                                            </div>
                                                        )}
                                                        {!isSubmitting && (
                                                            <div className="row">
                                                                <div className="col-lg-12 d-flex justify-content-end">
                                                                    <button type="submit" className="btn btn-primary bgthwh">Add Event</button>
                                                                </div>
                                                            </div>
                                                        )}



                                                    </form>
                                                    <br />
                                                    <br />
                                                    <br />
                                                    <br />
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
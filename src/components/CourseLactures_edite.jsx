import React, { Component } from 'react';
import CourseApi from '../api/Courses';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {  Modal } from "react-bootstrap";
import Load from './ApiLoader';
import SweetAlert from 'react-bootstrap-sweetalert'
import CoursesFiles from './CoursesFiles';
let validationSchema = Yup.object({
    course_id: Yup.string().required('Password is Required.'),
    section_id: Yup.string().required('Password is Required.'),
    lacture_title: Yup.string().required('Title is Required.').min(3, 'Must be greater then 3 characters.'),
    lacture_des: Yup.string().required('Description is Required.').min(6, 'Must be greater then 6 characters.'),
    // lacture_vedio: Yup.string().required('Lecture vedio is Required.'),

    // stream_time: Yup.string().when("lacture_type", {
    //     is: val => (val && val ? true : false),
    //     then: Yup.array().min(1, 'Start date and end date is required.').required('Start date and end date is required.'),
    // }),
})

class CourseLactures extends Component {
    constructor() {
        super();
        this.state = {
            lactureLoader: false,
            loaded: false,
            lactures: [],
            addLactureModal: false,
            delete_confirm:false,
        }
    }
    componentDidMount() {
        this.loadLactures()
    }
    loadLactures = () => {
        let data = {
            course_id: this.props.course_id,
            section_id: this.props.section_id,
        }
        this.setState({
            lactureLoader: true
        })
        CourseApi.getLactures(data).then(res => {
            if (res.data.Error == false) {
                this.setState({
                    lactures: res.data.data,
                    lactureLoader: false,
                    loaded: true,

                })
            }
        })
    }

    render() {
        return (
            <>
                {this.state.delete_confirm && (
                    <SweetAlert SweetAlert
                        warning
                        showCancel
                        confirmBtnText="Yes, delete it!"
                        confirmBtnBsStyle="danger"
                        title="Are you sure?"
                        onConfirm={this.deleteFile}
                        onCancel={()=>{
                            this.setState({
                                delete_confirm:false
                            })
                        }}
                        focusCancelBtn
                        customButtons={
                            <React.Fragment>
                                <button className='px-2 btn btn-primary bgthwh ms-2 btn-sm' onClick={() => this.setState({ delete_confirm: false })}>Cancel</button>
                                <button className='px-2 text-white btn btn-danger ms-2 btn-sm' onClick={() => this.setState({ copied: false })}>Yes, delete it!</button>
                            </React.Fragment>
                        }
                    >
                        You will not be able to recover this!
                    </SweetAlert>
                )}
            
                {this.state.lactureLoader && (
                    <div className='d-flex justify-content-lg-center align-items-center'
                        style={{ height: "50px" }}
                    ><Load /></div>
                )}
                {/* {this.state.lactures.length == 0 && !this.state.lactureLoader && !this.state.loaded && (<div className='cursor-pointer link-info'
                    onClick={() => {  }}
                ><u>Load lactures</u></div>)} */}
                {this.state.lactures.map((data, index) => {
                    return (
                        <>
                            <div className="adjust_padding border-bottom-dotted"
                                key={index}
                            >
                                <div class="card adjust_padding pb-0 mt-0">
                                    <div className="description_collapse lectures-play"
                                        onClick={() => {
                                            this.props.updateLactures(data)
                                        }}
                                    >
                                        <div className="video-length">
                                            <div className="pr-1 d-flex justify-content-between">
                                                <div

                                                >
                                                    {this.props.details_page ? (
                                                        <>
                                                            {data.lacture_vedio == "" && (
                                                                <i class="fas fa-lock"></i>
                                                            )}
                                                            {data.lacture_vedio !== "" && (
                                                                <i>{data.lacture_vedio == "" ? (<i class="fas fa-signal-stream"></i>) : (<i class="far fa-play-circle"></i>)}</i>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <>
                                                            {data.lacture_vedio == "" ? (<i class="fas fa-signal-stream"></i>) : (<i class="far fa-play-circle"></i>)}
                                                        </>
                                                    )}
                                                    <span className="ms-2">
                                                        {index + 1}. {data.lacture_title}
                                                    </span>
                                                </div>
                                                <div>
                                                    <div className="lectures_edite_delete video-resources">
                                                        <button className="btn btn-outline-light btn-sm d-flex">
                                                            <small> <i class="fas fa-money-check-edit"></i></small>
                                                        </button>
                                                        <button className="btn btn-outline-light btn-sm d-flex"
                                                        onClick={()=>{
                                                            this.setState({ delete_confirm:true})
                                                        }}
                                                        >
                                                            <small> <i class="far fa-trash"></i></small>
                                                        </button>
                                                    </div>
                                                   
                                                </div>
                                            </div>
                                            <p className="pb-0 mb-0">
                                                {data.lacture_des && data.lacture_des.substring(0, 100)}
                                                {data.lacture_des && data.lacture_des.length > 100 && "..."}
                                            </p>
                                            <CoursesFiles files={data.files} lacture_id={data._id} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ************* */}

                        </>

                    )
                })}

                {this.state.lactures.length == 0 && this.state.loaded && (<div className='py-4 text-center'><small className=' text-grey-500 w-100'>No lecture found</small></div>)}
                <div class="adjust_padding mt-3">
                    <div className='cursor-pointer bg-greylight'>
                        <div className='d-flex align-items-center justify-content-between'
                            onClick={() => { this.setState({ addLactureModal: true, addLactureLoader:false }) }}
                        >
                            <div>
                                <p className='pb-0 mb-0 ps-3'> Add Lecture</p>
                            </div>
                            <div className='p-2'>
                                <i class="far fa-plus p-2 cursor-pointer"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                    show={this.state.addLactureModal}
                    size='md'
                    onHide={() => this.setState({ addLactureModal: false })}
                    // dialogClassName="modal-90w"
                    aria-labelledby="example-custom-modal-styling-title"
                >
                    <Modal.Header>
                        <h4 className='mb-0'>Add Lacture</h4>
                    </Modal.Header>
                    <Modal.Body>
                        <Formik
                            initialValues={{
                                course_id: this.props.course_id,
                                section_id: this.props.section_id,
                                lacture_title: "",
                                lacture_des: "",
                                lacture_vedio: "",
                                stream_time: [],
                                lacture_type: false
                            }}
                            validationSchema={validationSchema}
                            onSubmit={(values) => {
                                this.setState({
                                    addLactureLoader: true,
                                    ApiError: "",
                                })
                                let data = new FormData();
                                data.append('course_id', values.course_id)
                                data.append('section_id', values.section_id)
                                data.append('lacture_title', values.lacture_title)
                                data.append('lacture_des', values.lacture_des)
                                data.append('lacture_vedio', values.lacture_vedio)
                                data.append('lacture_time', values.stream_time)
                                if (values.lacture_type == true) {
                                    data.append('lacture_type', "Stream")
                                } else {
                                    data.append('lacture_type', "Vedio")
                                }
                                CourseApi.addLacture(data).then(res => {
                                    console.log(res.data)
                                    if (res.data.Error == false) {
                                        this.setState({
                                            lactures: [...this.state.lactures, res.data.data],
                                            addLactureModal: false,
                                        })
                                    }
                                }).catch(error => {
                                    console.log(error.response)
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
                                <>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-0 form-group icon-input rounded-circle">
                                            {/* <i className="font-sm ti-email text-grey-500 pe-0"></i> */}
                                            <label htmlFor="">Title</label>
                                            <Field id='lacture_title' name="lacture_title" className="style2-input form-control text-grey-900 font-xsss fw-600" placeholder="Title" />

                                        </div>
                                        <small className='text-danger'><b><ErrorMessage name="lacture_title" /></b></small>
                                        <div className="mt-3 mb-0 form-group icon-input">
                                            <label htmlFor="">Description</label>
                                            {/* <i className="font-sm ti-lock text-grey-500 pe-0"></i> */}
                                            <Field type='text' name="lacture_des" className="style2-input form-control text-grey-900 font-xsss fw-600" placeholder="Description" />
                                        </div>
                                        <small className='text-danger'><b><ErrorMessage name="lacture_des" /></b></small>
                                        <div className='d-flex justify-content-between'>
                                            <div className={`d-flex  my-3 cursor-pointer  p-2 ${!this.state.streamLacture ? "border" : ""}`} onClick={() => {
                                                this.setState({
                                                    streamLacture: false
                                                })
                                                setFieldValue("lacture_type", false)
                                                document.getElementById("lacture_vedio").click()
                                            }}>
                                                <div><i class="far fa-video-plus me-2 "></i></div>
                                                <div>{this.state.fileError ? this.state.fileError : "Upload Lecture video."}</div>
                                            </div>
                                            <div className={`d-flex  my-3 cursor-pointer  p-2 ${this.state.streamLacture ? "border" : ""}`}
                                                onClick={() => {
                                                    setFieldValue("lacture_type", true)
                                                    this.setState({
                                                        streamLacture: true
                                                    })
                                                }}
                                            >
                                                <div><i class="far fa-video-plus me-2 "></i></div>
                                                <div>Live Stream Lecture</div>
                                            </div>
                                        </div>
                                        <small className='text-danger'><b><ErrorMessage name="lacture_vedio" /></b></small>
                                        <input type='file' id="lacture_vedio"
                                            onChange={(e) => {
                                                if (e.target.value) {
                                                    let mb = parseInt((e.currentTarget.files[0].size / (1024 * 1024)).toFixed(2));
                                                    if (mb > 20) {
                                                        this.setState({
                                                            fileError: "File size should less then 20MB",
                                                        })
                                                    } else {
                                                        if (e.currentTarget.files[0].type.split('/')[0] == "video") {
                                                            const file = e.currentTarget.files[0];
                                                            let reader = new FileReader();
                                                            reader.onloadend = () => {
                                                                setFieldValue("lacture_vedio", file)
                                                                this.setState({
                                                                    // thumbnail: [...this.state.thumbnail, reader.result],
                                                                    // thumbnailObject: [...this.state.thumbnailObject, file],
                                                                    fileError: "File selected."
                                                                }, () => {
                                                                    // console.log(this.state.profileImageURL)
                                                                });
                                                            };
                                                            reader.readAsDataURL(file);
                                                        } else {
                                                            // setFieldValue("thumbnail", '')
                                                            setFieldValue("lacture_vedio", '')
                                                            this.setState({
                                                                // profileImage: '',
                                                                // fileError: "",
                                                                fileError: "File format does not supported.Upload file in MP4 format."
                                                            })
                                                        }
                                                    }

                                                } else {
                                                    // setFieldValue("thumbnail", '')
                                                    setFieldValue("lacture_vedio", '')
                                                    // this.setState({
                                                    //     profileImage: '',
                                                    // })
                                                }


                                            }}
                                            className='d-none' />
                                        {/* <small className='my-3 text-danger '><b>{this.state.ApiError}</b></small> */}
                                        {this.state.streamLacture && (
                                            <div className="col-12">
                                                <label htmlFor="">Lecture Time</label>
                                                <input type="datetime-local" className='form-control'
                                                    value={values.stream_time}
                                                    min={new Date()}
                                                    onChange={(e) => {
                                                        setFieldValue("stream_time", e.target.value)

                                                    }}
                                                />
                                                {/* <DateTimeRangePicker
                                                    // dateTtime={true}
                                                    format="y-MM-dd h:mm:ss a"
                                                    minDate={new Date()}
                                                    className='form-control dateTimepicker'
                                                    onChange={(e) => {
                                                        console.log(e)
                                                        if (e == null) {
                                                            setFieldValue("stream_time", [])
                                                        } else {
                                                            setFieldValue("stream_time", e)
                                                        }
                                                        this.setState({ DatePickValue: e })
                                                    }}
                                                    value={this.state.DatePickValue}
                                                /> */}
                                                <small className='text-danger'><b><ErrorMessage name="stream_time" /></b></small>
                                            </div>
                                        )}

                                        <div className="p-0 mt-2 text-left col-sm-12">
                                            <div className="mb-1 form-group">
                                                {this.state.addLactureLoader && (
                                                    <button type="button" className="p-0 text-center text-white border-0 form-control style2-input fw-600 bg-dark ">Loading....</button>
                                                )}
                                                {!this.state.addLactureLoader && (
                                                    <button type='submit' className="p-0 text-center text-white border-0 form-control style2-input fw-600 bg-dark ">Save</button>
                                                )}
                                            </div>
                                        </div>
                                    </form>
                                </>

                            )}
                        </Formik>
                        {/* ************************************* */}

                    </Modal.Body>
                </Modal>

            </>
        );
    }
}

export default CourseLactures;
import React, { Component } from 'react';
import CourseApi from '../api/Courses';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Modal } from "react-bootstrap";
import Load from './ApiLoader';
import SweetAlert from 'react-bootstrap-sweetalert'
import CoursesFiles from './CoursesFiles';
import moment from 'moment';
let validationSchema = Yup.object({
    course_id: Yup.string().required('Password is Required.'),
    section_id: Yup.string().required('Password is Required.'),
    lacture_title: Yup.string().required('Title is Required.').min(3, 'Must be greater then 3 characters.'),
    lacture_des: Yup.string().required('Description is Required.').min(6, 'Must be greater then 6 characters.'),
    stream_time: Yup.string().when("lacture_type", {
        is: val => (val && val ? true : false),
        then: Yup.string().required('Lecture Time is required.'),
    }),
    lacture_vedio: Yup.string().when("lacture_type", {
        is: val => (val && val ? false : true),
        then: Yup.string().required('Lecture Video is required.'),
    }),
})


class CourseLactures extends Component {
    constructor() {
        super();
        this.state = {
            lactureLoader: false,
            loaded: false,
            lactures: [],
            addLactureModal: false,
            delete_confirm: false,
            vedioUrl: "",
            deleting_id: "",
            deleting_loader: false,
            delete_success: false,
            vedioLink: '',
            vedioModal: false,
            update_settings: false,
            update_edit_data: {},
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

    readVideo(event) {
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                this.setState({
                    vedioUrl: '',
                }, () => {
                    this.setState({
                        vedioUrl: e.target.result,
                    })
                })
            }.bind(this)

            reader.readAsDataURL(event.target.files[0]);
        }
    }

    deleteCourseLecture = () => {
        let data = {
            lecture_id: this.state.deleting_id
        }
        this.setState({
            deleting_loader: true,

        })
        CourseApi.deleteCourseLecture(data).then(res => {
            if (res.data.Error == false) {
                let all_slactures = this.state.lactures;
                let update_index = all_slactures.findIndex(data => data._id == this.state.deleting_id)
                delete all_slactures[update_index]
                let new_data = all_slactures.filter(data => data)
                this.setState({
                    lactures: new_data,
                    delete_confirm: false,
                    deleting_loader: false
                }, () => {
                    this.setState({
                        delete_success: true
                    })
                })
                setTimeout(() => {
                    this.setState({
                        delete_success: false
                    })
                }, 1500);
            }
        })

    }



    render() {
        return (
            <>
                {this.state.delete_success && (
                    <SweetAlert success title="Good job!"
                        customButtons={
                            <React.Fragment>
                                <button className='px-2 btn btn-primary bgthwh ms-2 btn-sm' onClick={() => this.setState({ delete_success: false })}>Okay</button>
                            </React.Fragment>
                        }    >
                        Deleted successfully
                    </SweetAlert>
                )}
                {this.state.delete_confirm && (
                    <SweetAlert SweetAlert
                        warning
                        showCancel
                        confirmBtnText="Yes, delete it!"
                        confirmBtnBsStyle="danger"
                        title="Are you sure?"
                        onConfirm={this.deleteFile}
                        onCancel={() => {
                            this.setState({
                                delete_confirm: false
                            })
                        }}
                        focusCancelBtn
                        customButtons={
                            <React.Fragment>
                                {this.state.deleting_loader ? (
                                    <button className='px-2 btn btn-primary bgthwh ms-2 btn-sm'>Loading....</button>
                                ) : (
                                    <>
                                        <button className='px-2 btn btn-primary bgthwh ms-2 btn-sm' onClick={() => this.setState({ delete_confirm: false })}>Cancel</button>
                                        <button className='px-2 text-white btn btn-danger ms-2 btn-sm' onClick={() => this.deleteCourseLecture()}>Yes, delete it!</button>

                                    </>
                                )}
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
                                                    <span className="ms-2"
                                                        onClick={() => {
                                                            if (data.lacture_vedio) {
                                                                this.setState({
                                                                    vedioLink: data.lacture_vedio,
                                                                    vedioModal: true
                                                                })
                                                            }

                                                        }}
                                                    >
                                                        {index + 1}. {data.lacture_title}<sub className='ms-2'>{data.lacture_time && `(${moment(data.lacture_time).format("DD-MMM-YY hh:MM a")})`}</sub>
                                                    </span>
                                                </div>
                                                <div>
                                                    <div className="lectures_edite_delete video-resources">
                                                        <button className="btn btn-outline-light btn-sm d-flex"
                                                            onClick={() => {
                                                                let stream = true
                                                                if (data.lacture_vedio) {
                                                                    stream = false
                                                                }
                                                                let datas = {
                                                                    id: data._id,
                                                                    lacture_title: data.lacture_title,
                                                                    lacture_des: data.lacture_des,
                                                                    lacture_time: data.lacture_time,
                                                                    lacture_vedio: data.lacture_vedio,
                                                                    lecture_type: stream,

                                                                }
                                                                this.setState({
                                                                    addLactureModal: true,
                                                                    update_settings: true,
                                                                    addLactureLoader: false,
                                                                    update_edit_data: datas,
                                                                    vedioUrl: data.lacture_vedio,
                                                                    streamLacture: stream,
                                                                })
                                                            }}
                                                        >
                                                            <small> <i class="fas fa-money-check-edit"></i></small>
                                                        </button>
                                                        <button className="btn btn-outline-light btn-sm d-flex"
                                                            onClick={() => {
                                                                this.setState({
                                                                    delete_confirm: true,
                                                                    deleting_id: data._id
                                                                })
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
                            onClick={() => {
                                let datas = {
                                    id: "",
                                    lacture_title: "",
                                    lacture_des: "",
                                    lacture_time: "",
                                    lacture_vedio: "",
                                    lecture_type: "",
                                }
                                this.setState({
                                    addLactureModal: true,
                                    addLactureLoader: false,
                                    streamLacture: false,
                                    update_settings: false,
                                    addLactureLoader: false,
                                    update_edit_data: datas,
                                    vedioUrl: "",
                                    streamLacture: false,
                                })
                            }}
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
                    scrollable
                    onHide={() => this.setState({ addLactureModal: false })}
                    // dialogClassName="modal-90w"
                    aria-labelledby="example-custom-modal-styling-title"
                >
                    <Modal.Header>
                        <h4 className='mb-0'>{this.state.update_settings ? "Update" : "Add"} Lacture</h4>
                    </Modal.Header>
                    <Modal.Body>
                        <Formik
                            initialValues={{
                                course_id: this.props.course_id,
                                section_id: this.props.section_id,
                                lacture_title: this.state.update_edit_data.lacture_title,
                                lacture_des: this.state.update_edit_data.lacture_des,
                                lacture_vedio: this.state.update_edit_data.lacture_vedio,
                                stream_time: this.state.update_edit_data.lacture_time,
                                lacture_type: this.state.update_edit_data.lecture_type
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

                                data.append('lacture_time', values.stream_time)
                                data.append('lecture_id', this.state.update_edit_data.id)
                                if (values.lacture_type == true) {
                                    data.append('lacture_type', "Stream")
                                } else {
                                    data.append('lacture_type', "Vedio")
                                }
                                if (typeof values.lacture_vedio != 'string') {
                                    data.append('lacture_vedio', values.lacture_vedio)
                                }

                                if (this.state.update_settings) {
                                    CourseApi.updateCourseLecture(data).then(res => {
                                        console.log(res.data)
                                        if (res.data.Error == false) {
                                            let all_lactures = this.state.lactures;
                                            let update_index = all_lactures.findIndex(data => data._id == res.data.data._id)
                                            all_lactures[update_index] = res.data.data
                                            this.setState({
                                                lactures: all_lactures,
                                                addLactureModal: false,
                                            })
                                        }
                                    }).catch(error => {
                                        console.log(error.response)
                                    })
                                } else {

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
                                }


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
                                    {/* {JSON.stringify(this.state.update_edit_data,null,2)} */}
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
                                            }}>
                                                <div><i class="fal fa-video-plus me-1"></i></div>
                                                <div>Upload Lecture video.</div>
                                            </div>
                                            <div className={`d-flex  my-3 cursor-pointer  p-2 ${this.state.streamLacture ? "border" : ""}`}
                                                onClick={() => {
                                                    setFieldValue("lacture_type", true)
                                                    this.setState({
                                                        streamLacture: true
                                                    })
                                                }}
                                            >
                                                <div><i class="fal fa-signal-stream me-1"></i></div>
                                                <div>Live Stream Lecture</div>
                                            </div>
                                        </div>

                                        <input type='file' id="lacture_vedio"
                                            onChange={(e) => {

                                                if (e.target.value) {
                                                    let mb = parseInt((e.currentTarget.files[0].size / (1024 * 1024)).toFixed(2));
                                                    if (mb > 50) {
                                                        this.setState({
                                                            fileError: "File size should less then 50MB",
                                                            vedioUrl: "",
                                                        })
                                                        setFieldValue("lacture_vedio", '')
                                                    } else {
                                                        if (e.currentTarget.files[0].type.split('/')[0] == "video") {
                                                            const file = e.currentTarget.files[0];
                                                            let reader = new FileReader();
                                                            this.readVideo(e);
                                                            reader.onloadend = () => {
                                                                setFieldValue("lacture_vedio", file)
                                                                this.setState({
                                                                    fileError: "File selected.",
                                                                });
                                                            };
                                                            reader.readAsDataURL(file);
                                                        } else {
                                                            // setFieldValue("thumbnail", '')
                                                            setFieldValue("lacture_vedio", '')
                                                            this.setState({
                                                                vedioUrl: "",
                                                                fileError: "File format does not supported.Upload file in MP4 format."
                                                            })
                                                        }
                                                    }

                                                } else {
                                                    // setFieldValue("thumbnail", '')
                                                    setFieldValue("lacture_vedio", '')
                                                    this.setState({
                                                        vedioUrl: "",
                                                    })
                                                }


                                            }}
                                            className='d-none' />
                                        {!this.state.streamLacture && this.state.vedioUrl && (
                                            <p className='cursor-pointer document_link'
                                                onClick={() => { document.getElementById("lacture_vedio").click() }}
                                            >Update video</p>
                                        )}

                                        {/* <small className='my-3 text-danger '><b>{this.state.ApiError}</b></small> */}

                                        {!this.state.streamLacture && this.state.vedioUrl && (
                                            <div className="p-0 mt-3 mb-3 card-body d-block">
                                                <div className='row'>
                                                    <div className='col-12'>
                                                        <video className='vedioPlayer' controls controlsList="nodownload">
                                                            <source src={this.state.vedioUrl} type="video/mp4" />
                                                            Your browser does not support HTML5 video.
                                                        </video>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {!this.state.vedioUrl && !this.state.streamLacture && (
                                            <div className='mt-2 lecture_veido_upload'
                                                onClick={() => {
                                                    this.setState({
                                                        streamLacture: false
                                                    })
                                                    setFieldValue("lacture_type", false)
                                                    document.getElementById("lacture_vedio").click()
                                                }}
                                            >
                                                <i class="fal fa-video-plus"></i>
                                            </div>
                                        )}
                                        {!this.state.streamLacture && (
                                            <small className={this.state.fileError == "File selected." ? "text-success" : "text-danger"}>{this.state.fileError ? this.state.fileError : ""}</small>
                                        )}
                                        <div>
                                            <small className='mb-2 text-danger'><b><ErrorMessage name="lacture_vedio" /></b></small>
                                        </div>

                                        {this.state.streamLacture && (
                                            <div className="col-12">
                                                <label htmlFor="">Lecture Time</label>
                                                <input type="datetime-local" className='form-control '
                                                    value={values.stream_time}
                                                    min={new Date()}
                                                    onChange={(e) => {
                                                        setFieldValue("stream_time", e.target.value)

                                                    }}
                                                />

                                                <small className='mb-4 text-danger'><b><ErrorMessage name="stream_time" /></b></small>
                                            </div>
                                        )}

                                        <div className="p-0 mt-2 text-left col-sm-12">
                                            <div className="mb-1 form-group">
                                                {this.state.addLactureLoader && (
                                                    <button type="button" className="p-0 text-center text-white border-0 form-control style2-input fw-600 bg-dark ">Loading....</button>
                                                )}
                                                {!this.state.addLactureLoader && (
                                                    <button type='submit' className="p-0 text-center text-white border-0 form-control style2-input fw-600 bg-dark ">{this.state.update_settings ? "Update" : "Save"}</button>
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


                <Modal
                    show={this.state.vedioModal}
                    size='xl'
                    onHide={() => this.setState({ vedioModal: false })}
                    dialogClassName="modal-90w"
                    aria-labelledby="example-custom-modal-styling-title"
                >
                    <Modal.Body>
                        {this.state.vedioLink && (
                            <div className='row'>
                                <div className='col-12'>
                                    <video className='vedioPlayer' controls autoplay>
                                        <source src={`${this.state.vedioLink}`} type="video/mp4" />
                                        Your browser does not support HTML5 video.
                                    </video>
                                </div>
                            </div>
                        )}
                        {!this.state.vedioLink && (
                            <p>No video found.</p>
                        )}
                        {/* ************************************* */}
                    </Modal.Body>
                </Modal>

            </>
        );
    }
}

export default CourseLactures;
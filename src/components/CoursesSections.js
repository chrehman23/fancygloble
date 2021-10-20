import React, { Component } from 'react';

import { Modal } from 'react-bootstrap'

import { Link, withRouter } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import CourseApi from '../api/Courses'



let validationSchema = Yup.object({
    course_id: Yup.string().required('Password is Required.'),
    section_id: Yup.string().required('Password is Required.'),
    lacture_title: Yup.string().required('Title is Required.').min(3, 'Must be greater then 3 characters.'),
    lacture_des: Yup.string().required('Description is Required.').min(6, 'Must be greater then 6 characters.'),
    lacture_vedio: Yup.string().required('Lecture vedio is Required.'),
})
class CoursesSections extends Component {
    constructor() {
        super();
        this.state = {
            addLactureModal: false,
            loadLactures: false,
            lactures: [],

            addLactureLoader: false,
            ApiError: "",
            fileError: "",

            vedioModal: false,
            vedioLink: ""

        }
    }

    componentDidMount() {


    }

    loadLactures = () => {
        let data = {
            course_id: this.props.course_id,
            section_id: this.props.data._id,
        }
        CourseApi.getLactures(data).then(res => {
            console.log('api', res)
            if (res.data.Error == false) {
                this.setState({
                    lactures: res.data.data
                })
            }

        })
    }




    render() {
        return (
            <>
                <div className='row  mt-3 border'>
                    <div className='col-12 bgthwh cursor-pointer'>
                        <div className='d-flex align-items-center justify-content-between p-2'>
                            <div>
                                <i class="fas fa-th-large"></i>  {this.props.data.section_title}
                            </div>
                            <div className=''>
                                {/* <i class="fas fa-lock text-danger"></i> */}
                            </div>
                        </div>
                    </div>

                    <div className="col-12">
                        <p>{this.props.data.section_description}</p>
                    </div>
                    {!this.state.loadLactures && (
                        <div className="col-12 py-3">
                            <small className='cursor-pointer'><b
                                onClick={() => {
                                    this.setState({
                                        loadLactures: true,
                                    })
                                    this.loadLactures()
                                }}
                            >See Details</b></small>
                        </div>
                    )}

                    {this.state.loadLactures && (
                        <div className='col-12'>
                            {this.state.lactures.map((datas, index) => {
                                return (
                                    <>
                                        <div key={index} className='d-flex align-items-center justify-content-between border-bottom mb-2'>
                                            <div>
                                                <h5 className='mb-0 '><b>{datas.lacture_title}</b></h5>
                                                <p>{datas.lacture_des}</p>
                                            </div>
                                            <div className='p-2'>
                                                <i class="fas fa-eye px-2 cursor-pointer"
                                                    onClick={() => {
                                                        this.setState({
                                                            vedioModal: true,
                                                            vedioLink: datas.lacture_vedio
                                                        })
                                                    }}
                                                ></i>
                                                <i class="fas fa-edit px-2"></i>
                                                <i class="fas fa-lock px-2"></i>
                                            </div>
                                        </div>
                                        <div>
                                            {datas.files.map((data, index) => {
                                                return (
                                                    <div className="col-4">
                                                        <div className="d-flex">
                                                            <div><i class="fal fa-file-pdf"></i></div>
                                                            <div>{data.file}</div>
                                                        </div>
                                                    </div>
                                                )
                                            })}

                                        </div>

                                    </>
                                )
                            })}
                        </div>
                    )}
                    <div className="col-12">
                        <div
                            onClick={() => this.setState({
                                addLactureModal: true,
                                addLactureLoader: false,
                                ApiError: "",
                            })}
                            className='d-flex align-items-center justify-content-between bg-greylight cursor-pointer px-2' style={{ margin: '0px -15px', padding: '0px 15px' }}>
                            <div>
                                Add Lacture
                            </div>
                            <div className='p-2'>
                                <i class="far fa-plus p-2 cursor-pointer" ></i>
                            </div>
                        </div>
                    </div>


                </div>


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
                                section_id: this.props.data._id,
                                lacture_title: "",
                                lacture_des: "",
                                lacture_vedio: ""
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
                                        <div className="form-group icon-input mb-0 rounded-circle">
                                            {/* <i className="font-sm ti-email text-grey-500 pe-0"></i> */}
                                            <label htmlFor="">Title</label>
                                            <Field id='lacture_title' name="lacture_title" className="style2-input  form-control text-grey-900 font-xsss fw-600" placeholder="Title" />

                                        </div>
                                        <small className='text-danger'><b><ErrorMessage name="lacture_title" /></b></small>
                                        <div className="form-group icon-input mb-0 mt-3">
                                            <label htmlFor="">Description</label>
                                            {/* <i className="font-sm ti-lock text-grey-500 pe-0"></i> */}
                                            <Field type='text' name="lacture_des" className="style2-input  form-control text-grey-900 font-xsss fw-600" placeholder="Description" />
                                        </div>
                                        <small className='text-danger'><b><ErrorMessage name="lacture_des" /></b></small>
                                        <div className="d-flex  my-3 cursor-pointer" onClick={() => { document.getElementById("lacture_vedio").click() }}>
                                            <div><i class="far fa-video-plus me-2 "></i></div>
                                            <div>{this.state.fileError ? this.state.fileError : "Upload Lacture vedio."}</div>
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
                                                                    fileError: "File slected."
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



                                        {/* <small className='text-danger my-3 '><b>{this.state.ApiError}</b></small> */}
                                        <div className="col-sm-12 p-0 text-left mt-2">
                                            <div className="form-group mb-1">
                                                {this.state.addLactureLoader && (
                                                    <button type="button" className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0 ">Loading....</button>
                                                )}
                                                {!this.state.addLactureLoader && (
                                                    <button type='submit' className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0 ">Save</button>
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

export default CoursesSections;
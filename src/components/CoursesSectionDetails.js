import React, { Component } from 'react';

import { Modal } from 'react-bootstrap'

import { Link, withRouter } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import CourseApi from '../api/Courses'


 
class CoursesSectionDetails extends Component {
    constructor() {
        super();
        this.state = { 
            loadLactures: false,
            lactures: [],

            

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


              

            </>
        );
    }
}

export default CoursesSectionDetails;
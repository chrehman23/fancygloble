import React, { Component } from 'react';

import { Modal } from 'react-bootstrap'

import { Link, withRouter } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import CourseApi from '../api/Courses'

import moment from 'moment'

class CoursesSectionLactures extends Component {
    constructor() {
        super();
        this.state = {
            addLactureModal: false,
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
            <div className='container px-2 bg-white border'>
                <div className='mt-3 row '>
                    <div className='cursor-pointer col-12 '>
                        <div className='p-2 bgthwh d-flex align-items-center justify-content-between'>
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
                        <div className="py-3 col-12">
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
                                    <div className='pb-3 border-bottom'>
                                        <div key={index} className='pt-2 mb-2 d-flex align-items-center justify-content-between'>
                                            <div>
                                                <h5 className='mb-0 '>
                                                    {datas.lacture_vedio == "" && (
                                                        <i class="fas fa-lock px-2"></i>
                                                    )}
                                                    {datas.lacture_vedio !== "" && (
                                                        <i class="fas fa-lock-open px-2"></i>
                                                    )}

                                                    <b>{datas.lacture_title}</b></h5>
                                                {datas.lacture_time && (
                                                    <p className='mb-0'>{datas.lacture_time && `${moment(datas.lacture_time).format('d/MM/yy hh:mm a')}`} (lecture time)
                                                        {datas.stream_token && (
                                                            <>
                                                                {this.props.profile_id !== datas.created_by && (
                                                                    <button className='btn btn-primary btn-sm'
                                                                        onClick={() => {
                                                                            this.props.history.push(`/live-lecture-view/${datas._id}`)
                                                                        }}
                                                                    >See lecture</button>
                                                                )}
                                                            </>
                                                        )}
                                                    </p>
                                                )}
                                                {this.props.profile_id == datas.created_by && (
                                                    <button className='btn btn-primary btn-sm'
                                                        onClick={() => {
                                                            this.props.history.push(`/live-lecture/${datas._id}`)
                                                        }}
                                                    >Start lecture</button>
                                                )}
                                                <p>{datas.lacture_des}</p>
                                            </div>
                                            <div className='p-2'>
                                                {datas.lacture_vedio && (
                                                    <i class="fas fa-eye px-2 cursor-pointer"
                                                        onClick={() => {
                                                            this.setState({
                                                                vedioModal: true,
                                                                vedioLink: datas.lacture_vedio
                                                            })
                                                        }}
                                                    ></i>
                                                )}

                                            </div>
                                        </div>
                                        <div className='row'>
                                            {datas.files_count > 0 && (
                                                <div className="d-flex ">
                                                    <div><i className="px-2 fas fa-file-alt"></i></div>
                                                    <div className='cursor-pointer'>{datas.files_count} Document</div>
                                                </div>
                                            )}
                                            {datas.files.map((data, index) => {
                                                return (
                                                    <div className="col-md-4">
                                                        <a href={data.file} style={{ cursor: 'default' }} target="_blank" >
                                                            <div className="d-flex ">
                                                                <div><i className="px-2 fas fa-file-alt"></i></div>
                                                                <div className='cursor-pointer'>Document</div>

                                                            </div>
                                                        </a>

                                                    </div>
                                                )
                                            })}

                                        </div>

                                    </div>
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




            </div>
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
        // removePosts: (data) => {
        //     dispatch(ACTIONS.removePosts(data))
        // },
        // loadProfile: (data) => {
        //     dispatch(ACTIONS.loadProfile(data))
        // },

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CoursesSectionLactures))
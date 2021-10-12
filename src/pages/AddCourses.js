import React, { Component, Fragment } from "react";
import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Rightchat from '../components/Rightchat';
import Pagetitle from '../components/Pagetitle';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';
import { withRouter } from "react-router";
import ApiLoader from '../components/ApiLoader'
class Courses extends Component {
    constructor() {
        super()
        this.state = {
            TitleEdite: false,
            titleInput: "Course Title",
            desEdite: false,
            desInput: "Course des",
        }
    }
    componentDidMount() {

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
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="card shadow-xss w-100 d-block d-flex border-0 p-4 mb-3">
                                        <h2 className="mb-0 fw-800 mb-0  mt-0 font-md text-grey-900 d-flex justify-content-between align-items-center">
                                            Add New Course
                                        </h2>
                                    </div>
                                    <div>
                                    </div>
                                </div>
                            </div>

                            <div className="card shadow-xss w-100 d-block d-flex border-0 p-4 mb-3">
                                {!this.state.TitleEdite && (
                                    <div className='row'>
                                        <div className='col-12'>


                                            <div className='d-flex align-items-center justify-content-between'>
                                                <div>
                                                    <h6 className='mb-0 fw-800 mb-0  mt-0 font-md text-grey-900 d-flex justify-content-between align-items-center'>
                                                        {this.state.titleInput}
                                                    </h6>
                                                </div>
                                                <div className='p-2'> <i class="fad fa-pencil-alt cursor-pointer"
                                                    onClick={() => this.setState({ TitleEdite: true })}
                                                ></i> </div>
                                            </div>
                                        </div>
                                    </div>

                                )}

                                {this.state.TitleEdite && (
                                    <div className='row'>
                                        <div className='col-12'>
                                            <h6 className='mb-0'>Course Title</h6>
                                            <input type='text'
                                                value={this.state.titleInput}
                                                onChange={(e) => {
                                                    this.setState({
                                                        titleInput: e.target.value
                                                    })
                                                }}
                                                onBlur={() => this.setState({ TitleEdite: false })}
                                                className='form-control' placeholder='Course Title' />
                                        </div>
                                    </div>
                                )}
                                {!this.state.desEdite && (
                                    <div className='row'>
                                        <div className='col-12'>

                                            <div className='d-flex align-items-center justify-content-between'>
                                                <div>
                                                    <p className='mb-0 fw-800 mb-0  mt-0  text-grey-900 '>
                                                        {this.state.desInput}
                                                    </p>
                                                </div>
                                                <div className='p-2'> <i class="fad fa-pencil-alt cursor-pointer"
                                                    onClick={() => this.setState({ desEdite: true })}
                                                ></i> </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {this.state.desEdite && (
                                    <div className='row mt-3'>
                                        <div className='col-12'>
                                            <h6 className='mb-0'>Course Description</h6>
                                            <textarea className='form-control ' row='15'
                                                value={this.state.desInput}
                                                onChange={(e) => {
                                                    this.setState({
                                                        desInput: e.target.value
                                                    })
                                                }}
                                                onBlur={() => this.setState({ desEdite: false })}></textarea>

                                        </div>
                                    </div>
                                )}
                                <div className="row">
                                    <div className="col-6">
                                        <label htmlFor="">What will students learn in your course?*</label>
                                        <textarea className='form-control ' row='15'></textarea>
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="">Requirements*</label>
                                        <textarea className='form-control ' row='15'></textarea>
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="">Course Level*</label>
                                        <select name="" id="" className='form-control'>
                                            <option value="">Select Level</option>
                                            <option value="">Beginner</option>
                                            <option value="">Intermediate</option>
                                            <option value="">Expert</option>
                                        </select>
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="">Audio Language*</label>
                                        <select name="" id="" className='form-control'>
                                            <option value="">Select Language</option>
                                            <option value="">English</option>
                                            <option value="">Urdo</option>
                                        </select>
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="">Course Category*</label>
                                        <select name="" id="" className='form-control'>
                                            <option value="">Select Language</option>
                                            <option value="">Communications</option>
                                            <option value="">Management</option>
                                            <option value="">Sales</option>
                                            <option value="">Operations</option>
                                        </select>
                                        {/* ******************** */}
                                        <label htmlFor="">Regular Price*</label>
                                        <input type='text' className='form-control' placeholder='$0' />
                                        <label htmlFor="">Discount Price*</label>
                                        <input type='text' className='form-control' placeholder='$0' />
                                        {/* ******************** */}
                                    </div>
                                    
                                    <div className="col-6">
                                        <label htmlFor="">Intro Course overview</label>
                                        <div className="courseUploadVedio">
                                            <div className='text-center'>
                                                <button className='btn btn-danger'>Upload Video</button>
                                                <p className='mb-0 pb-0'>File Format:.mp4</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="">Intro Course overview</label>
                                        <div className="courseUploadVedio">
                                            <div className='text-center'>
                                                <button className='btn btn-danger'>Upload thumbnail</button>
                                                <p className='mb-0 pb-0'>File Format: jpg,jpeg, or png</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='row  mt-3'>
                                    <div className='col-12 border-bottom'>
                                        <h4 className=' mt-3'><i class="fas fa-list"></i> Course Content</h4>
                                    </div>
                                </div>
                                <div className='row  mt-3 border'>
                                    <div className='col-12 bg-greylight cursor-pointer'>
                                        <div className='d-flex align-items-center justify-content-between p-2'>
                                            <div>
                                                <i class="fas fa-th-large"></i>  Basic section
                                            </div>
                                            <div className=''>
                                                {/* <i class="fas fa-lock text-danger"></i> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12'>
                                        <div className='d-flex align-items-center justify-content-between'>
                                            <div>
                                                <p><i class="fas fa-video"></i> lacture tile for the sutdent</p>
                                            </div>
                                            <div className='p-2'>
                                                <i class="fas fa-edit px-2"></i>
                                                <i class="fas fa-lock px-2"></i>
                                            </div>
                                        </div>
                                        <div className='d-flex align-items-center justify-content-between'>
                                            <div>
                                                <p><i class="fas fa-video"></i> lacture tile for the sutdent</p>
                                            </div>
                                            <div className='p-2'>
                                                <i class="fas fa-edit px-2"></i>
                                                <i class="fas fa-lock px-2"></i>
                                            </div>
                                        </div>
                                        <div className='d-flex align-items-center justify-content-between'>
                                            <div>
                                                <p><i class="fas fa-video"></i> lacture tile for the sutdent</p>
                                            </div>
                                            <div className='p-2'>
                                                <i class="fas fa-edit px-2"></i>
                                                <i class="fas fa-lock px-2"></i>
                                            </div>
                                        </div>
                                        <div className='d-flex align-items-center justify-content-between'>
                                            <div>
                                                <p><i class="fas fa-video"></i> lacture tile for the sutdent</p>
                                            </div>
                                            <div className='p-2'>
                                                <i class="fas fa-edit px-2"></i>
                                                <i class="fas fa-lock px-2"></i>
                                            </div>
                                        </div>
                                        <div className='d-flex align-items-center justify-content-between bg-lightgreen cursor-pointer px-2' style={{ margin: '0px -15px', padding: '0px 15px' }}>
                                            <div>
                                                Add Lacture
                                            </div>
                                            <div className='p-2'>
                                                <i class="far fa-plus p-2 cursor-pointer" onClick={() => this.setState({ TitleEdite: true })}></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='row  mt-3'>
                                    <div className='col-12 bg-greylight cursor-pointer'>
                                        <div className='d-flex align-items-center justify-content-between'>
                                            <div>
                                                backend section
                                            </div>
                                            <div className='p-2'>
                                                <i class="fas fa-lock text-danger"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='row  mt-3'>
                                    <div className='col-12 bg-greylight cursor-pointer'>
                                        <div className='d-flex align-items-center justify-content-between'>
                                            <div>
                                                advance  section
                                            </div>
                                            <div className='p-2'>
                                                <i class="fas fa-lock text-danger"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>



                                <div className='row  mt-3'>
                                    <div className='col-12 bg-lightgreen cursor-pointer'>
                                        <div className='d-flex align-items-center justify-content-between'>
                                            <div>
                                                Add Section
                                            </div>
                                            <div className='p-2'>
                                                <i class="far fa-plus p-2 cursor-pointer" onClick={() => this.setState({ TitleEdite: true })}></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>


                            {/* ************************************8 */}



                        </div>

                    </div>
                </div>

                {/* ******************************** */}

                <div className='CuruseSavingCotiner'>
                    <div className='d-flex align-items-center justify-content-between'>
                        <div className='px-3 py-2'> <ApiLoader /> </div>
                        <div>
                            <b className=' text-grey-900   '>
                                Saving Details
                            </b>
                        </div>

                    </div>
                </div>

                <Popupchat />
                <Appfooter />
            </Fragment>
        );
    }
}

export default withRouter(Courses);
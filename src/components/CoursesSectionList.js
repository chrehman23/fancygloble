import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import CourseApi from '../api/Courses';

class CoursesSectionList extends Component {
    constructor() {
        super();
        this.state = {
            sections: [],
            addSection: false,

            section_title: "",
            section_description: ""
        }
    }

    componentDidMount() {
        let data = {
            course_id: this.props.course_id
        }
        CourseApi.courseSections(data).then(res => {
            if (res.data.Error == false) {
                this.setState({
                    sections: res.data.data
                })
            }
        })
    }

    addCourseSection = () => {
        let data = {
            course_id: this.props.course_id,
            section_title: this.state.section_title,
            section_description: this.state.section_description

        }
        CourseApi.addCourseSection(data).then(res => {
            if (res.data.Error == false) {
                this.setState({
                    sections: [...this.state.sections, res.data.data],
                })
                
            }
            this.setState({
                addSection: false,
                section_title: "",
                section_description: ""
            })
        }).catch(error=>{
            this.setState({
                addSection: false,
                section_title: "",
                section_description: ""
            })
        })
    }


    render() {
        return (
            <  >
                <div className='row  mt-3'>
                    <div className='col-12 border-bottom'>
                        <h4 className=' mt-3'><i class="fas fa-list"></i> Course Content</h4>
                    </div>
                </div>
                {this.state.sections.map((data, index) => {
                    return (
                        <>
                            <div className='row  mt-3 border'>
                                <div className='col-12 bg-greylight cursor-pointer'>
                                    <div className='d-flex align-items-center justify-content-between p-2'>
                                        <div>
                                            <i class="fas fa-th-large"></i>  {data.section_title}
                                        </div>
                                        <div className=''>
                                            {/* <i class="fas fa-lock text-danger"></i> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <p>{data.section_description}</p>
                                </div>
                                <div className='col-12'>
                                    <div className='d-flex align-items-center justify-content-between d-none'>
                                        <div>
                                            <p><i class="fas fa-video"></i> lacture tile for the sutdent</p>
                                        </div>
                                        <div className='p-2'>
                                            <i class="fas fa-edit px-2"></i>
                                            <i class="fas fa-lock px-2"></i>
                                        </div>
                                    </div>
                                   
                                    <div className='d-flex align-items-center justify-content-between bgthwh cursor-pointer px-2' style={{ margin: '0px -15px', padding: '0px 15px' }}>
                                        <div>
                                            Add Lacture
                                        </div>
                                        <div className='p-2'>
                                            <i class="far fa-plus p-2 cursor-pointer" onClick={() => this.setState({ TitleEdite: true })}></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })}







             

                <div className='row  mt-3 border-top py-2'>
                    {this.state.addSection && (
                        <div className='col-12'>
                            <div className='mb-2' >
                                <label htmlFor="">Section tile</label>
                                <input type="text" className='form-control' placeholder='Section Title'
                                    value={this.state.section_title}
                                    onChange={(e) => {
                                        this.setState({ section_title: e.target.value })
                                    }}
                                />
                            </div>
                            <div className='mb-2' >
                                <label htmlFor="">Section Description</label>
                                <textarea className='form-control ' placeholder='Section Description' row='15'
                                    value={this.state.section_description}
                                    onChange={(e) => {
                                        this.setState({ section_description: e.target.value })
                                    }}
                                // value={this.state.requirements}
                                // onChange={(e) => {
                                //     this.setState({
                                //         requirements: e.target.value
                                //     })
                                // }}
                                // onBlur={() => {
                                //     let data = new FormData();
                                //     data.append('requirements', this.state.requirements)
                                //     this.updateCourse(data)
                                // }}
                                ></textarea>
                            </div>
                            <div className="d-flex justify-content-end">
                                <button className='btn btn-primary me-2'
                                    onClick={() => this.setState({
                                        addSection: false,
                                        section_title: "",
                                        section_description: ""
                                    })}
                                >Cancel</button>
                                <button className='btn btn-primary'
                                onClick={()=>{
                                    this.addCourseSection()
                                }}
                                >Add Section</button>
                            </div>
                        </div>
                    )}


                    {!this.state.addSection && (
                        <div className='col-12 bgthwh cursor-pointer'>
                            <div className='d-flex align-items-center justify-content-between'
                                onClick={() => this.setState({ addSection: true })}
                            >
                                <div>
                                    Add Section
                                </div>
                                <div className='p-2'>
                                    <i class="far fa-plus p-2 cursor-pointer" onClick={() => this.setState({ TitleEdite: true })}></i>
                                </div>
                            </div>
                        </div>
                    )}


                </div>
            </>
        );
    }
}

export default CoursesSectionList;
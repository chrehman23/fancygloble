import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import CourseApi from '../api/Courses';
import Course_comment_reply from '../components/Course_comment_reply';
import moment from 'moment';
import Load from './ApiLoader';
class Course_comments extends Component {
    constructor() {
        super();
        this.state = {
            comments: [],
            commentinput: "",
            apiLoader:false,
        }
    }

    componentDidMount() {
        let data = {
            course_id: this.props.course_id
        }
        this.setState({
            apiLoader:true
        })
        CourseApi.courseComments(data).then(res => {
            if (res.data.Error == false) {
                this.setState({
                    comments: res.data.data,
                    apiLoader: false,
                })
            }
        })
    }

    commentOnCourse = () => {
        let data = {
            course_id: this.props.course_id,
            content: this.state.commentinput,
            created_at: new Date(),
        }
        this.setState({
            apiLoader: true
        })
        CourseApi.addCourseComment(data).then(res => {
            if (res.data.Error == false) {
                this.setState({
                    apiLoader: false,
                    comments: [...this.state.comments, res.data.data]
                })
            }
        })
    }



    render() {
        return (
            <  >
                <div className='row '>
                    <div className='col-12 border-bottom'>
                        <h4 className='mt-3 '><i class="fas fa-list"></i> Students Comments</h4>
                    </div>
                </div>
                <div className="row">
                    {this.state.comments.map((value, index) => {
                        return (
                            <div className='col-12'>
                                <Course_comment_reply comment={value} index={index} />
                            </div>
                        )

                    })}
                </div>
                {this.state.apiLoader && (
                    <div className="row">
                        <div className="col-12">
                            <div className="py-3 d-flex justify-content-center">
                                <Load />
                            </div>
                        </div>
                    </div>
                )}
                
                <div className="mt-5 row">
                    <div className='mt-2 d-flex border-bottom'>
                        <div className='py-2 pr-2 flex-grow-1'>
                            <input type="text"
                                value={this.state.commentinput}
                                onChange={(e) => {
                                    this.setState({ commentinput: e.target.value })
                                }}
                                placeholder='Write comment.....'
                                className='pr-2 commentInput text-grey-500 fw-500 font-xssss lh-4' />
                        </div>
                        <div>
                            {this.state.commentinput && (
                                <button className='btn btn-secondary'
                                    onClick={() => {
                                        this.commentOnCourse()
                                        this.setState({
                                            commentinput: ""
                                        })
                                    }}
                                >Comment</button>
                            )}

                        </div>
                    </div>
                </div>


            </>
        );
    }
}

export default withRouter(Course_comments);
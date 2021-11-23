import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import CourseApi from '../api/Courses';


import Load from './ApiLoader';

class Course_comment_reply extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comment: {},
            replys: [],
            apiLoader: false,
            loaded: false,
            commentinput: "",
            reply: false
        }
    }
    componentDidMount() {
        this.setState({
            comment: this.props.comment
        })
    }

    commentsReply = () => {
        let data = {
            course_id: this.props.comment.course_id,
            comment_id: this.props.comment._id,
        }
        this.setState({
            apiLoader: true
        })
        CourseApi.courseCommentsReply(data).then(res => {
            console.log(res)
            if (res.data.Error == false) {
                this.setState({
                    replys: res.data.data
                })
            }
            this.setState({
                apiLoader: false,
                loaded: true
            })
        }).catch(error => {
            console.log(error)
        })
    }

    replyOnCourse = () => {
        let data = {
            course_id: this.props.comment.course_id,
            comment_id: this.state.comment._id,
            content: this.state.commentinput,
            created_at: new Date(),
        }
        this.setState({
            apiLoader: true
        })
        CourseApi.addCourseCommentReply(data).then(res => {
            if (res.data.Error == false) {
                this.setState({
                    apiLoader: false,
                    replys: [...this.state.replys, res.data.data]
                })
            }
        })
    }



    render() {
        return (
            <div className="wrap cursor-pointer border-bottom " index={this.props.index}>
                <div className="card-body d-flex flex-column pt-0 ps-4 pe-4 pb-0 bor-0">
                    <div className='d-flex'
                        onClick={() => {
                            this.props.history.push(`/user/${this.state.comment && this.state.comment.comment_by.user_name}`)
                        }}
                    >
                        <figure className="avatar smImageControlerRs me-3"><img src={this.state.comment && this.state.comment.comment_by && this.state.comment.comment_by.profile_photo} alt="avater" className="shadow-sm rounded-circle w45" /></figure>
                        {/* <h4 className="fw-700 text-grey-900 font-xssss mt-1">{this.state.comment && this.state.comment.user_id.name} <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">{this.state.comment && this.state.comment.friend} mutual friends</span></h4> */}
                        <h4 className="fw-700 text-grey-900 font-xssss mt-1">{this.state.comment && this.state.comment.comment_by && this.state.comment && this.state.comment.comment_by.name} <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">{this.state.comment && this.state.comment.comment_by && this.state.comment && this.state.comment.comment_by.user_name}</span></h4>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <small className="fw-700 text-grey-900 font-xssss mt-1"> {this.state.comment && this.state.comment.content}
                            <span
                            className='mx-2 navLink'
                                onClick={() => this.setState({ reply: true })}
                            >{!this.state.reply ? "Reply" : ""}</span>
                        </small>
                    </div>
                </div>
                {this.state.comment && this.state.comment.reply_count > 0 && !this.state.loaded && !this.state.apiLoader &&(
                    <div className="row">
                        <div className="col-12">
                            <div className='d-flex py-2'>
                                <div><i class="fas fa-sort-down navLink"></i><small
                                    className=' navLink'
                                    onClick={() => {
                                        this.commentsReply()
                                    }}
                                > Load Replies</small></div>
                            </div>
                        </div>
                    </div>
                )}
                {this.state.loaded && this.state.replys.length == 0 && (
                    <div className="row">
                        <div className="col-12 text-center">
                            <small className='text-grey-500'>No Reply found.</small>
                        </div>
                    </div>
                )}
                {this.state.replys && this.state.replys.length > 0 && (
                    <div className="row">
                        <div className="col-2"></div>
                        <div className="col-10 py-2 border rounded">
                            {this.state.replys.map((data, index) => {
                                return (
                                    <div className="card-body d-flex flex-column pt-0 ps-4 pe-4 pb-0 bor-0">
                                        <div className='d-flex py-1'
                                            onClick={() => {
                                                this.props.history.push(`/user/${data.reply_by && data.reply_by.user_name}`)
                                            }}
                                        >
                                            <figure className="avatar smImageControlerRs me-3"><img src={data.reply_by && data.reply_by.profile_photo} alt="avater" className="shadow-sm rounded-circle w45" /></figure>
                                            {/* <h4 className="fw-700 text-grey-900 font-xssss mt-1">{this.state.comment && this.state.comment.user_id.name} <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">{this.state.comment && this.state.comment.friend} mutual friends</span></h4> */}
                                            <h4 className="fw-700 text-grey-900 font-xssss mt-1">{data.reply_by && data.reply_by.name} <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">{data.reply_by && data.reply_by.user_name}</span></h4>
                                        </div>
                                        <div className='d-flex justify-content-between'>
                                            <small className="fw-700 text-grey-900 font-xssss mt-1"> {data.content}</small>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}
                {this.state.apiLoader && (
                    <div className="row">
                        <div className="col-2"></div>
                        <div className="col-12">
                            <div className="d-flex justify-content-center py-3">
                                <Load />
                            </div>
                        </div>
                    </div>
                )}

                {this.state.reply && (
                    <div className="row my-2">
                        <div className="col-2"></div>
                        <div className="col-10">
                            <div className='d-flex border-bottom mt-2'>
                                <div className='flex-grow-1 pr-2 py-2'>
                                    <input type="text"
                                        value={this.state.commentinput}
                                        onChange={(e) => {
                                            this.setState({ commentinput: e.target.value })
                                        }}
                                        placeholder='Write comment.....'
                                        className='commentInput text-grey-500 fw-500 font-xssss lh-4 pr-2' />
                                </div>
                                <div>
                                    {this.state.commentinput && (
                                        <button className='btn btn-secondary'
                                            onClick={() => {
                                                this.replyOnCourse()
                                                this.setState({
                                                    commentinput: ""
                                                })
                                            }}
                                        >Comment</button>
                                    )}

                                </div>
                            </div>
                        </div>

                    </div>
                )}





            </div>
        );
    }
}

export default withRouter(Course_comment_reply);
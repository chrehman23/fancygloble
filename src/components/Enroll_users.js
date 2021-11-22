import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import CourseApi from '../api/Courses';
import moment from 'moment';
class Enroll_users extends Component {
    constructor() {
        super();
        this.state = {
            students: [],
        }
    }

    componentDidMount() {
        let data = {
            course_id: this.props.course_id
        }
        CourseApi.lecture_enroll(data).then(res => {
            if (res.data.Error == false) {
                this.setState({
                    students: res.data.data
                })
            }
        })
    }



    render() {
        return (
            <  >
                <div className='row  mt-3'>
                    <div className='col-12 border-bottom'>
                        <h4 className=' mt-3'><i class="fas fa-list"></i> Enrole Students</h4>
                    </div>
                </div>
                <div className="row">
                    {this.state.students.map((value, index) => {
                        return (
                            <div className='col-12'>
                                <div className="wrap cursor-pointer border-bottom " key={index}
                                    onClick={() => {
                                        this.props.history.push(`/user/${value.user_id.user_name}`)
                                    }}
                                >
                                    {/* {JSON.stringify(value,null,2)} */}
                                    <div className="card-body d-flex flex-column pt-0 ps-4 pe-4 pb-0 bor-0">
                                        <div className='d-flex'>
                                            <figure className="avatar smImageControlerRs me-3"><img src={value.user_id && value.user_id.profile_photo} alt="avater" className="shadow-sm rounded-circle w45" /></figure>
                                            {/* <h4 className="fw-700 text-grey-900 font-xssss mt-1">{value.user_id.name} <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">{value.friend} mutual friends</span></h4> */}
                                            <h4 className="fw-700 text-grey-900 font-xssss mt-1">{value.user_id && value.user_id.name} <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">{value.user_id && value.user_id.user_name}</span></h4>
                                        </div>
                                        <div className='d-flex justify-content-between'>
                                            <small className="fw-700 text-grey-900 font-xssss mt-1">Enroll at :{moment(value.created_at).format("d-M-yy hh:mm a")}</small>
                                            <small className="fw-700 text-grey-900 font-xssss mt-1">Paid amount :${value.amount}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        )

                    })}
                </div>




            </>
        );
    }
}

export default withRouter(Enroll_users);
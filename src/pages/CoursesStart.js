import React, { Component, Fragment } from "react";
import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Rightchat from '../components/Rightchat';
import Pagetitle from '../components/Pagetitle';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import ApiLoader from '../components/ApiLoader'

import CourseApi from '../api/Courses'

import CoursesSectionDetail from "../components/CoursesSectionDetail";
import StripeCheckout from 'react-stripe-checkout';
import CourseLactures from "../components/CourseLactures";

class CoursesDetail extends Component {
    constructor() {
        super()
        this.state = {
            acttiveLacture: "",
            loadingCourse: true,
            lacture_title: "",
            lacture_des: "",
            course_id: "",

            learning_points: "",
            requirements: "",
            course_level: "",
            audio_language: "",
            course_category: "",

            sections: [],


            sel_lacture: "",
            sel_dec: "",
            files: [],
            changeLacture:false,
        }

    }
    componentDidMount() {
        let Course_id = this.props.match.params.id
        if (Course_id) {
            let data = {
                course_id: Course_id
            }
            CourseApi.courseDetails(data).then(res => {
                console.log(res)
                if (res.data.Error == false) {
                    this.setState({
                        acttiveLacture: res.data.data.video_url,
                        loadingCourse: false,
                        course_id: res.data.data._id,


                        learning_points: res.data.data.learning_points,
                        requirements: res.data.data.requirements,
                        course_level: res.data.data.course_level,
                        audio_language: res.data.data.audio_language,
                        course_category: res.data.data.course_category,

                        lacture_title: res.data.data.title,
                        lacture_des: res.data.data.description,
                    })
                    CourseApi.courseSections(data).then(res => {
                        if (res.data.Error == false) {
                            this.setState({
                                sections: res.data.data
                            })
                        }
                    })
                }
            }).catch(error => {
                console.log(error)
            })
        }
    }
    updateLactures = (data) => {
        if(data){
            this.setState({
                changeLacture: true
            }, () => {
                this.setState({
                    sel_lacture_title: data.lacture_title,
                    sel_dec: data.lacture_des,
                    files: data.files,
                    acttiveLacture: data.lacture_vedio,
                    changeLacture: false
                })
            })
        }else{
            this.setState({
                changeLacture: true
            }, () => {
                this.setState({
                    sel_lacture_title:'',
                    sel_dec: '',
                    files: [],
                    acttiveLacture: this.state.acttiveLacture,
                    changeLacture: false
                })
            })
        }
      
        
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
                                <div className="col-md-8 px-0">
                                    <div style={{minHeight:'200px'}}>
                                        {!this.state.changeLacture && this.state.acttiveLacture && (
                                            <video className='vedioPlayer' controls>
                                                <source src={this.state.acttiveLacture} type="video/mp4" />
                                                Your browser does not support HTML5 video.
                                            </video>
                                        )}
                                    </div> 
                                    <div className="row border-bottom">
                                        <div className="col-12">
                                            <h4 className='fw-700 lh-3 font-xss mb-0'>{this.state.sel_lacture_title}</h4>
                                            <p className='class="fw-500  lh-26 font-xssss w-100 mb-2"'>{this.state.sel_dec}</p>
                                          <div className="row">
                                                {this.state.files.map((data, index) => {
                                                    return (
                                                        <div className="col-md-4" index={index}>
                                                            <a href={data.file} style={{ cursor: 'default' }} target="_blank" >
                                                                <div className="d-flex ">
                                                                    <div><i className="fas fa-file-alt px-2"></i></div>
                                                                    <div className='cursor-pointer'>{index+1}Document</div>

                                                                </div>
                                                            </a>

                                                        </div>
                                                    )
                                                })}
                                          </div>
                                        </div>
                                    </div>
                                    {!this.state.acttiveLacture && ' Loading....'}
                                    <div className="row mt-5 pt-3border-top">
                                        <div className="col-6">
                                            <label htmlFor="">What will students learn in your course?</label>
                                            <p> {this.state.learning_points}</p>
                                        </div>
                                        <div className="col-6">
                                            <label htmlFor="">Requirements</label>
                                            <p> {this.state.requirements}</p>
                                        </div>
                                        <div className="col-6">
                                            <label htmlFor="">Course Level</label>
                                            <p>{this.state.course_level}</p>
                                        </div>
                                        <div className="col-6">
                                            <label htmlFor="">Audio Language</label>
                                            <p>{this.state.audio_language}</p>
                                        </div>
                                        <div className="col-6">
                                            <label htmlFor="">Course Category</label>
                                            <p> {this.state.course_category}</p>
                                        </div>
                                    </div>

                                </div>
                                <div className="col-md-4">
                                    <div className='lactures_container'>
                                        <div className="card mb-2"
                                        onClick={()=>{
                                            this.updateLactures()
                                        }}
                                        >
                                            <div className="border">
                                                <div className="card-header bgthwh px-2">{this.state.lacture_title} </div>
                                                <div className="p-2">
                                                    {this.state.lacture_des}
                                                    <div className='link-info cursor-pointer'>Course introduction </div>
                                                </div>
                                            </div>
                                        </div>
                                        {this.state.sections.map((data, index) => {
                                            return (
                                                <div className="card mb-2" key={index}>
                                                    <div className="border">
                                                        <div className="card-header bgthwh px-2">{data.section_title} </div>
                                                        <div className="p-2">
                                                            {data.section_description}
                                                            <CourseLactures
                                                                section_id={data._id}
                                                                updateLactures={this.updateLactures}
                                                                course_id={this.state.course_id}
                                                            />

                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>



                        </div>

                    </div>
                </div>

                {/* ******************************** */}





                <Popupchat />
                <Appfooter />
            </Fragment>
        );
    }
}

export default withRouter(CoursesDetail);
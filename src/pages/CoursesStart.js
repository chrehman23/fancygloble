import React, { Component, Fragment } from "react";
import Header from "../components/Header";
import Leftnav from "../components/Leftnav";
import Rightchat from "../components/Rightchat";
import Pagetitle from "../components/Pagetitle";
import Appfooter from "../components/Appfooter";
import Popupchat from "../components/Popupchat";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import ApiLoader from "../components/ApiLoader";
import { Card, Accordion, Tab, Tabs, Dropdown } from "react-bootstrap";
import CourseApi from "../api/Courses";
import { InputGroup } from "react-bootstrap";
import CoursesSectionDetail from "../components/CoursesSectionDetail";
import StripeCheckout from "react-stripe-checkout";
import CourseLactures from "../components/CourseLactures";
import Load from "../components/ApiLoader";
import Enroll_users from "../components/Enroll_users";
import Course_comments from "../components/Course_comments";
class CoursesDetail extends Component {
  constructor() {
    super();
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
      changeLacture: false,
      activeTab: 'a',
      acttiveLacture_b: "",
      tabs: 1,
      user_details: {},
      user_paid: false,
    };
  }
  updateTabe = (value) => {
    if (value.activeTab == this.state.activeTab) {
      this.setState({ activeTab: null });
    } else {
      this.setState({ activeTab: value.activeTab });
    }
  };
  componentDidMount() {
    let Course_id = this.props.match.params.id;
    if (Course_id) {
      let data = {
        course_id: Course_id,
      };
      CourseApi.courseDetails(data)
        .then((res) => {
          console.log(res);
          if (res.data.Error == false) {
            this.setState({
              acttiveLacture: res.data.data.video_url,
              acttiveLacture_b: res.data.data.video_url,
              loadingCourse: false,
              course_id: res.data.data._id,

              learning_points: res.data.data.learning_points,
              user_paid: res.data.data.user_paid,
              requirements: res.data.data.requirements,
              course_level: res.data.data.course_level,
              audio_language: res.data.data.audio_language,
              course_category: res.data.data.course_category,
              user_details: res.data.data.created_by,

              lacture_title: res.data.data.title,
              lacture_des: res.data.data.description,
              sel_lacture_title: res.data.data.title,
              sel_dec: res.data.data.description,
            });
            CourseApi.courseSections(data).then((res) => {
              if (res.data.Error == false) {
                this.setState({
                  sections: res.data.data,
                });
              }
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  updateLactures = (data) => {
    console.log(data)
    if (data) {
      this.setState(
        {
          changeLacture: true,
        },
        () => {
          this.setState({
            sel_lacture_title: data.lacture_title,
            sel_dec: data.lacture_des,
            files: data.files,
            acttiveLacture: data.lacture_vedio,
            changeLacture: false,
          });
         setTimeout(() => {
           if (data.lacture_vedio == "") {
             this.setState({
               acttiveLacture: "empty"
             })
           }
         }, 2000);
        }
      );
    } else {
      this.setState(
        {
          changeLacture: true,
        },
        () => {
          this.setState({
            sel_lacture_title: this.state.lacture_title,
            sel_dec: this.state.lacture_des,
            files: [],
            acttiveLacture: this.state.acttiveLacture_b,
            changeLacture: false,
          });
        }
      );
    }
  };

  render() {
    let { activeTab } = this.state;
    return (
      <Fragment>
        <Header />
        <Leftnav />
        <Rightchat />

        <div className="main-content right-chat-active">
          <div className="middle-sidebar-bottom course_details_bg">
            <div className="middle-sidebar-left ">
              <div className="row">
                <div className="p-0 col-md-8">
                  <div className="video-lecture">
                    <div style={{ minHeight: '300px' }}>
                      {!this.state.changeLacture && this.state.acttiveLacture && this.state.acttiveLacture !== "empty" && (
                        <video className='vedioPlayer' controls controlsList="nodownload">
                          <source src={this.state.acttiveLacture} type="video/mp4" />
                          Your browser does not support HTML5 video.
                        </video>
                      )}
                      {!this.state.acttiveLacture && (
                        <div style={{ minHeight: '300px' }} className='d-flex h-100 justify-content-lg-center align-items-center'
                        ><Load /></div>
                      )}
                      {this.state.acttiveLacture == "empty" && (
                        <div style={{ minHeight: '300px' }} className='d-flex h-100 justify-content-lg-center align-items-center'
                        >You can access stream content after instructor goes to live.</div>
                      )}
                    </div>
                  </div>
                  <div className="course-about-content">
                    <h1>{this.state.sel_lacture_title}</h1>
                    <div className="description-div">
                      <b>Description</b>
                      <p>
                        {this.state.sel_dec}
                      </p>
                      <div className="row">
                        {this.state.files.map((data, index) => {
                          return (
                            <div className="col-md-4" index={index}>
                              <a href={data.file} className='document_link' target="_blank" >
                                <div className="d-flex ">
                                  <div><i class="fad fa-file-pdf me-1"></i></div>
                                  <div className='cursor-pointer'>{index + 1}Document</div>
                                </div>
                              </a>
                            </div>
                          )
                        })}
                      </div>

                    </div>

                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="mb-1 course__tab-2">
                        <ul className="border-0 nav nav-tabs" id="courseTab" role="tablist">
                          <li className="my-2 nav-item"
                            onClick={() => {
                              this.setState({ tabs: 1 })
                            }}
                          >
                            <button className={this.state.tabs == 1 ? "active nav-link" : "nav-link"} type="button">
                              <i className="icon_ribbon_alt"></i> <span>Course Details</span>
                            </button>
                          </li>
                          {this.state.course_id && (
                            <li className="my-2 nav-item"
                              onClick={() => {
                                this.setState({ tabs: 2 })
                              }}
                            >
                              <button className={this.state.tabs == 2 ? "active nav-link" : "nav-link"} type="button">
                                <i className="icon_book_alt"></i> <span>Enrolled </span>
                              </button>
                            </li>
                          )}
                          {this.state.user_paid && this.state.course_id && (
                            <li className="my-2 nav-item"
                              onClick={() => {
                                this.setState({ tabs: 3 })
                              }}
                            >
                              <button className={this.state.tabs == 3 ? "active nav-link" : "nav-link"} type="button">
                                <i className="icon_star_alt"></i> <span>Comments</span>
                              </button>
                            </li>
                          )}

                          <li className="my-2 nav-item"
                            onClick={() => {
                              this.setState({ tabs: 4 })
                            }}
                          >
                            <button className={this.state.tabs == 4 ? "active nav-link" : "nav-link"} type="button">
                              <span>Instructor</span>
                            </button>
                          </li>
                        </ul>
                      </div>
                      {this.state.tabs == 1 && (
                        <>
                          {this.state.course_id && (
                            <div className="p-2 bg-white card">
                              <div class="row course_details_label">
                                <div className="col-md-6">
                                  <label htmlFor="">Course Title</label>
                                  <p> {this.state.lacture_title}</p>
                                </div>
                                <div className="col-md-6">
                                  <label htmlFor="">Course Description</label>
                                  <p> {this.state.lacture_des}</p>
                                </div>
                                <div className="col-md-6">
                                  <label htmlFor="">What will students learn in this course?</label>
                                  <p> {this.state.learning_points}</p>
                                </div>
                                <div className="col-md-6">
                                  <label htmlFor="">Requirements</label>
                                  <p> {this.state.requirements}</p>
                                </div>
                                <div className="col-md-6">
                                  <label htmlFor="">Course Level</label>
                                  <p>{this.state.course_level}</p>
                                </div>
                                <div className="col-md-6">
                                  <label htmlFor="">Audio Language</label>
                                  <p>{this.state.audio_language}</p>
                                </div>
                                <div className="col-md-6">
                                  <label htmlFor="">Course Category</label>
                                  <p> {this.state.course_category}</p>
                                </div>
                                <div className="col-md-6">
                                  <div className="course__member mb-45">
                                    <label htmlFor="">Instructor</label>
                                    <div className=" tutor-course-instructors-wrap tutor-single-course-segment" id="single-course-ratings">
                                      <div className="flex-row course-instructor-detail d-md-flex">
                                        <div className="course__teacher me-2">
                                          <img src={this.state.user_details && this.state.user_details.profile_photo} />
                                        </div>
                                        <div className="mb-4 course__teacher-info me-5">
                                          <h5 className="pb-0">{this.state.user_details && this.state.user_details.name}</h5>
                                          <small>{this.state.user_details && this.state.user_details.username}</small>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                      {this.state.tabs == 2 && (
                        <div class="card bg-white rounded p-2">

                          {this.state.course_id && <Enroll_users course_id={this.state.course_id} />}
                        </div>
                      )}
                      {this.state.tabs == 3 && (
                        <div class="card bg-white rounded p-2">
                          {this.state.course_id && <Course_comments course_id={this.state.Course_id} />}
                        </div>
                      )}
                      {this.state.tabs == 4 && (
                        <div className="p-2 bg-white card">
                          <div className="course__member mb-45">
                            <h4 className="tutor-segment-title tutor-segment-title-700">
                              About the instructor
                            </h4>
                            <div className=" tutor-course-instructors-wrap tutor-single-course-segment" id="single-course-ratings">
                              <div className="flex-row course-instructor-detail d-md-flex">
                                <div className="course__teacher me-2">
                                  <img src={this.state.user_details && this.state.user_details.profile_photo} />
                                </div>
                                <div className="mb-4 course__teacher-info me-5">
                                  <h5 className="pb-0">{this.state.user_details && this.state.user_details.name}</h5>
                                  <small>{this.state.user_details && this.state.user_details.user_name}</small>
                                </div>
                                <div className="mb-4 course__update me-5 d-none">
                                  <h5>Last Update:</h5>
                                  <p>September 28, 2021</p>
                                </div>

                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>



                </div>
                <div className="col-md-4">
                  <div className="accordian-div">
                    <Tabs
                      defaultActiveKey="Services"
                      id="uncontrolled-tab-example"
                      className="border-0 services_tabs"
                    >
                      <Tab eventKey="Services">
                        <Accordion
                          className="privacyContainer"
                          defaultActiveKey="a"
                        >
                          <Card
                            className={`${activeTab == "a" ? "tabActive" : ""
                              }`}
                          >
                            <Accordion.Toggle
                              as={Card.Header}
                              eventKey={'a'}
                              onClick={() => {
                                this.updateTabe({ activeTab: "a" });
                              }}
                            >
                              <div
                                className="custom_head_collapse lectures-dropdown-arrow"

                              >
                                <b>1: Introduction</b>
                                <i class="fas fa-chevron-down"></i>
                              </div>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey={'a'}>
                              <>
                                <div className="adjust_padding border-bottom-dotted">
                                  <div class="card adjust_padding pb-0 mt-0">
                                    <div className="description_collapse lectures-play"
                                      onClick={() => {
                                        this.updateLactures()
                                      }}
                                    >
                                      <div className="video-length">
                                        <div className="d-flex justify-content-between"

                                        >
                                          <div>
                                            <i class="far fa-play-circle"></i>
                                            <span className="ms-2">
                                              1. {this.state.lacture_title}
                                            </span>
                                          </div>
                                          <div>

                                          </div>
                                        </div>
                                        <p className="pb-0 mb-0">
                                          {this.state.lacture_des && this.state.lacture_des.substring(0, 100)}
                                          {this.state.lacture_des && this.state.lacture_des && this.state.lacture_des.length > 100 && "..."}
                                          {/* {this.state.lacture_des} */}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            </Accordion.Collapse>
                          </Card>
                          {this.state.sections.map((data, index) => {
                            return (
                              <Card
                                className={`${activeTab == index ? "tabActive" : ""
                                  }`}
                              >
                                <Accordion.Toggle
                                  as={Card.Header}
                                  eventKey={`${index}`}
                                  onClick={() => {
                                    this.updateTabe({ activeTab: index });
                                  }}
                                >
                                  <div
                                    className="custom_head_collapse lectures-dropdown-arrow"

                                  >
                                    <b>{index + 2}: {data.section_title}</b>
                                    <i class="fas fa-chevron-down"></i>
                                  </div>
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey={`${index}`}>
                                  <>
                                    {this.state.activeTab == (index) && (
                                      <CourseLactures
                                        section_id={data._id}
                                        updateLactures={this.updateLactures}
                                        course_id={this.state.course_id}
                                      />
                                    )}


                                  </>
                                </Accordion.Collapse>
                              </Card>
                            );
                          })}
                        </Accordion>
                      </Tab>
                      {/* <Tab eventKey="Package & Offers" title="Package & Offers" className="add_border">
                                        
                                    </Tab>
                                    <Tab eventKey="Price Table" title="Price Table">
                                        
                                    </Tab> */}
                    </Tabs>
                  </div>
                </div>
              </div>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
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

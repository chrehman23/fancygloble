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
      activeTab: null,
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
              loadingCourse: false,
              course_id: res.data.data._id,

              learning_points: res.data.data.learning_points,
              requirements: res.data.data.requirements,
              course_level: res.data.data.course_level,
              audio_language: res.data.data.audio_language,
              course_category: res.data.data.course_category,

              lacture_title: res.data.data.title,
              lacture_des: res.data.data.description,
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
        }
      );
    } else {
      this.setState(
        {
          changeLacture: true,
        },
        () => {
          this.setState({
            sel_lacture_title: "",
            sel_dec: "",
            files: [],
            acttiveLacture: this.state.acttiveLacture,
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
          <div className="middle-sidebar-bottom">
            <div className="middle-sidebar-left ">
              <div className="row">
                <div className="col-md-8 p-0">
                  <div className="video-lecture">
                    <iframe
                      width="100%"
                      height="354"
                      className="rounded"
                      src="https://www.youtube.com/embed/jtn-hRJjl68"
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></iframe>
                  </div>
                  <div className="course-about-content">
                    <h1>About this course</h1>
                    <p>
                      Learn how to authenticate user and deploy MERN stack
                      application on Heroku
                    </p>
                  </div>
                  <div className="features-div">
                    <b>Features:</b>
                    <p>
                      Availble on{" "}
                      <span className="ios-andriod-color"> iOS </span> and{" "}
                      <span className="ios-andriod-color">Andriod</span>
                    </p>
                  </div>
                  <div className="description-div">
                    <b>Description</b>
                    <p>
                      In this course we will learn how to authenticate (register
                      / login) user and deploy our MERN stack app on Heroku. We
                      will also learn how to secure our password before storing
                      into database. This is not an intro to MERN stack course
                      so you should know the basics of MERN stack.
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="accordian-div">
                    <Tabs
                      defaultActiveKey="Services"
                      id="uncontrolled-tab-example"
                      className="services_tabs border-0"
                    >
                      <Tab eventKey="Services">
                        <Accordion
                          className="privacyContainer"
                          defaultActiveKey="0"
                        >
                          {[3, 3, 3, 3].map((data, index) => {
                            return (
                              <Card
                                className={`${
                                  activeTab == index ? "tabActive" : ""
                                }`}
                              >
                                <Accordion.Toggle
                                  as={Card.Header}
                                  eventKey={`1${index}`}
                                >
                                  <div
                                    className="custom_head_collapse lectures-dropdown-arrow"
                                    onClick={() => {
                                      this.updateTabe({ activeTab: index });
                                    }}
                                  >
                                    <b>Section 1: Welcome</b>
                                    <i class="fas fa-chevron-down"></i>
                                  </div>
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey={`1${index}`}>
                                  <>
                                    <div className="adjust_padding border-bottom-dotted">
                                      <div class="card adjust_padding pb-0 mt-0">
                                        <div className="description_collapse lectures-play">
                                          <div className="video-length">
                                            <div className="d-flex justify-content-between">
                                              <div>
                                                <i class="far fa-play-circle"></i>
                                                <span className="ms-2">
                                                  1. Introduction
                                                </span>
                                              </div>
                                              <div>
                                                <div className="video-resources">
                                                  <Dropdown>
                                                    <Dropdown.Toggle
                                                      variant="success"
                                                      className="resources_btn float-end"
                                                      id="dropdown-basic"
                                                    >
                                                      <div className="d-flex ">
                                                        <svg
                                                          xmlns="http://www.w3.org/2000/svg"
                                                          width="16"
                                                          height="16"
                                                          fill="currentColor"
                                                          class="bi bi-folder"
                                                          viewBox="0 0 16 16"
                                                        >
                                                          <path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4H2.19zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z" />
                                                        </svg>
                                                        <span className="px-2">
                                                          Files
                                                        </span>
                                                      </div>
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu className="p-0">
                                                      <Dropdown.Item href="#/action-1">
                                                        {" "}
                                                        Code.zip{" "}
                                                      </Dropdown.Item>
                                                      <Dropdown.Item href="#/action-1">
                                                        {" "}
                                                        Code.zip{" "}
                                                      </Dropdown.Item>
                                                      <Dropdown.Item href="#/action-1">
                                                        {" "}
                                                        Code.zip{" "}
                                                      </Dropdown.Item>
                                                      <Dropdown.Item href="#/action-1">
                                                        {" "}
                                                        Code.zip{" "}
                                                      </Dropdown.Item>
                                                      <Dropdown.Item href="#/action-1">
                                                        {" "}
                                                        Code.zip{" "}
                                                      </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                  </Dropdown>
                                                </div>
                                              </div>
                                            </div>
                                            <p className="pb-0 mb-0">
                                              Learn how to authenticate user and
                                              deploy{" "}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="adjust_padding border-bottom-dotted">
                                      <div class="card adjust_padding pb-0 mt-0">
                                        <div className="description_collapse lectures-play">
                                          <div className="video-length">
                                            <div className="d-flex justify-content-between">
                                              <div>
                                                <i class="far fa-play-circle"></i>
                                                <span className="ms-2">
                                                  1. Introduction
                                                </span>
                                              </div>
                                              <div>
                                                <div className="video-resources">
                                                  <Dropdown>
                                                    <Dropdown.Toggle
                                                      variant="success"
                                                      className="resources_btn float-end"
                                                      id="dropdown-basic"
                                                    >
                                                      <div className="d-flex ">
                                                        <svg
                                                          xmlns="http://www.w3.org/2000/svg"
                                                          width="16"
                                                          height="16"
                                                          fill="currentColor"
                                                          class="bi bi-folder"
                                                          viewBox="0 0 16 16"
                                                        >
                                                          <path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4H2.19zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z" />
                                                        </svg>
                                                        <span className="px-2">
                                                          Files
                                                        </span>
                                                      </div>
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu className="p-0">
                                                      <Dropdown.Item href="#/action-1">
                                                        Code.zip
                                                      </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                  </Dropdown>
                                                </div>
                                              </div>
                                            </div>
                                            <p className="pb-0 mb-0">
                                              Learn how to authenticate user and
                                              deploy{" "}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="adjust_padding border-bottom-dotted">
                                      <div class="card adjust_padding pb-0 mt-0">
                                        <div className="description_collapse lectures-play">
                                          <div className="video-length">
                                            <div className="d-flex justify-content-between">
                                              <div>
                                                <i class="far fa-play-circle"></i>
                                                <span className="ms-2">
                                                  1. Introduction
                                                </span>
                                              </div>
                                              <div>
                                                <div className="video-resources">
                                                  <Dropdown>
                                                    <Dropdown.Toggle
                                                      variant="success"
                                                      className="resources_btn float-end"
                                                      id="dropdown-basic"
                                                    >
                                                      <div className="d-flex ">
                                                        <svg
                                                          xmlns="http://www.w3.org/2000/svg"
                                                          width="16"
                                                          height="16"
                                                          fill="currentColor"
                                                          class="bi bi-folder"
                                                          viewBox="0 0 16 16"
                                                        >
                                                          <path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4H2.19zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z" />
                                                        </svg>
                                                        <span className="px-2">
                                                          Files
                                                        </span>
                                                      </div>
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu className="p-0">
                                                      <Dropdown.Item href="#/action-1">
                                                        Code.zip
                                                      </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                  </Dropdown>
                                                </div>
                                              </div>
                                            </div>
                                            <p className="pb-0 mb-0">
                                              Learn how to authenticate user and
                                              deploy{" "}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="adjust_padding border-bottom-dotted">
                                      <div class="card adjust_padding pb-0 mt-0">
                                        <div className="description_collapse lectures-play">
                                          <div className="video-length">
                                            <div className="d-flex justify-content-between">
                                              <div>
                                                <i class="far fa-play-circle"></i>
                                                <span className="ms-2">
                                                  1. Introduction
                                                </span>
                                              </div>
                                              <div>
                                                <div className="video-resources">
                                                  <Dropdown>
                                                    <Dropdown.Toggle
                                                      variant="success"
                                                      className="resources_btn float-end"
                                                      id="dropdown-basic"
                                                    >
                                                      <div className="d-flex ">
                                                        <svg
                                                          xmlns="http://www.w3.org/2000/svg"
                                                          width="16"
                                                          height="16"
                                                          fill="currentColor"
                                                          class="bi bi-folder"
                                                          viewBox="0 0 16 16"
                                                        >
                                                          <path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4H2.19zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z" />
                                                        </svg>
                                                        <span className="px-2">
                                                          Files
                                                        </span>
                                                      </div>
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu className="p-0">
                                                      <Dropdown.Item href="#/action-1">
                                                        Code.zip
                                                      </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                  </Dropdown>
                                                </div>
                                              </div>
                                            </div>
                                            <p className="pb-0 mb-0">
                                              Learn how to authenticate user and
                                              deploy{" "}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
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

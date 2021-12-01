import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Accordion, Tab, Tabs, Dropdown } from "react-bootstrap";
import CourseApi from '../api/Courses';
import CoursesSectionLactures from "./CoursesSectionLactures";
import CourseLactures from "./CourseLactures";
class CoursesSectionDetail extends Component {
    constructor() {
        super();
        this.state = {
            sections: [],
            addSection: false,
            activeTab: 'a'
        }
    }

    updateTabe = (value) => {
        if (value.activeTab == this.state.activeTab) {
            this.setState({ activeTab: null });
        } else {
            this.setState({ activeTab: value.activeTab });
        }
    };
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
        }).catch(error => {
            this.setState({
                addSection: false,
                section_title: "",
                section_description: ""
            })
        })
    }

    updateLactures = () => {
        console.log("paid content")
    }


    render() {
        let { activeTab } = this.state;
        return (
            <  >

                {/* {this.state.sections.map((data, index) => <CoursesSectionLactures course_id={this.props.course_id} data={data}/>)} */}
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
                                                                        1. {this.props.lacture_title}
                                                                    </span>
                                                                </div>
                                                                <div>

                                                                </div>
                                                            </div>
                                                            <p className="pb-0 mb-0">
                                                                {this.props.lacture_des && this.props.lacture_des.substring(0, 100)}
                                                                {this.props.lacture_des && this.props.lacture_des && this.props.lacture_des.length > 100 && "..."}
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
                                                            details_page={true}
                                                            section_id={data._id}
                                                            updateLactures={this.updateLactures}
                                                            course_id={this.props.course_id}
                                                        />
                                                    )}


                                                </>
                                            </Accordion.Collapse>
                                        </Card>
                                    );
                                })}
                            </Accordion>
                        </Tab>

                    </Tabs>
                </div>



            </>
        );
    }
}

export default CoursesSectionDetail;
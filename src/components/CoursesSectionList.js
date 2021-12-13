import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import CourseApi from '../api/Courses';
import CoursesSections from "../components/CoursesSections";
import { Card, Accordion, Tab, Tabs, Dropdown, Modal } from "react-bootstrap";
import CourseLactures from "../components/CourseLactures_edite";
import SweetAlert from 'react-bootstrap-sweetalert'
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
let validationSchemaSections = Yup.object({
    section_title: Yup.string().required("Tile is Required."),
    section_description: Yup.string().required("Description is Required."),
});

class CoursesSectionList extends Component {
    constructor() {
        super();
        this.state = {
            sections: [],
            addSection: false,
            tabs: 1,
            section_title: "",
            section_description: "",
            sectoinApiloader: false,
            edite_section: "",
            edite_section_title: "",
            edite_section_description: "",
            updated_section: false,
            delete_confirm: false,
            removing_secitons: false,
            removing_section_id: '',
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



    updateTabe = (value) => {
        if (value.activeTab == this.state.activeTab) {
            this.setState({ activeTab: null });
        } else {
            this.setState({ activeTab: value.activeTab });
        }
    };
    updateLactures = (data) => {
        console.log(data);
    };

    removing_secitons = () => {
        this.setState({
            removing_secitons: true
        })
        let data = {
            section_id: this.state.removing_section_id
        }
        CourseApi.deleteCourseSection(data).then(res => {
            if (res.data.Error == false) {
                let all_secitons = this.state.sections;
                let update_index = all_secitons.findIndex(data => data._id == this.state.removing_section_id)
                delete all_secitons[update_index]
                let new_data = all_secitons.filter(data => data)
                this.setState({
                    sections: new_data,
                    updated_section: true,
                    removing_section_id: ""
                })
                this.setState({
                    // sections: res.data.data,
                    delete_confirm: false,
                    removing_secitons: false,
                })
            }
        })
    }



    render() {
        let { activeTab } = this.state;
        return (
            <  >
                {this.state.updated_section && (
                    <SweetAlert success title="Good job!"
                        customButtons={
                            <React.Fragment>
                                <button className='px-2 btn btn-primary bgthwh ms-2 btn-sm' onClick={() => this.setState({ updated_section: false })}>Okay</button>
                            </React.Fragment>
                        }    >
                        Updated successfully
                    </SweetAlert>
                )}
                {this.state.delete_confirm && (
                    <SweetAlert SweetAlert
                        warning
                        showCancel
                        confirmBtnText="Yes, delete it!"
                        confirmBtnBsStyle="danger"
                        title="Are you sure?"
                        onConfirm={this.deleteFile}
                        onCancel={() => {
                            this.setState({
                                delete_confirm: false
                            })
                        }}
                        focusCancelBtn
                        customButtons={
                            <div>
                                {this.state.removing_secitons && (
                                    <button className='px-2 btn btn-primary bgthwh ms-2 btn-sm bgthwh'>Loading....</button>
                                )}
                                {!this.state.removing_secitons && (
                                    <>
                                        <button className='px-2 btn btn-primary bgthwh ms-2 btn-sm' onClick={() => this.setState({ delete_confirm: false })}>Cancel</button>
                                        <button className='px-2 text-white btn btn-danger ms-2 btn-sm' onClick={() => this.removing_secitons()}>Yes, delete it!</button>

                                    </>
                                )}
                            </div>
                        }
                    >
                        You will not be able to recover section and section lectures also!
                    </SweetAlert>
                )}

                <div className='mt-3 row'>
                    <div className='col-12 border-bottom'>
                        <label htmlFor="" className='mt-3 mb-0 course-title-font'><i class="fal fa-book"></i> Course Content</label>

                    </div>
                </div>
                {/* {this.state.sections.map((data, index) => <CoursesSections key={index} course_id={this.props.course_id} data={data}/>)} */}
                {/* /************************************** */}
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
                                            className="custom_head_collapse lectures-dropdown-arrow bor-0"

                                        >
                                            <label htmlFor="" className='mb-0 course-title-font'>1: Introduction</label>
                                            {/* <b>1: Introduction</b> */}
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
                                                                        1. {this.props.course_title}
                                                                    </span>
                                                                </div>
                                                                <div>

                                                                </div>
                                                            </div>
                                                            <p className="pb-0 mb-0">
                                                                {this.props.course_des && this.props.course_des.substring(0, 100)}
                                                                {this.props.course_des && this.props.course_des && this.props.course_des.length > 100 && "..."}
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
                                                    <label className='course-title-font'>{index + 2}: {data.section_title}</label>
                                                    <i class="fas fa-chevron-down"></i>
                                                </div>
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey={`${index}`}>
                                                <>
                                                    <div className="px-2 d-flex justify-content-between border-bottom-dotted">
                                                        <div>
                                                            <p>{data.section_description}</p>
                                                        </div>
                                                        <div>
                                                            <div className="lectures_edite_delete">
                                                                <div><button className='btn '
                                                                    onClick={() => {
                                                                        this.setState({
                                                                            edit_section: true,
                                                                            edite_section: data._id,
                                                                            edite_section_title: data.section_title,
                                                                            edite_section_description: data.section_description,
                                                                        })
                                                                    }}
                                                                ><i class="fas fa-money-check-edit"></i></button></div>
                                                                <div><button
                                                                    onClick={() => {
                                                                        this.setState({
                                                                            removing_section_id: data._id,
                                                                            delete_confirm: true,
                                                                        })
                                                                    }}
                                                                    className='btn '><i class="far fa-trash"></i></button></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {this.state.activeTab == (index) && (
                                                        <CourseLactures
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
                        {/* <Tab eventKey="Package & Offers" title="Package & Offers" className="add_border">
                                        
                                    </Tab>
                                    <Tab eventKey="Price Table" title="Price Table">
                                        
                                    </Tab> */}
                    </Tabs>
                </div>
                {/* /************************************** */}


                <div className='py-2 mt-3 row'>
                    {/* adding section */}
                    {this.state.addSection && (
                        <Formik
                            initialValues={{
                                section_title: "",
                                section_description: "",
                            }}
                            validationSchema={validationSchemaSections}
                            onSubmit={async (values) => {
                                this.setState({
                                    sectoinApiloader: true,
                                    ApiError: "",
                                });
                                let data = {
                                    course_id: this.props.course_id,
                                    section_title: values.section_title,
                                    section_description: values.section_description

                                }
                                CourseApi.addCourseSection(data).then(res => {
                                    if (res.data.Error == false) {
                                        this.setState({
                                            sections: [...this.state.sections, res.data.data],
                                            // addSection: false,
                                        })
                                    }
                                    this.setState({
                                        addSection: false,
                                        sectoinApiloader: false,
                                        ApiError: res.data.msg,
                                    })
                                    setTimeout(() => {
                                        this.setState({
                                            ApiError: ""
                                        })
                                    }, 2000);
                                }).catch(error => {
                                    this.setState({
                                        addSection: false,
                                        sectoinApiloader: false,

                                    })
                                })
                            }}
                        >
                            <Form>
                                <div className="mb-0 form-group icon-input rounded-circle">
                                    {/* <i className="font-sm ti-email text-grey-500 pe-0"></i> */}
                                    <label htmlFor="" className="course-title-font">Section Title</label>
                                    <Field
                                        name="section_title"
                                        className="mb-0 form-control text-grey-900 font-xsss fw-600course-input course-input"
                                        placeholder="Section Title"
                                    />
                                </div>
                                <small className="text-danger">
                                    <b>
                                        <ErrorMessage name="section_title" />
                                    </b>
                                </small>
                                <div className="mt-3 mb-0 form-group icon-input">
                                    <label htmlFor="" className="course-title-font">Section Description</label>
                                    {/* <i className="font-sm ti-lock text-grey-500 pe-0"></i> */}
                                    <Field
                                        type='textarea'
                                        name="section_description"
                                        className="mb-0 form-control text-grey-900 font-xsss fw-600course-input course-input"
                                        placeholder="Section Description"
                                    />


                                </div>
                                <small className="text-danger">
                                    <b>
                                        <ErrorMessage name="section_description" />
                                    </b>
                                </small>

                                <small className="my-3 text-danger ">
                                    <b>{this.state.ApiError}</b>
                                </small>
                                <div className="p-0 mt-2 text-left col-sm-12">
                                    <div className="mb-1 form-group">
                                        {this.state.sectoinApiloader && (
                                            <button
                                                type="button"
                                                className="btn btn-primary float-end "
                                            >
                                                Loading....
                                            </button>
                                        )}
                                        {!this.state.sectoinApiloader && (
                                            <button
                                                type="submit"
                                                className="btn btn-primary float-end my-2 bgthwh"
                                            >
                                                Save
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </Form>
                        </Formik>
                        //   {/* ************************************* */}
                    )}

                    {this.state.ApiError && (
                        <div className='col-12'>
                            <div className='alert alert-success'>
                                Section added successfully
                            </div>
                        </div>
                    )}


                    {!this.state.addSection && (
                        <div className='cursor-pointer'>
                            <button className='bgthwh px-2 rounded'
                                onClick={() => this.setState({ addSection: true, ApiError: "" })}
                            >
                                Add Section


                                <i class="far fa-plus p-2 cursor-pointer" onClick={() => this.setState({ TitleEdite: true })}></i>

                            </button>
                        </div>
                    )}


                </div>

                {/* updating sections */}

                <Modal
                    show={this.state.edit_section}
                    size='md'
                    onHide={() => this.setState({ edit_section: false })}
                    // dialogClassName="modal-90w"
                    aria-labelledby="example-custom-modal-styling-title"
                >
                    <Modal.Header>
                        <h4 className='mb-0 course-title-font'>Update Section</h4>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.edite_section && (
                            <Formik
                                initialValues={{
                                    section_title: this.state.edite_section_title,
                                    section_description: this.state.edite_section_description,
                                }}
                                validationSchema={validationSchemaSections}
                                onSubmit={async (values) => {
                                    this.setState({
                                        sectoinApiloader: true,
                                        ApiError: "",
                                    });
                                    let data = {
                                        section_id: this.state.edite_section,
                                        section_title: values.section_title,
                                        section_description: values.section_description
                                    }
                                    CourseApi.updateCourseSection(data).then(res => {
                                        if (res.data.Error == false) {
                                            let all_secitons = this.state.sections;
                                            let update_index = all_secitons.findIndex(data => data._id == res.data.data._id)
                                            all_secitons[update_index] = res.data.data
                                            this.setState({
                                                sections: all_secitons,
                                                updated_section: true,
                                            })
                                        }
                                        this.setState({
                                            edit_section: false,
                                            sectoinApiloader: false,
                                        })

                                    }).catch(error => {
                                        this.setState({
                                            edit_section: false,
                                            sectoinApiloader: false,

                                        })
                                    })
                                }}
                            >
                                <Form>
                                    <div className="mb-0 form-group icon-input rounded-circle">
                                        {/* <i className="font-sm ti-email text-grey-500 pe-0"></i> */}
                                        <label htmlFor="" className='course-title-font'>Section Title</label>
                                        <Field
                                            name="section_title"
                                            className="mb-0 form-control text-grey-900 font-xsss fw-600course-input course-input"
                                            placeholder="Section Title"
                                        />
                                    </div>
                                    <small className="text-danger">
                                        <b>
                                            <ErrorMessage name="section_title" />
                                        </b>
                                    </small>
                                    <div className="mt-3 mb-0 form-group icon-input">
                                        <label htmlFor="" className='course-title-font'>Section Description</label>
                                        {/* <i className="font-sm ti-lock text-grey-500 pe-0"></i> */}
                                        <Field
                                            type='textarea'
                                            name="section_description"
                                            className="mb-0 form-control text-grey-900 font-xsss fw-600course-input course-input"
                                            placeholder="Section Description"
                                        />


                                    </div>
                                    <small className="text-danger">
                                        <b>
                                            <ErrorMessage name="section_description" />
                                        </b>
                                    </small>

                                    <small className="my-3 text-danger ">
                                        <b>{this.state.ApiError}</b>
                                    </small>
                                    <div className="p-0 mt-2 text-left col-sm-12">
                                        <div className="mb-1 form-group">
                                            {this.state.sectoinApiloader && (
                                                <button
                                                    type="button"
                                                    className="btn btn-primary float-end bgthwh"
                                                >
                                                    Loading....
                                                </button>
                                            )}
                                            {!this.state.sectoinApiloader && (
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary float-end bgthwh"
                                                >
                                                    Update
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </Form>
                            </Formik>
                        )}

                        {/* ************************************* */}

                    </Modal.Body>
                </Modal>
            </>
        );
    }
}

export default CoursesSectionList;
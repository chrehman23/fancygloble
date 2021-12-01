import React,{Component} from 'react';

class CoursesContent extends Component {
    constructor() {
        super();
        this.state = {
          
            activeTab: 'a',
        };
    }
    render() {
        let { activeTab } = this.state;
        return ( 
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
                                                        this.props.updateLactures()
                                                    }}
                                                >
                                                    <div className="video-length">
                                                        <div className="d-flex justify-content-between"

                                                        >
                                                            <div>
                                                                <i class="far fa-play-circle"></i>
                                                                <span className="ms-2">
                                                                    1. {this.porps.lacture_title}
                                                                </span>
                                                            </div>
                                                            <div>

                                                            </div>
                                                        </div>
                                                        <p className="pb-0 mb-0">
                                                            {this.porps.lacture_des && this.porps.lacture_des.substring(0, 100)}
                                                            {this.porps.lacture_des && this.porps.lacture_des && this.porps.lacture_des.length > 100 && "..."}
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
        );
    }
}

export default CoursesContent;
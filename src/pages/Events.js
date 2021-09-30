import React, { Component, Fragment } from "react";
import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Rightchat from '../components/Rightchat';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';
import { Modal } from 'react-bootstrap'
import { Card } from 'react-bootstrap';
import Load from '../components/Load';

import { withRouter } from "react-router";
import EventApis from '../api/Events'
import moment from 'moment'


import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


import defaultProfilePhoto from '../../public/assets/images/user.png'

import UsersGoingToEvent from '../components/UsersGoingToEvent'

// const eventList = [
//     {
//         imageUrl: 'hotel.png',
//         title: 'Right here Right Now -  Comedy ',
//         location: 'Goa, Mumbai',
//         date: '22',
//         month: 'FEB',
//     },
//     {
//         imageUrl: 'hotel.png',
//         title: 'Open Mic-Stand up Comedy and Poetry',
//         location: 'Goa, Mumbai',
//         date: '22',
//         month: 'FEB',
//     },
//     {
//         imageUrl: 'hotel.png',
//         title: 'Mohd Suhels Guide to the Galaxy',
//         location: 'Goa, Mumbai',
//         date: '22',
//         month: 'FEB',
//     },
//     {
//         imageUrl: 'hotel.png',
//         title: 'Charlotte De Witte India Tour',
//         location: 'Goa, Mumbai',
//         date: '31',
//         month: 'APR',
//     },
//     {
//         imageUrl: 'hotel.png',
//         title: 'A Stand-up Comedy Show by Rahul',
//         location: 'Goa, Mumbai',
//         date: '04',
//         month: 'MAR',
//     },
//     {
//         imageUrl: 'hotel.png',
//         title: 'Sunburn Holi Weekend 2021  ',
//         location: 'Goa, Mumbai',
//         date: '22',
//         month: 'FEB',
//     },
// ]

class Events extends Component {


    constructor(props) {
        super();
        this.state = {
            loader: true,
            events: [],
            inputSearch: "",
            eventsTabs: 1,

            EventViewModal: false,
            eventModalDetails: {},
            goingtoEventLoader: false,
            goingtoEventMsg: '',

            eventsTabsModal:1

        }
    }

    componentDidMount() {

        let token = localStorage.getItem("token")
        if (!token) {
            this.props.history.push("/login")
        } else {
            let data = {
                page: 1
            }
            EventApis.getEvents(data).then(res => {
                console.log(res.data)
                if (res.data.Error == false) {
                    this.setState({ events: res.data.events })
                }
                this.setState({ loader: false })
            }).catch(error => {
                console.log(error)
                this.setState({ loader: false })
            })
        }

    }

    searchEvents = (search) => {
        let data = {
            search: search
        }
        this.setState({ loader: true, eventsTabs: 1 })

        EventApis.searchEvents(data).then(res => {
            if (res.data.Error == false) {
                this.setState({ events: res.data.events })
            }
            this.setState({ loader: false })
        }).catch(error => {
            this.setState({ loader: false })
        })
    }

    changeTabs = (tabId) => {
        if (tabId == this.state.eventsTabs) return
        this.setState({ loader: true, eventsTabs: tabId })
        if (tabId == 1) {
            EventApis.getEvents().then(res => {
                if (res.data.Error == false) {
                    this.setState({ events: res.data.events })
                }
                this.setState({ loader: false })
            }).catch(error => {
                console.log(error)
                this.setState({ loader: false })
            })
        }
        if (tabId == 2) {
            EventApis.getGoingEvents().then(res => {
                if (res.data.Error == false) {
                    let goingEvents = res.data.going_Events.map(data => data.event_id)
                    this.setState({ events: goingEvents })
                }
                this.setState({ loader: false })
            }).catch(error => {
                this.setState({ loader: false })
            })
        }
        if (tabId == 3) {
            EventApis.ownEvents().then(res => {
                if (res.data.Error == false) {
                    this.setState({ events: res.data.events })
                }
                this.setState({ loader: false })
            }).catch(error => {
                console.log(error)
                this.setState({ loader: false })
            })
        }
    }

    goingtoEvent = (eventId) => {
        this.setState({ goingtoEventLoader: true })
        let data = {
            event_id: eventId
        }
        EventApis.goingtoEvent(data).then(res => {
            if (res.data.Error == false) {
                this.setState({ goingtoEventMsg: res.data.msg })
            } else {
                this.setState({ goingtoEventMsg: res.data.msg })
            }
            this.setState({ goingtoEventLoader: false })
        }).catch(error => {
            // console.log(error)
            // if (error.response.data.Error)
            this.setState({ goingtoEventLoader: false })
        })
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
                                <div className="col-xl-12">

                                    <div className="card shadow-xss w-100 d-block d-flex border-0 p-4 mb-3">
                                        <h2 className="fw-700 mb-0  mt-0 font-md text-grey-900 d-flex justify-content-between align-items-center">
                                            <div className='d-none d-md-block'>Events</div>
                                            <div className='d-flex align-items-center justify-content-end w-100 '>
                                                <div>
                                                    <button className='btn btn-primary'
                                                        onClick={() => {
                                                            this.props.history.push('/add-event')
                                                        }}
                                                    >Add Event</button>
                                                </div>
                                                <div>
                                                    <form action="#" className="pt-0 pb-0 ms-auto">

                                                        <div className="search-form-2 ms-2">
                                                            <i className="ti-search font-xss"></i>
                                                            <input
                                                                onChange={(e) => {
                                                                    this.setState({ inputSearch: e.target.value })
                                                                    this.searchEvents(e.target.value)
                                                                }}
                                                                type="text" className="form-control text-grey-500 mb-0 bg-greylight theme-dark-bg border-0" placeholder="Search here." />
                                                        </div>
                                                    </form>

                                                </div>
                                            </div>


                                        </h2>
                                    </div>

                                    <div className="card w-100   shadow-xss rounded-xxl border-0 px-4 mb-3 mt-3">
                                        <div className='eventsTabs'>
                                            <div className={this.state.eventsTabs == 1 ? "active" : ""} onClick={() => this.changeTabs(1)} >Events</div>
                                            <div className={this.state.eventsTabs == 3 ? "active" : ""} onClick={() => this.changeTabs(3)}>Own Evnts</div>
                                            <div className={this.state.eventsTabs == 2 ? "active" : ""} onClick={() => this.changeTabs(2)}>Going</div>
                                        </div>
                                    </div>

                                    {this.state.inputSearch.length > 0 && (

                                        <p className='mb-0'><b>Searching by {this.state.inputSearch}</b></p>

                                    )}
                                    {this.state.loader && <Load />}
                                    {!this.state.loader && this.state.events.length == 0 && (
                                        <div className="card w-100 text-center shadow-xss rounded-xxl border-0 p-4 mb-3 mt-3">
                                            <div className="snippet mt-2 ms-auto me-auto" data-title=".dot-typing">
                                                <div className="stage">
                                                    <p className='mb-0'><b>No Event found.</b></p>
                                                </div>
                                            </div>
                                        </div>
                                    )}


                                    <div className="row ps-2 pe-1">
                                        {!this.state.loader && this.state.events.map((value, index) => (
                                            <>
                                                <div key={index} className="col-lg-4 col-md-6 pe-2 ps-2">
                                                    <div className="card p-3 bg-white w-100 hover-card border-0 shadow-xss rounded-xxl border-0 mb-3 overflow-hidden ">
                                                        <div className="card-image w-100" style={{ height: "200px" }}>
                                                            <img src={value.thumbnail && `${process.env.REACT_APP_BASE_URL}/${value.thumbnail[0] && value.thumbnail[0].picture}`} alt="event" className="w-100 rounded-3" />
                                                        </div>
                                                        <div className="card-body d-flex ps-0 pe-0 pb-0">
                                                            <div className="bg-greylight me-3 p-3 border-light-md rounded-xxl theme-dark-bg"><h4 className="fw-700 font-lg ls-3 text-grey-900 mb-0">
                                                                <span className="ls-3 d-block font-xsss text-grey-500 fw-500">{moment(value.start_date).format("MMM")}</span>{moment(value.end_date).format("D")}</h4></div>
                                                            <h2 className="fw-700 lh-3 font-xss">{value.title}
                                                                <span className="d-flex font-xssss fw-500 mt-2 lh-3 text-grey-500"> <i className="ti-location-pin me-1"></i>
                                                                    {value.location !== "" ? value.location : "Stream"}
                                                                </span>
                                                            </h2>
                                                        </div>
                                                        <div className="card-body mt-4 p-0 d-flex justify-content-between align-items-center mb-2">
                                                            <ul className="memberlist   ms-0 d-inline-block d-none">
                                                                <li ><a href="/defaultevent"><img src="assets/images/user.png" alt="user" className="w30 d-inline-block" /></a></li>
                                                                <li><a href="/defaultevent"><img src="assets/images/user.png" alt="user" className="w30 d-inline-block" /></a></li>
                                                                <li><a href="/defaultevent"><img src="assets/images/user.png" alt="user" className="w30 d-inline-block" /></a></li>
                                                                <li><a href="/defaultevent"><img src="assets/images/user.png" alt="user" className="w30 d-inline-block" /></a></li>
                                                                <li className="last-member"><a href="/defaultevent" className="bg-greylight fw-600 text-grey-500 font-xssss ls-3 text-center">+2</a></li>
                                                            </ul>
                                                            <div></div>
                                                            <div
                                                                onClick={() => {
                                                                    this.setState({
                                                                        eventModalDetails: value,
                                                                        EventViewModal: true,
                                                                        goingtoEventMsg: "",
                                                                        eventsTabsModal:1
                                                                    })
                                                                }}>
                                                                <button className='btn btn-primary'>View</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </>

                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>



                {/* post View Modal  */}
                <Modal
                    show={this.state.EventViewModal}
                    size='xl'
                    onHide={() => this.setState({ EventViewModal: false })}
                    dialogClassName="modal-90w"
                    aria-labelledby="example-custom-modal-styling-title"
                >
                    <Modal.Header>
                        <div className='postModalHeader'>
                            <div>
                                <div><img src={this.state.eventModalDetails && this.state.eventModalDetails.posted_by && this.state.eventModalDetails.posted_by.profile_photo !== "" ? `${process.env.REACT_APP_BASE_URL}/${this.state.eventModalDetails.posted_by.profile_photo}` : defaultProfilePhoto} alt='Image' /></div>
                                <div>
                                    <h4>{this.state.eventModalDetails.posted_by && this.state.eventModalDetails.posted_by.name}</h4>
                                    <small>{this.state.eventModalDetails.posted_by && this.state.eventModalDetails.posted_by.user_name}</small>
                                </div>
                            </div>
                            <div>
                                <p className='text-grey-500'>{moment(this.state.eventModalDetails && this.state.eventModalDetails.created_at).fromNow(true)} ago</p>
                            </div>
                        </div>

                    </Modal.Header>
                    <Modal.Body>
                        {this.state.EventViewModal && (
                            <div className='postmodalContainer'>
                                {/* {JSON.stringify(this.state.eventModalDetails)} */}
                                <div className='row'>
                                    <div className='col-md-8'>
                                        {this.state.eventModalDetails && this.state.eventModalDetails.image_status && (
                                            <div className='postModalSlider'>
                                                <Carousel
                                                    autoPlay={false}
                                                >
                                                    {this.state.eventModalDetails.thumbnail.map((data, index) => {
                                                        return (
                                                            <div>
                                                                {/* <img src={defaultProfilePhoto} /> */}
                                                                <img src={`${process.env.REACT_APP_BASE_URL}/${data.picture}`} />
                                                            </div>
                                                        )
                                                    })}

                                                </Carousel>
                                            </div>

                                        )}
                                    </div>
                                    <div className='col-md-4'>
                                        <div className='eventsTabs smtabs mb-3'>
                                            <div className={this.state.eventsTabsModal == 1 ? "active" : ""} onClick={() => this.setState({ eventsTabsModal: 1 })} >Events Details</div>
                                            <div className={this.state.eventsTabsModal == 2 ? "active" : ""} onClick={() => this.setState({ eventsTabsModal: 2 })}>Going Members</div>
                                        </div>
                                        {this.state.eventsTabsModal == 1  && (
                                            <>
                                                <table className='table '>
                                                    {this.state.eventModalDetails.event_type == "Physical" && (
                                                        <tr>
                                                            <td><i className="ti-location-pin text-grey-400"></i>location</td>
                                                            <td>{this.state.eventModalDetails.location}</td>
                                                        </tr>
                                                    )}
                                                    {this.state.eventModalDetails.paid_amount > 0 && (
                                                        <tr>
                                                            <td><i className="ti-credit-card text-grey-400"></i> Payment</td>
                                                            <td>{this.state.eventModalDetails.paid_amount}</td>
                                                        </tr>
                                                    )}

                                                    {this.state.eventModalDetails.seats_status == "Limited" && (
                                                        <>
                                                            <tr>
                                                                <td> <i className="ti-user text-grey-400"></i>Total Seats</td>
                                                                <td>{this.state.eventModalDetails.event_seats}</td>
                                                            </tr>
                                                            <tr>
                                                                <td> <i className="ti-user text-grey-400"></i>Remaining seats</td>
                                                                <td>{this.state.eventModalDetails.event_seats - this.state.eventModalDetails.booked_seats}</td>
                                                            </tr>
                                                        </>
                                                    )}



                                                    <tr>
                                                        <td><i className="ti-timer text-grey-400"></i>Start time</td>
                                                        <td>{moment(this.state.eventModalDetails.start_date).format("DD/MMM/YYY hh:mm a")}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><i className="ti-timer text-grey-400"></i> End time</td>
                                                        <td>{moment(this.state.eventModalDetails.end_date).format('DD/MMM/YYY hh:mm a')}</td>
                                                    </tr>
                                                </table>

                                                <p><b>{this.state.goingtoEventMsg}</b></p>
                                                {this.state.eventModalDetails.paid_amount > 0 && (
                                                    <>
                                                        <small className='font-weight-bold'>This is paid event you have to pay amount €{this.state.eventModalDetails.paid_amount} to get ticket number.</small>
                                                        <div className='d-flex justify-content-end'>


                                                            {this.state.goingtoEventLoader && (
                                                                <button className='btn btn-primary'>Loading...</button>
                                                            )}
                                                            {!this.state.goingtoEventLoader && (
                                                                <button
                                                                    onClick={() => {
                                                                        this.goingtoEvent(this.state.eventModalDetails._id)
                                                                    }}
                                                                    className='btn btn-primary'>Pay €{this.state.eventModalDetails.paid_amount} Now(get ticket)</button>
                                                            )}
                                                            {/* <button className='btn btn-primary'>Pay €{this.state.eventModalDetails.paid_amount} Now</button> */}
                                                            {/* <button className='btn btn-primary'>Pay €{this.state.eventModalDetails.paid_amount} Now</button> */}
                                                        </div>
                                                    </>
                                                )}
                                                {this.state.eventModalDetails.paid_amount == null && (
                                                    <div className='d-flex justify-content-end'>
                                                        {this.state.goingtoEventLoader && (
                                                            <button className='btn btn-primary'>Loading...</button>
                                                        )}
                                                        {!this.state.goingtoEventLoader && (
                                                            <button
                                                                onClick={() => {
                                                                    this.goingtoEvent(this.state.eventModalDetails._id)
                                                                }}
                                                                className='btn btn-primary'>get ticket</button>
                                                        )}
                                                    </div>
                                                )}
                                            </>
                                        )}

                                        {this.state.eventsTabsModal == 2 && (
                                            <>
                                            {/* comments onmodal */}
                                                <UsersGoingToEvent _id={this.state.eventModalDetails._id}/>
                                            </>
                                        )}


                                     





                                    </div>
                                </div>
                            </div>

                        )}
                    </Modal.Body>
                </Modal>
                {/* ******************************************* */}

                <Popupchat />
                <Appfooter />
            </Fragment>
        );
    }
}

export default withRouter(Events);
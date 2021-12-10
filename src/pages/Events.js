import React, { Component, Fragment } from "react";
import Header from "../components/Header";
import Leftnav from "../components/Leftnav";
import Rightchat from "../components/Rightchat";
import Appfooter from "../components/Appfooter";
import Popupchat from "../components/Popupchat";
import { Modal } from "react-bootstrap";
import { Card } from "react-bootstrap";
import Load from "../components/Load";

import { withRouter } from "react-router";
import EventApis from "../api/Events";
import moment from "moment";

import StripeCheckout from "react-stripe-checkout";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import defaultProfilePhoto from "../../public/assets/images/user.png";

import UsersGoingToEvent from "../components/UsersGoingToEvent";

import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

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
      goingtoEventMsg: "",

      eventsTabsModal: 1,
      eventsTabsModalTabs: 1,

      eventStatusLoader: false,
      eventStatus: false,

      payment_status: false,
      my_event: false,
    };
  }

  componentDidMount() {
    let token = localStorage.getItem("token");
    if (!token) {
      this.props.history.push("/login");
    } else {
      let data = {
        page: 1,
      };
      EventApis.getEvents(data)
        .then((res) => {
          console.log(res.data);
          if (res.data.Error == false) {
            this.setState({ events: res.data.events });
          }
          this.setState({ loader: false });
        })
        .catch((error) => {
          console.log(error);
          this.setState({ loader: false });
        });
    }
  }

  searchEvents = (search) => {
    let data = {
      search: search,
    };
    this.setState({ loader: true, eventsTabs: 1 });

    EventApis.searchEvents(data)
      .then((res) => {
        if (res.data.Error == false) {
          this.setState({ events: res.data.events });
        }
        this.setState({ loader: false });
      })
      .catch((error) => {
        this.setState({ loader: false });
      });
  };

  changeTabs = (tabId) => {
    if (tabId == this.state.eventsTabs) return;
    this.setState({ loader: true, eventsTabs: tabId });
    if (tabId == 1) {
      EventApis.getEvents()
        .then((res) => {
          if (res.data.Error == false) {
            this.setState({ events: res.data.events });
          }
          this.setState({ loader: false });
        })
        .catch((error) => {
          console.log(error);
          this.setState({ loader: false });
        });
    }
    if (tabId == 2) {
      EventApis.getGoingEvents()
        .then((res) => {
          if (res.data.Error == false) {
            let goingEvents = res.data.going_Events.map(
              (data) => data.event_id
            );
            this.setState({ events: goingEvents });
          }
          this.setState({ loader: false });
        })
        .catch((error) => {
          this.setState({ loader: false });
        });
    }
    if (tabId == 3) {
      EventApis.ownEvents()
        .then((res) => {
          if (res.data.Error == false) {
            this.setState({ events: res.data.events });
          }
          this.setState({ loader: false });
        })
        .catch((error) => {
          console.log(error);
          this.setState({ loader: false });
        });
    }
  };

  goingtoEvent = (eventId, payment_token) => {
    this.setState({ goingtoEventLoader: true });
    let data = {
      payment_token: payment_token,
      payment_amout: this.state.eventModalDetails.paid_amount,
      event_id: eventId,
    };
    EventApis.goingtoEvent(data)
      .then((res) => {
        if (res.data.Error == false) {
          this.setState({ goingtoEventMsg: res.data.msg });
        } else {
          this.setState({ goingtoEventMsg: res.data.msg });
        }
        this.setState({ goingtoEventLoader: false });
      })
      .catch((error) => {
        // console.log(error)
        // if (error.response.data.Error)
        this.setState({ goingtoEventLoader: false });
      });
  };

  eventStatus = (eventId) => {
    let data = {
      event_id: eventId,
    };
    this.setState({
      eventStatusLoader: true,
      payment_status: false,
    });
    EventApis.eventStatus(data)
      .then((res) => {
        if (res.data.Error == false) {
          this.setState({
            goingtoEventMsg: res.data.msg,
            eventStatusLoader: false,
            payment_status: res.data.payment,
            my_event: res.data.my_event,
          });
        }
        this.setState({ eventStatusLoader: false });
      })
      .catch((error) => {
        // console.log(error)
        // if (error.response.data.Error)
        this.setState({ eventStatusLoader: false });
      });
  };

  onToken = (token) => {
    console.log(token);
    this.goingtoEvent(this.state.eventModalDetails._id, token.id);
    // fetch('/save-stripe-token', {
    //     method: 'POST',
    //     body: JSON.stringify(token),
    // }).then(response => {
    //     response.json().then(data => {
    //         alert(`We are in business, ${data.email}`);
    //     });
    // });
  };

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
                  <div className="p-4 mb-3 border-0 card shadow-xss w-100 d-block d-flex">
                    <h2 className="mt-0 mb-0 fw-700 font-md text-grey-900 d-flex justify-content-between align-items-center">
                      <div className="d-none d-md-block">Upcoming Events </div>
                      <div className="d-flex align-items-center justify-content-end ">
                        <div>
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              this.props.history.push("/add-event");
                            }}
                          >
                            Add Event
                          </button>
                        </div>
                        <div>
                          <form action="#" className="pt-0 pb-0 ms-auto">
                            <div className="search-form-2 ms-2">
                              <i className="ti-search font-xss"></i>
                              <input
                                onChange={(e) => {
                                  this.setState({
                                    inputSearch: e.target.value,
                                  });
                                  this.searchEvents(e.target.value);
                                }}
                                type="text"
                                className="mb-0 border-0 form-control text-grey-500 bg-greylight theme-dark-bg"
                                placeholder="Search here."
                              />
                            </div>
                          </form>
                        </div>
                      </div>
                    </h2>
                  </div>

                  <div className="px-4 mt-3 mb-3 border-0 card w-100 shadow-xss rounded-xxl">
                    <div className="eventsTabs">
                      <div
                        className={this.state.eventsTabs == 1 ? "active" : ""}
                        onClick={() => this.changeTabs(1)}
                      >
                        Events
                      </div>
                      <div
                        className={this.state.eventsTabs == 3 ? "active" : ""}
                        onClick={() => this.changeTabs(3)}
                      >
                        Own Events
                      </div>
                      <div
                        className={this.state.eventsTabs == 2 ? "active" : ""}
                        onClick={() => this.changeTabs(2)}
                      >
                        Going
                      </div>
                    </div>
                  </div>

                  {this.state.inputSearch.length > 0 && (
                    <p className="mb-0">
                      <b>Searching by {this.state.inputSearch}</b>
                    </p>
                  )}
                  {this.state.loader && <Load />}
                  {!this.state.loader && this.state.events.length == 0 && (
                    <div className="p-4 mt-3 mb-3 text-center border-0 card w-100 shadow-xss rounded-xxl">
                      <div
                        className="mt-2 snippet ms-auto me-auto"
                        data-title=".dot-typing"
                      >
                        <div className="stage">
                          <p className="mb-0">
                            <b>No Event Found.</b>
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="row ps-2 pe-1">
                    {!this.state.loader &&
                      this.state.events.map((value, index) => (
                        <>
                          <div
                            className="col-lg-4 col-md-6 pe-2 ps-2 "
                            key={index}
                          >
                            <div className="Events-cards">
                              <div className="event-img">
                                <img
                                  class="img-fluid"
                                  src={
                                    value.thumbnail &&
                                    `${value.thumbnail[0] &&
                                    value.thumbnail[0].picture
                                    }`
                                  }
                                ></img>
                              </div>

                              <div class="card card-margin">
                                <div class="card-body py-2">
                                  <div class="widget-49">
                                    <div class="widget-49-title-wrapper">
                                      <div class="widget-49-date-warning">
                                        <span class="widget-49-date-day">
                                          {moment(value.end_date).format("D")}
                                        </span>
                                        <span class="widget-49-date-month">
                                          {moment(value.start_date).format(
                                            "MMM"
                                          )}
                                        </span>
                                      </div>
                                      <div class="widget-49-meeting-info mt-4">
                                        <span class="widget-49-pro-title">
                                          {value.title}
                                        </span>
                                        <span class="widget-49-meeting-time">
                                          Start:18-05-2021 12:00AM
                                        </span>
                                        <span class="widget-49-meeting-time">
                                          End:18-05-2021 03:00AM
                                        </span>
                                      </div>
                                    </div>
                                    <ol class="widget-49-meeting-points p-0">
                                      <li class="widget-49-meeting-item pb-1">
                                        <span>{value.description}</span>
                                      </li>

                                      {value.location !== "" ? (
                                        ""
                                      ) : (
                                        <>
                                          <li class="widget-49-meeting-item">
                                            <span>
                                              <i className="px-2 fas fa-signal-stream"></i>
                                              {value.location !== ""
                                                ? value.location
                                                : "Stream"}
                                            </span>
                                          </li>
                                        </>
                                      )}

                                      {value.location !== "" ? (
                                        <>
                                          <li class="widget-49-meeting-item ">
                                            <span>
                                              <i className="px-2 fas fa-location-circle"></i>
                                              {value.location}
                                            </span>
                                          </li>
                                        </>
                                      ) : (
                                        ""
                                      )}
                                    </ol>
                                    <div class="widget-49-meeting-action">
                                      <span class="seller-image">
                                        <img
                                          class="img-fluid"
                                          src={value.created_by && value.created_by.profile_photo}
                                          alt=""
                                        />
                                      </span>
                                      <div
                                        onClick={() => {
                                          this.setState(
                                            {
                                              eventModalDetails: value,
                                              EventViewModal: true,
                                              goingtoEventMsg: "",
                                              eventsTabsModal: 1,
                                              eventsTabsModalTabs: 1,
                                              eventStatus: false,
                                              goingtoEventMsg: "",
                                            },
                                            () => {
                                              this.eventStatus(value._id);
                                            }
                                          );
                                        }}
                                      >
                                         <button className="btn btn-sm btn-flash me-1">
                                          Share
                                        </button>
                                        <button className="btn btn-sm btn-flash">
                                          View
                                        </button>
                                       
                                      </div>
                                    </div>
                                  </div>
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
          size="xl"
          scrollable={true}
          onHide={() => this.setState({ EventViewModal: false })}
          dialogClassName="modal-90w"
          className="event_show_modal"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header>
            <div className="postModalHeader">
              <div>
                <div>
                  <img
                    src={
                      this.state.eventModalDetails &&
                        this.state.eventModalDetails.posted_by &&
                        this.state.eventModalDetails.posted_by.profile_photo !==
                        ""
                        ? `${this.state.eventModalDetails.posted_by.profile_photo}`
                        : defaultProfilePhoto
                    }
                    alt="Image"
                  />
                </div>
                <div>
                  <h4>
                    {this.state.eventModalDetails.posted_by &&
                      this.state.eventModalDetails.posted_by.name}
                  </h4>
                  <small>
                    {this.state.eventModalDetails.posted_by &&
                      this.state.eventModalDetails.posted_by.user_name}
                  </small>
                </div>
              </div>
              <div>
                <p className="text-grey-500">
                  {moment(
                    this.state.eventModalDetails &&
                    this.state.eventModalDetails.created_at
                  ).fromNow(true)}{" "}
                  ago
                </p>
              </div>
            </div>
          </Modal.Header>
          <Modal.Body>
            {this.state.EventViewModal && (
              <div className="postmodalContainer">
                {/* {JSON.stringify(this.state.eventModalDetails)} */}
                <div className="row">
                  <div className="col-md-8">
                    {this.state.eventModalDetails &&
                      this.state.eventModalDetails.video_url !== "" && (
                        <div className="eventsTabs smtabs ">
                          <div
                            className={
                              this.state.eventsTabsModalTabs == 2
                                ? "active"
                                : ""
                            }
                            onClick={() =>
                              this.setState({ eventsTabsModalTabs: 2 })
                            }
                          >
                            Video
                          </div>
                          <div
                            className={
                              this.state.eventsTabsModalTabs == 1
                                ? "active"
                                : ""
                            }
                            onClick={() =>
                              this.setState({ eventsTabsModalTabs: 1 })
                            }
                          >
                            Pictures
                          </div>
                        </div>
                      )}
                    {this.state.eventsTabsModalTabs == 2 &&
                      this.state.eventModalDetails &&
                      this.state.eventModalDetails.url_status && (
                        <div className="p-0 mt-3 mb-3 card-body d-block">
                          <div className="row">
                            <div className="col-12">
                              <video className="vedioPlayer" controls autoplay>
                                <source
                                  src={
                                    this.state.eventModalDetails &&
                                    this.state.eventModalDetails.video_url
                                  }
                                  type="video/mp4"
                                />
                                Your browser does not support HTML5 video.
                              </video>
                            </div>
                          </div>
                        </div>
                      )}

                    {this.state.eventsTabsModalTabs == 1 &&
                      this.state.eventModalDetails &&
                      this.state.eventModalDetails.image_status && (
                        <div className="postModalSlider">
                          <Carousel autoPlay={false}>
                            {this.state.eventModalDetails.thumbnail.map(
                              (data, index) => {
                                return (
                                  <div>
                                    {/* <img src={defaultProfilePhoto} /> */}
                                    <img src={`${data.picture}`} />
                                  </div>
                                );
                              }
                            )}
                          </Carousel>
                        </div>
                      )}
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3 eventsTabs smtabs">
                      <div
                        className={
                          this.state.eventsTabsModal == 1 ? "active" : ""
                        }
                        onClick={() => this.setState({ eventsTabsModal: 1 })}
                      >
                        Events Details
                      </div>
                      <div
                        className={
                          this.state.eventsTabsModal == 2 ? "active" : ""
                        }
                        onClick={() => this.setState({ eventsTabsModal: 2 })}
                      >
                        Going Members
                      </div>
                    </div>
                    {this.state.eventsTabsModal == 1 && (
                      <>
                        <table className="table ">
                          {this.state.eventModalDetails.event_type ==
                            "Physical" && (
                              <div className="pb-2">
                                <div className="weight-bold">
                                  <i className="p-0 fas fa-map-marker-smile icons-color-tble pe-2"></i>
                                  location
                                </div>
                                <div>{this.state.eventModalDetails.location}</div>
                              </div>
                            )}
                          {this.state.eventModalDetails.paid_amount > 0 && (
                            <div className="pb-2 event-font">
                              <div className="weight-bold">
                                <i className="p-0 fad fa-credit-card-front icons-color-tble pe-2"></i>{" "}
                                Payment
                              </div>
                              <div>
                                {this.state.eventModalDetails.paid_amount}
                              </div>
                            </div>
                          )}

                          {this.state.eventModalDetails.seats_status ==
                            "Limited" && (
                              <>
                                <div className="pb-2">
                                  <div className="weight-bold">
                                    {" "}
                                    <i className="p-0 fad fa-users icons-color-tble pe-2"></i>
                                    Total Seats
                                  </div>
                                  <div>
                                    {this.state.eventModalDetails.event_seats}
                                  </div>
                                </div>
                                <div className="pb-2">
                                  <div className="weight-bold">
                                    {" "}
                                    <i className="p-0 fad fa-users-crown icons-color-tble pe-2"></i>
                                    Remaining seats
                                  </div>
                                  <div>
                                    {this.state.eventModalDetails.event_seats -
                                      this.state.eventModalDetails.booked_seats}
                                  </div>
                                </div>
                              </>
                            )}

                          <div className="pb-2 event-font">
                            <div className="weight-bold">
                              <i className="p-0 fad fa-clock icons-color-tble pe-2 "></i>
                              Start time
                            </div>
                            <div>
                              {moment(
                                this.state.eventModalDetails.start_date
                              ).format("DD/MMM/YY hh:mm a")}
                            </div>
                          </div>
                          <div>
                            <div className="event-font weight-bold">
                              <i className="p-0 far fa-clock icons-color-tble pe-2"></i>{" "}
                              End time
                            </div>
                            <div className="event-font">
                              {moment(
                                this.state.eventModalDetails.end_date
                              ).format("DD/MMM/YY hh:mm a")}
                            </div>
                          </div>
                        </table>

                        <p>
                          <b>
                            {this.state.goingtoEventMsg !== "No record found."
                              ? this.state.goingtoEventMsg
                              : ""}
                          </b>
                        </p>
                        {this.state.eventModalDetails &&
                          this.state.eventModalDetails.event_type == "Stream" &&
                          this.state.payment_status && (
                            <>
                              {this.state.my_event && (
                                <button
                                  className="btn go-live-btn w-25"
                                  onClick={() =>
                                    this.props.history.push(
                                      `live-event/${this.state.eventModalDetails &&
                                      this.state.eventModalDetails._id
                                      }`
                                    )
                                  }
                                >
                                  Go live
                                </button>
                              )}
                              {!this.state.my_event && (
                                <button
                                  onClick={() =>
                                    this.props.history.push(
                                      `live-event-view/${this.state.eventModalDetails &&
                                      this.state.eventModalDetails._id
                                      }`
                                    )
                                  }
                                  className="btn btn-primary"
                                >
                                  See event
                                </button>
                              )}
                            </>
                          )}
                        {(this.state.goingtoEventMsg == "No record found." ||
                          this.state.goingtoEventMsg == "Payment error") &&
                          this.state.eventModalDetails.paid_amount > 0 && (
                            <>
                              <small>
                                This is paid event you have to pay amount $
                                {this.state.eventModalDetails.paid_amount} to
                                get ticket number.
                              </small>
                              <div className="d-flex justify-content-end">
                                {this.state.goingtoEventLoader && (
                                  <button className="btn btn-primary">
                                    Loading...
                                  </button>
                                )}
                                {!this.state.goingtoEventLoader && (
                                  <StripeCheckout
                                    token={this.onToken}
                                    stripeKey={process.env.REACT_APP_STRIP_KEY}
                                    image={this.state.eventModalDetails &&
                                      this.state.eventModalDetails.posted_by &&
                                      this.state.eventModalDetails.posted_by.profile_photo !==
                                      ""
                                      ? `${this.state.eventModalDetails.posted_by.profile_photo}`
                                      : defaultProfilePhoto
                                    }
                                    // panelLabel="Give Money" // prepended to the amount in the bottom pay button
                                    amount={
                                      this.state.eventModalDetails.paid_amount *
                                      100
                                    } // cents
                                    ComponentClass="div"
                                    currency="EUR"
                                    name={this.state.eventModalDetails.posted_by &&
                                      this.state.eventModalDetails.posted_by.name} // the pop-in header title
                                  description={`You are paying €${this.state.eventModalDetails.paid_amount} for event`} // the pop-in header subtitle
                                  >
                                    <button className="btn btn-primary">
                                      Pay €
                                      {this.state.eventModalDetails.paid_amount}{" "}
                                      Now(get ticket)
                                    </button>
                                  </StripeCheckout>
                                )}
                                {/* <button className='btn btn-primary'>Pay €{this.state.eventModalDetails.paid_amount} Now</button> */}
                                {/* <button className='btn btn-primary'>Pay €{this.state.eventModalDetails.paid_amount} Now</button> */}
                              </div>
                            </>
                          )}
                        {this.state.goingtoEventMsg == "No record found." &&
                          (this.state.eventModalDetails.paid_amount == null ||
                            this.state.eventModalDetails.paid_amount == 0) && (
                            <div className="d-flex justify-content-end">
                              {this.state.goingtoEventLoader && (
                                <button className="btn btn-primary">
                                  Loading...
                                </button>
                              )}
                              {!this.state.goingtoEventLoader && (
                                <button
                                  onClick={() => {
                                    this.goingtoEvent(
                                      this.state.eventModalDetails._id
                                    );
                                  }}
                                  className="btn btn-primary"
                                >
                                  get ticket
                                </button>
                              )}
                            </div>
                          )}
                      </>
                    )}

                    {this.state.eventsTabsModal == 2 && (
                      <>
                        {/* comments onmodal */}
                        <UsersGoingToEvent
                          _id={this.state.eventModalDetails._id}
                        />
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

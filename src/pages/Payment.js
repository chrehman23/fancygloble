import React, { Component, Fragment } from "react";

import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Rightchat from '../components/Rightchat';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom'

import AuthApi from "../api/Auth";
import PaymentsApi from "../api/Payments";
import moment from "moment";
import { Pagination } from 'react-bootstrap'

class Payment extends Component {
    constructor() {
        super();
        this.state = {
            apiLoader: false,
            account_blacnce: 0,
            Tabs: 1,
            allPayments: [],
            page: 1
        }
    }
    componentDidMount() {
        this.accountDetails()
    }

    accountDetails = () => {
        this.setState({
            apiLoader: true
        })
        AuthApi.getUserProfileByToken().then(res => {
            this.setState({
                account_blacnce: res.data.profile.account_blance,
                apiLoader: false
            })
        })
    }

    tabChanger = (tab) => {
        if (tab !== this.state.Tabs) {
            this.setState({
                Tabs: tab,
                apiLoader: true,
                page: 1
            })
        } else {
            this.setState({ Tabs: tab, apiLoader: true })
        }

        let data = {
            page: this.state.page,
            // payment_type :"Post"
        }
        if (tab == 3) { data.payment_type = 'Post' }
        if (tab == 4) { data.payment_type = 'Event' }
        if (tab == 5) { data.payment_type = 'Course' }
        if (tab == 6) { data.payment_type = 'Tip' }
        // ******************************************************
        if (tab == 1) {
            this.accountDetails()
            this.setState({ Tabs: tab, })
        }
        if (tab >= 2) {
            PaymentsApi.allPayments(data).then(res => {
                console.log(res)
                if (res.data.Error == false) {
                    this.setState({
                        allPayments: res.data.data
                    })
                }
                this.setState({
                    apiLoader: false
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

                <div className="main-content bg-lightblue theme-dark-bg right-chat-active">

                    <div className="middle-sidebar-bottom">
                        <div className="middle-sidebar-left">
                            <div className="middle-wrap">

                                <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                                    <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-3">
                                        <Link to="/defaultsettings" className="d-inline-block mt-2"><i className="ti-arrow-left font-sm text-white"></i></Link>
                                        <h4 className="font-xs text-white fw-600 ms-4 mb-0 mt-2">Account Balance</h4>
                                    </div>
                                    <div className="card-body   p-1 px-3  w-100 border-0" style={{ minHeight: '500px' }}>
                                        <div className='eventsTabs smtabs sm mb-3'>
                                            <div className={this.state.Tabs == 1 ? "active" : ""} onClick={() => this.tabChanger(1)} >Account</div>
                                            <div className={this.state.Tabs == 2 ? "active" : ""} onClick={() => this.tabChanger(2)}>All Earning</div>
                                            <div className={this.state.Tabs == 3 ? "active" : ""} onClick={() => this.tabChanger(3)}>Posts Earning</div>
                                            <div className={this.state.Tabs == 4 ? "active" : ""} onClick={() => this.tabChanger(4)}>Events Earning </div>
                                            <div className={this.state.Tabs == 5 ? "active" : ""} onClick={() => this.tabChanger(5)}>Courses Earning</div>
                                            <div className={this.state.Tabs == 6 ? "active" : ""} onClick={() => this.tabChanger(6)}>Tips Earning</div>
                                        </div>
                                        {this.state.Tabs >= 2 && (
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <table className='table text-center mt-3'>
                                                        <thead >
                                                            <tr>
                                                                <th>#</th>
                                                                <th>Sent by</th>
                                                                <th>Description</th>
                                                                <th>Amount</th>
                                                                <th>Payment</th>
                                                                <th>Date</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {!this.state.apiLoader && this.state.allPayments.map((data, index) => {
                                                                return (
                                                                    <tr index={index}>
                                                                        <td>{index + 1 + (this.state.page >= 2 ? (this.state.page - 1) * 10 : 0)}</td>
                                                                        <td>
                                                                            {data.payment_by && (
                                                                                <div className='tableProfile'
                                                                                    onClick={() => {
                                                                                        this.props.history.push(`/user/${data.payment_by && data.payment_by.user_name}`)
                                                                                    }}
                                                                                >
                                                                                    <div>
                                                                                        <img src={data.payment_by && data.payment_by.profile_photo} alt="" />
                                                                                    </div>
                                                                                    <div>
                                                                                        <h5>{data.payment_by && data.payment_by.name}</h5>
                                                                                        <small>{data.payment_by && data.payment_by.user_name}</small>
                                                                                    </div>
                                                                                </div>
                                                                            )}
                                                                        </td>
                                                                        <td>
                                                                            {data.payment_for == "Post" && "Payment on post"}
                                                                            {data.payment_for == "Event" && "Payment on event"}
                                                                            {data.payment_for == "Course" && "Payment on course"}
                                                                            {data.payment_for == "Tip" && "Payment on tip"}
                                                                            {/* {(!data.payment_for && !data.event_id && !data.post_id) && "payment on tip"} */}
                                                                        </td>
                                                                        <td>${data.amount}</td>
                                                                        <td>
                                                                            {data.payment_for == "Post" && (<span class="badge badge-primary">Post</span>)}
                                                                            {data.payment_for == "Event" && (<span class="badge badge-secondary">Event</span>)}
                                                                            {data.payment_for == "Course" && (<span class="badge badge-dark">Course</span>)}
                                                                            {data.payment_for == "Tip" && (<span class="badge badge-success">Tip</span>)}

                                                                        </td>
                                                                        <td>{moment(data.created_at).format("dd/mm/yy hh:mm a")}</td>
                                                                    </tr>
                                                                )
                                                            })}
                                                        </tbody>
                                                    </table>
                                                    {this.state.apiLoader && (
                                                        <div className="card w-100 text-center   rounded-xxl border-0 p-4 mb-3 mt-3">
                                                            <div className="snippet mt-2 ms-auto me-auto" data-title=".dot-typing">
                                                                <div className="stage">
                                                                    <div className="dot-typing"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {!this.state.apiLoader && this.state.allPayments.length == 0 && (
                                                        <div className="text-center">
                                                            <small className='text-grey-700'>No record found.</small>
                                                        </div>
                                                    )}
                                                    {!this.state.apiLoader && this.state.allPayments.length > 0 && (
                                                        <div className='d-flex justify-content-end'>
                                                            <div>
                                                                <ul className="pagination pagination-sm">
                                                                    {this.state.page > 1 && (
                                                                        <li className="page-item"
                                                                            onClick={() => {
                                                                                this.setState({
                                                                                    page: this.state.page - 1
                                                                                }, () => {
                                                                                    this.tabChanger(2)
                                                                                })

                                                                            }}
                                                                        ><a className="page-link" href="#"><i class="far fa-chevron-left"></i></a></li>
                                                                    )}

                                                                    <li className="page-item"><a className="page-link" href="#">{this.state.page}</a></li>
                                                                    {this.state.allPayments && this.state.allPayments.length > 9 && (
                                                                        <li className="page-item"
                                                                            onClick={() => {
                                                                                this.setState({
                                                                                    page: this.state.page + 1
                                                                                }, () => {
                                                                                    this.tabChanger(2)
                                                                                })

                                                                            }}
                                                                        ><a className="page-link" href="#"><i class="far fa-chevron-right"></i></a></li>
                                                                    )}

                                                                </ul>
                                                            </div>
                                                        </div>
                                                    )}

                                                </div>

                                            </div>
                                        )}
                                        {this.state.Tabs == 1 && (
                                            <div className="row">
                                                <div className="col-5">
                                                    {!this.state.apiLoader && (
                                                        <div className="card border-0 mb-4 shadow-none mt-3">
                                                            <div className="card-body d-block text-left p-0">
                                                                <div className="item w-100 h150 bg-primary rounded-xxl text-left shadow-md ps-3 pt-2 align-items-end flex-column d-flex">
                                                                    <div className="card bg-transparent border-0 bg-transparent-card shadow-none p-0 text-left w-100">
                                                                        <div className="row">
                                                                            <div className="col-6">

                                                                                <img src="assets/images/b-10.png" alt="icon" className="w40 float-left d-inline-block" />
                                                                            </div>
                                                                            <div className="col-6 text-right pe-4">
                                                                                <img src="assets/images/chip.png" alt="icon" className="w30 float-right d-inline-block mt-2 me-2 rounded-3" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="card bg-transparent border-0 bg-transparent-card shadow-none p-0 text-left w-100 mt-auto">
                                                                        <h4 className="text-white mb-3 font-sm fw-700 mont-font">$ {this.state.account_blacnce}.00<span className="d-block fw-500 text-grey-300 font-xssss mt-1">Account Balance</span></h4>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {this.state.apiLoader && (
                                                        <div className="card w-100 text-center   rounded-xxl border-0 p-4 mb-3 mt-3">
                                                            <div className="snippet mt-2 ms-auto me-auto" data-title=".dot-typing">
                                                                <div className="stage">
                                                                    <div className="dot-typing"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    <p>After every month Global fansy will transfer all the payments to your stripe account.</p>
                                                </div>
                                            </div>
                                        )}



                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>


                <Popupchat />
                <Appfooter />



            </Fragment>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        account_blacnce: state.UserProfile.profile.account_blance
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        //   adProfile: (data) => {
        //         dispatch(ACTIONS.loadProfile(data))
        //     },

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Payment))
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
import StripeApi from '../api/Stripe'
class Payment extends Component {
    constructor() {
        super();
        this.state = {
            apiLoader: false,
            loading: false,
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

    globalfansy_cat = (value) => {
        if (value > 0) {
            let fansy_cost = (value * 20) / 100
            let vat_cost = (fansy_cost * 24) / 100;
            let total_cost = value - fansy_cost - vat_cost
            return total_cost.toFixed(3)
        } else {
            return 0
        }

    }
    makeAccount = () => {
        this.setState({
            loading: true
        })
        StripeApi.getStripeAccountInfo().then(res => {
            if (res.data.Error == false) {
                window.location.href = res.data.url;
            }
        })
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


                                <div className="p-0 mb-4 bg-white border-0 shadow-xs card w-100">
                                    <div className="p-4 bg-current border-0 card-body w-100 d-flex rounded-3">
                                        <Link to="/defaultsettings" className="mt-2 d-inline-block"><i className="text-white ti-arrow-left font-sm"></i></Link>
                                        <h4 className="mt-2 mb-0 text-white font-xs fw-600 ms-4">Account</h4>
                                    </div>
                                    <div className="accounts_container">
                                        {/* **************stripe acccount connection starts ************************************/} 
                                        {this.props.stripe_account && this.props.stripe_account.details_submitted && this.props.stripe_account.details_submitted==true  ?  (
                                            <div className="">
                                                 
                                            </div>
                                        ): (
                                                <div className="connect_account_container">
                                                    <div className="">
                                                        {this.state.loading && (<button className="btn btn-primary">Loading...</button>)}
                                                        {!this.state.loading && (<button className="btn btn-primary" onClick={() => this.makeAccount()}>Connect your stripe account</button>)}
                                                    </div>
                                                </div>
                                        )}
                                       
                                        {/* **************stripe acccount connection ends************************** */}
                                        {/* ************** ********************************************** */}
                                        <div className={this.props.stripe_account && this.props.stripe_account.details_submitted && this.props.stripe_account.details_submitted == true ?  "p-1 px-3 border-0 card-body w-100":"p-1 px-3 border-0 card-body w-100 bg-blure-overly"} style={{ minHeight: '500px' }}>
                                            <div className='mb-3 eventsTabs smtabs sm'>
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
                                                                                {data.payment_for == "Post" && `Payment on post including €${data.amount - this.globalfansy_cat(data.amount)} VAT.`}
                                                                                {data.payment_for == "Event" && "Payment on event"}
                                                                                {data.payment_for == "Course" && "Payment on course"}
                                                                                {data.payment_for == "Tip" && "Payment on tip"}
                                                                                {/* {(!data.payment_for && !data.event_id && !data.post_id) && "payment on tip"} */}
                                                                            </td>
                                                                            <td>€{data.amount} ({this.globalfansy_cat(data.amount)})</td>
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
                                                            <div className="p-4 mt-3 mb-3 text-center border-0 card w-100 rounded-xxl">
                                                                <div className="mt-2 snippet ms-auto me-auto" data-title=".dot-typing">
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
                                                    <div className="col-12 col-md-5">
                                                        {!this.state.apiLoader && (
                                                            <div className="mb-4 border-0 shadow-none card">
                                                                <div className="p-0 text-left card-body d-block">
                                                                    <div className="pt-2 text-left shadow-md item w-100 h150 bg-primary rounded-xxl ps-3 align-items-end flex-column d-flex">
                                                                        <div className="p-0 text-left bg-transparent border-0 shadow-none card bg-transparent-card w-100">
                                                                            <div className="row">
                                                                                <div className="col-6">

                                                                                    <img src="assets/images/b-10.png" alt="icon" className="float-left w40 d-inline-block" />
                                                                                </div>
                                                                                <div className="text-right col-6 pe-4">
                                                                                    <img src="assets/images/chip.png" alt="icon" className="float-right mt-2 w30 d-inline-block me-2 rounded-3" />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="p-0 mt-auto text-left bg-transparent border-0 shadow-none card bg-transparent-card w-100">
                                                                            <h4 className="mb-3 text-white font-sm fw-700 mont-font">€ {this.globalfansy_cat(this.state.account_blacnce)}<span className="mt-1 d-block fw-500 text-grey-300 font-xssss">Account Balance</span></h4>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}

                                                        {this.state.apiLoader && (
                                                            <div className="p-4 mt-3 mb-3 text-center border-0 card w-100 rounded-xxl">
                                                                <div className="mt-2 snippet ms-auto me-auto" data-title=".dot-typing">
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
                                        {/* **************stripe acccount account details ends************************** */}
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
        account_blacnce: state.UserProfile.profile.account_blance,
        stripe_account: state.UserProfile.profile.stripe_account
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
import React, { Component, Fragment } from "react";
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Rightchat from '../components/Rightchat';


import StripeCheckout from 'react-stripe-checkout';

class Password extends Component {

    onToken=(token)=>{
        console.log(token)
    }
 

    render() {
        return (
            <Fragment>

                <div className="main-wrapper">

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
                                            <h4 className="font-xs text-white fw-600 ms-4 mb-0 mt-2 ">Change Password</h4>
                                        </div>

                                        {/* <StripeCheckout
                                            token={this.onToken}
                                            stripeKey="pk_test_51JojOKANqHno2iJnUhvHytI2SsokdRaEZLKmG6ZzZrdcTaOp5PUCQv5d4YNacbvaZTN7Qcdk4psAglMyxdM6xMrw00TcV1mIOI"
                                            image="https://node.globalfansy.com/assets/user.png"
                                            panelLabel="Give Money" // prepended to the amount in the bottom pay button
                                            amount={100} // cents
                                            ComponentClass="div"
                                            currency="USD"
                                            name="Three Comma Co." // the pop-in header title
                                            description="Big Data Stuff" // the pop-in header subtitle
                                        >PAY
                                        </StripeCheckout> */}
                                        <div className="card-body p-lg-5 p-4 w-100 border-0">
                                            <form action="#">
                                                <div className="row">
                                                    <div className="col-lg-12 mb-3">
                                                        <div className="form-gorup">
                                                            <label className="mont-font fw-600 font-xssss course-title-font">Current Password</label>
                                                            <input type="password" name="comment-name" className="form-control course-input" />
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-12 mb-3">
                                                        <div className="form-gorup">
                                                            <label className="mont-font fw-600 font-xssss course-title-font">Change Password</label>
                                                            <input type="password" name="comment-name" className="form-control course-input" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-lg-12 mb-3">
                                                        <div className="form-gorup">
                                                            <label className="mont-font fw-600 font-xssss course-title-font">Confirm Change Password</label>
                                                            <input type="password" name="comment-name" className="form-control course-input" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-12 mb-0">
                                                        <a href="/password" className="btn btn btn-primary">Save</a>
                                                    </div>
                                                </div>


                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </Fragment>
        );
    }
}

export default Password;
import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';

import UsersApi from '../api/Users';

import { Modal } from 'react-bootstrap'
class Profiledetail extends Component {
    constructor() {
        super();
        this.state = {
            tipModal: false,
            tip_amount: 0,
            tipError: "",
            apiLoader: false,
        }
    }
    onToken = (token) => {
        let data = {
            paid_amount: this.state.tip_amount,
            payment_token: token.id,
            user_id: this.props.profile_id
        }
        this.setState({
            apiLoader: true
        })
        UsersApi.tipsToUser(data).then(res => {
            console.log(res)
            this.setState({
                tipError: res.data.msg,
                apiLoader: false,
            })
        }).catch(error => {
            console.log(error)
        })
    }
    render() {
        return (
            <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
                <div className="card-body d-block p-4">
                    <h4 className="fw-700 mb-3 font-xsss text-grey-900">About</h4>
                    <p className="fw-500 text-grey-500 lh-24 font-xssss mb-0">
                        {this.props.about ? this.props.about : "No about found."}
                    </p>
                </div>
                <div className="card-body border-top-xs d-flex">
                    <i className="feather-lock text-grey-500 me-3 font-lg"></i>
                    <h4 className="fw-700 text-grey-900 font-xssss mt-0">Private
                        <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                            Not private profile
                        </span></h4>
                </div>
                <div className="card-body d-flex pt-0 cursor-pointer "
                    onClick={() => {
                        this.setState({
                            tipModal: true,
                            tipError: "",
                            tip_amount: 0
                        })
                    }}
                >
                    <i className="feather-credit-card text-grey-500 me-3 font-lg"></i>
                    <h4 className="fw-700 text-grey-900 font-xssss mt-0">Send Tip <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">You can also send him tip</span></h4>
                </div>
                {/* 
                <div className="card-body d-flex pt-0">
                    <i className="feather-eye text-grey-500 me-3 font-lg"></i>
                    <h4 className="fw-700 text-grey-900 font-xssss mt-0">Visble <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">Anyone can find you</span></h4>
                </div>
                <div className="card-body d-flex pt-0">
                    <i className="feather-map-pin text-grey-500 me-3 font-lg"></i>
                    <h4 className="fw-700 text-grey-900 font-xssss mt-1">Flodia, Austia </h4>
                </div>
                <div className="card-body d-flex pt-0">
                    <i className="feather-users text-grey-500 me-3 font-lg"></i>
                    <h4 className="fw-700 text-grey-900 font-xssss mt-1">Genarel Group</h4>
                </div> */}

                {/* post View Modal  */}
                <Modal
                    show={this.state.tipModal}
                    size="ms"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    onHide={() => this.setState({ tipModal: false })}
                >

                    <Modal.Body>
                        {this.state.tipError && (
                            <p>{this.state.tipError}</p>
                        )}
                        {this.state.apiLoader && (
                            <p>Loading....</p>
                        )}

                        {!this.state.apiLoader && !this.state.tipError && (
                            <div className="form-control py-3">
                                <label htmlFor="">Enter tip amount</label>
                                <input type="number"
                                    onChange={(e) => {
                                        this.setState({
                                            tip_amount: e.target.value
                                        })
                                    }}
                                    className='form-control' placeholder='Enter tip amount' />
                                {this.state.tip_amount > 0 && (
                                    <StripeCheckout
                                        token={this.onToken}
                                        stripeKey="pk_test_51JojOKANqHno2iJnUhvHytI2SsokdRaEZLKmG6ZzZrdcTaOp5PUCQv5d4YNacbvaZTN7Qcdk4psAglMyxdM6xMrw00TcV1mIOI"
                                        // image="https://node.globalfansy.com/assets/user.png"
                                        panelLabel="Pay tip" // prepended to the amount in the bottom pay button
                                        amount={this.state.tip_amount * 100} // cents
                                        ComponentClass="div"
                                        currency="USD"
                                    // name="Three Comma Co." // the pop-in header title
                                    // description="Big Data Stuff" // the pop-in header subtitle
                                    >
                                        <button className='float-end btn btn-sm btn-primary my-2'>Send ${this.state.tip_amount} tip</button>
                                    </StripeCheckout>

                                )}
                            </div>
                        )}


                    </Modal.Body>
                </Modal>
                {/* ******************************************* */}
            </div>
        );
    }
}

export default Profiledetail;
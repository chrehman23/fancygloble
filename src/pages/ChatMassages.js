import React, { Component, Fragment } from "react";
import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Rightchat from '../components/Rightchat';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';
import chatApi from '../api/chat'

import ScrollToBottom from 'react-scroll-to-bottom';
import socketConnection from '../socketConnection'
import { Modal } from 'react-bootstrap'
import ChatList from '../components/chatList'
import StripeCheckout from 'react-stripe-checkout';
class Chat extends Component {
    state = {
        massages: [],
        smsInput: "",
        loadSocket: false,
        apiLoader: true,

        tipModal: false,
        tip_amount: 0,
        tipError: "",
        apiLoaders: false,
    };

    componentDidMount() {
        let { id } = this.props.match.params
        let data = {
            room_id: id,
            page: 1,

        }

        chatApi.getSms(data).then(res => {
            if (res.data.Error == false) {
                this.setState({
                    massages: res.data.data,
                    apiLoader: false
                })

            }
        })

        if (this.state.loadSocket == false) {

            socketConnection.on('room_sms', data => {
                let { id } = this.props.match.params
                if (data.room == id) {
                    this.setState({
                        massages: [...this.state.massages, data],

                    })
                }

            })
        }


    }

    componentDidUpdate(prevProps, prevState,) {
        let { id } = this.props.match.params
        if (prevProps.match.params.id !== id) {
            this.setState({
                massages: [],
                apiLoader: true
            })
            let data = {
                room_id: id,
                page: 1
            }
            chatApi.getSms(data).then(res => {
                if (res.data.Error == false) {
                    this.setState({
                        massages: res.data.data,
                        smsInput: "",
                        apiLoader: false
                    })

                }
            })

        }


    }

    sendSms = (token) => {
        // window.scrollTo(0, 0)
        if (this.state.smsInput || token.id) {
            let { id } = this.props.match.params
            let data = {
                content: this.state.smsInput,
                type: "text",
                room: id,
                created_at: new Date()
            }
            if (token.id) {
                data.payment_token = token.id
                data.amount = this.state.tip_amount
                data.content = ""
            }
            this.setState({
                smsInput: "",
                apiLoaders: true
            })

            chatApi.sendSms(data).then(res => {
                if (res.data.Error == false) {
                    this.setState({
                        massages: [...this.state.massages, res.data.data],
                        tipError: res.data.msg,
                        apiLoaders: false,
                        tip_amount: 0,
                        tipModal: false,
                        tipError: ""
                    })
                }
            })
        }

    }




    render() {

        return (
            <Fragment>
                <Header showChat={true} />
                <Leftnav />
                <Rightchat />

                <div className="main-content right-chat-active" style={{ height: "100vh !important" }}>
                    <div className="middle-sidebar-bottom" style={{ padding: "130px 15px 0px" }}>
                        <div className="middle-sidebar-left pe-0" style={{ maxWidth: "100%" }}>
                            <div className="row">
                                <div className="col-lg-12 position-relative">
                                    <div className="chat-wrapper pt-0 w-100 position-relative scroll-bar bg-white theme-dark-bg">
                                        <div className={`chat-body p-3 overflow-hidden ${this.state.timerLoader ? "d-none" : " "}`}>

                                            {!this.state.apiLoader && (
                                                <ScrollToBottom
                                                    animating={false}
                                                    initialScrollBehavior="auto"
                                                    className='messages-contents' mode="bottom" >
                                                    <ChatList massages={this.state.massages} />
                                                </ScrollToBottom>
                                            )}



                                            <div className="clearfix"></div>

                                        </div>
                                    </div>
                                    <div className="chat-bottom dark-bg p-3 shadow-none theme-dark-bg" style={{ width: "98%" }}>
                                        <div className="d-flex align-content-center w-100">

                                            <div className='flex-grow-1'>
                                                <input type="text"
                                                    onChange={(e) => {
                                                        this.setState({
                                                            smsInput: e.target.value
                                                        })
                                                    }}
                                                    value={this.state.smsInput}
                                                    placeholder="Start typing.." className='form-control  py-0' />
                                            </div>
                                            <div className='mx-2'>
                                                <button
                                                    onClick={() => {
                                                        this.setState({
                                                            tipModal: true,
                                                            tipError: ""
                                                        })
                                                    }}
                                                    type='button' className="  px-2 btn h-100 btn-round-sm bgthwh "><i className="feather-credit-card text-white"></i></button>
                                            </div>
                                            <div className='mx-2'>
                                                <button
                                                    onClick={this.sendSms}
                                                    type='button' className="  px-2 btn h-100 btn-round-sm bgthwh "><i className="ti-arrow-right text-white"></i></button>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <Popupchat />
                <Appfooter /> */}
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
                        {this.state.apiLoaders && (
                            <p>Loading....</p>
                        )}

                        {!this.state.apiLoaders && !this.state.tipError && (
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
                                        token={this.sendSms}
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

            </Fragment>
        );
    }
}

export default Chat;
import React, { Component, Fragment } from "react";
import { withRouter } from 'react-router';
import ACTIONS from '../store/actions/index.js';
import { connect } from 'react-redux'
import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Rightchat from '../components/Rightchat';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';
import chatApi from '../api/chat'
import ContentLoader from 'react-content-loader'
import ScrollToBottom from 'react-scroll-to-bottom';
import socketConnection from '../socketConnection'
import { Modal } from 'react-bootstrap'
import ChatList from '../components/chatList'
import StripeCheckout from 'react-stripe-checkout';
class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            room_id: "",
            user_info: {},
            massages: [],
            smsInput: "",
            loadSocket: false,
            apiLoader: true,

            tipModal: false,
            tip_amount: 0,
            tipError: "",
            apiLoaders: false,
        };
    }


    componentDidMount() {

        let { id } = this.props.match.params

        let data = {
            room_id: id,
            page: 1,

        }
        setTimeout(() => {
            let room_ifo = this.props.room_data.filter(data => data.room_id == id)

            this.setState({
                room_id: id,
                user_info: room_ifo[0].user,
            })
        }, 2000);

        chatApi.getSms(data).then(res => {
            if (res.data.Error == false) {
                this.setState({
                    massages: res.data.data,
                    apiLoader: false
                })
                // this.props.showRoom(id)
            }
        })

        // if (this.state.loadSocket == false) {

        socketConnection.on('room_sms', data => {
            let { id } = this.props.match.params
            if (data.room == id) {
                this.setState({
                    massages: [...this.state.massages, data],
                })
            }

        })
        // }
        let react_this = this
        var wage = document.getElementById("massage_input");
        wage.addEventListener("keydown", function (e) {
            if (e.code === "Enter" || e.code === "NumpadEnter") {  //checks whether the pressed key is "Enter"
                react_this.sendSms({});
            }
        });

    }

    componentDidUpdate(prevProps, prevState,) {
        let { id } = this.props.match.params
        if (prevProps.match.params.id !== id) {
            let room_ifo = this.props.room_data.filter(data => data.room_id == id)

            this.setState({
                room_id: id,
                user_info: room_ifo[0].user,
            })
            this.setState({
                massages: [],
                apiLoader: true,
                room_id: id
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
                    // this.props.showRoom(id)
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

                <div className="main-content right-chat-active mobile-responsive-for-blackcolor" style={{ height: "100vh !important" }}>
                    <div className="middle-sidebar-bottom d-flex flex-column" style={{ padding: "100px 15px 0px" }}>
                        <div class="card bg-transparent-card w-100 align-items-center d-flex flex-row border-0 w-100 border-bottom px-3 bg-white shadow">
                            <div class="smImageControlerRs">
                                <img src={this.state.user_info && this.state.user_info.profile_photo} alt="user" class="" />
                            </div>
                            <div class="flex-grow-1 pt-1">
                                <h5 class="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">{this.state.user_info && this.state.user_info.name}
                                </h5>
                                <h6 class="text-grey-500 fw-500 font-xssss lh-4">{this.state.user_info && this.state.user_info.user_name}</h6>
                            </div>
                        </div>

                        <div className="middle-sidebar-left pe-0 " style={{ maxWidth: "100%" }}>
                            <div className="row">
                                <div className="col-lg-12 position-relative">
                                    <div className="pt-0 bg-white border chat-wrapper w-100 position-relative scroll-bar theme-dark-bg chat_massage_container">
                                        <div className={`chat-body p-3 py-0 overflow-hidden  ${this.state.timerLoader ? "d-none" : " "}`}>
                                            {!this.state.apiLoader && (
                                                <ScrollToBottom
                                                    animating={false}
                                                    initialScrollBehavior="auto"
                                                    className='messages-contents' mode="bottom" >
                                                    <ChatList massages={this.state.massages} />
                                                </ScrollToBottom>
                                            )}
                                            {this.state.apiLoader && (
                                                <ScrollToBottom
                                                    animating={false}
                                                    initialScrollBehavior="auto"
                                                    className='messages-contents' mode="bottom" >
                                                    <div className='d-flex '>
                                                        <ContentLoader
                                                            speed={2}
                                                            // width={'100%'}
                                                            height={45}
                                                            // viewBox="0 0 400 160"
                                                            backgroundColor="#f3f3f3"
                                                            foregroundColor="#ecebeb"
                                                        >
                                                            <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
                                                            <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
                                                            <circle cx="20" cy="20" r="20" />
                                                        </ContentLoader>
                                                    </div>
                                                    <div className='d-flex justify-content-end'>
                                                        <ContentLoader
                                                            speed={2}
                                                            // width={'100%'}
                                                            height={45}
                                                            // viewBox="0 0 400 160"
                                                            backgroundColor="#f3f3f3"
                                                            foregroundColor="#ecebeb"
                                                        >
                                                            <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
                                                            <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
                                                            <circle cx="20" cy="20" r="20" />
                                                        </ContentLoader>
                                                    </div>
                                                    <div className='d-flex '>
                                                        <ContentLoader
                                                            speed={2}
                                                            // width={'100%'}
                                                            height={45}
                                                            // viewBox="0 0 400 160"
                                                            backgroundColor="#f3f3f3"
                                                            foregroundColor="#ecebeb"
                                                        >
                                                            <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
                                                            <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
                                                            <circle cx="20" cy="20" r="20" />
                                                        </ContentLoader>
                                                    </div>
                                                    <div className='d-flex justify-content-end'>
                                                        <ContentLoader
                                                            speed={2}
                                                            // width={'100%'}
                                                            height={45}
                                                            // viewBox="0 0 400 160"
                                                            backgroundColor="#f3f3f3"
                                                            foregroundColor="#ecebeb"
                                                        >
                                                            <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
                                                            <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
                                                            <circle cx="20" cy="20" r="20" />
                                                        </ContentLoader>
                                                    </div>
                                                    <div className='d-flex '>
                                                        <ContentLoader
                                                            speed={2}
                                                            // width={'100%'}
                                                            height={45}
                                                            // viewBox="0 0 400 160"
                                                            backgroundColor="#f3f3f3"
                                                            foregroundColor="#ecebeb"
                                                        >
                                                            <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
                                                            <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
                                                            <circle cx="20" cy="20" r="20" />
                                                        </ContentLoader>
                                                    </div>
                                                    <div className='d-flex justify-content-end'>
                                                        <ContentLoader
                                                            speed={2}
                                                            // width={'100%'}
                                                            height={45}
                                                            // viewBox="0 0 400 160"
                                                            backgroundColor="#f3f3f3"
                                                            foregroundColor="#ecebeb"
                                                        >
                                                            <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
                                                            <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
                                                            <circle cx="20" cy="20" r="20" />
                                                        </ContentLoader>
                                                    </div>

                                                </ScrollToBottom>
                                            )}



                                        </div>
                                    </div>
                                    <div className="p-3 border shadow-none chat-bottom dark-bg theme-dark-bg" style={{ width: "98%" }}>
                                        <div className="d-flex align-content-center w-100">

                                            <div className='flex-grow-1'>
                                                <input type="text"
                                                    id="massage_input"
                                                    onChange={(e) => {
                                                        this.setState({
                                                            smsInput: e.target.value
                                                        })
                                                    }}
                                                    value={this.state.smsInput}
                                                    placeholder="Start typing.." className='py-0 form-control' />
                                            </div>
                                            <div className='mx-2'>
                                                <button
                                                    onClick={() => {
                                                        this.setState({
                                                            tipModal: true,
                                                            tipError: ""
                                                        })
                                                    }}
                                                    type='button' className="px-2 btn h-100 btn-round-sm bgthwh"><i className="text-white feather-credit-card"></i></button>
                                            </div>
                                            <div className='mx-2'>
                                                <button
                                                    onClick={this.sendSms}
                                                    type='button' className="px-2 btn h-100 btn-round-sm bgthwh"><i className="text-white ti-arrow-right"></i></button>
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



                        <div className="py-3">

                            <div className="mt-2 mb-0 overflow-hidden border-0 cursor-pointer card d-block rounded-3"
                            // onClick={() => {
                            //     this.props.history.push(`/user/${data.user_id && data.user_id.user_name}`) 
                            // }}
                            >
                                <div className="position-relative h100 bg-image-cover bg-image-center" style={{ backgroundImage: `url("${this.state.user_info && this.state.user_info.profile_cover}")` }}></div>
                                <div className="pt-0 text-left d-block w-100 position-relative">
                                    <div className='d-flex w-100'>
                                        <figure className="avatar imageControlermd " style={{ marginTop: `-40px`,marginLeft:"20px" }}>
                                            <img src={this.state.user_info && this.state.user_info.profile_photo} alt="avater" className="float-right p-1 bg-white rounded-circle w-100 " />
                                        </figure>
                                        <div className='ml-5'>
                                            <h4 className="mt-3 mb-1 fw-700 font-xsss">{this.state.user_info && this.state.user_info.name}</h4>
                                            <p className="mt-0 mb-3 fw-500 font-xsssss text-grey-500 lh-3">{this.state.user_info && this.state.user_info.name}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {this.state.apiLoaders && (
                                <p>Loading....</p>
                            )}
                            {!this.state.apiLoaders && !this.state.tipError && (
                                <>

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
                                            <button className='my-2 float-end btn btn-sm btn-primary'>Send ${this.state.tip_amount} tip</button>
                                        </StripeCheckout>

                                    )}
                                </>
                            )}
                        </div>



                    </Modal.Body>
                </Modal>

            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        room_data: state.Rooms
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        showRoom: (data) => {
            dispatch(ACTIONS.showRoom(data))
        },
        updateRoom: (data) => {
            dispatch(ACTIONS.updateRoom(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Chat))
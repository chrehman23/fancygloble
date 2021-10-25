import React, { Component, Fragment } from "react";
import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Rightchat from '../components/Rightchat';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';
import chatApi from '../api/chat'

import ScrollToBottom from 'react-scroll-to-bottom';
import socketConnection from '../socketConnection'
import moment from 'moment'
import { css } from '@emotion/css';

const ROOT_CSS = css({
    height: 600,
    width: 400
});

class Chat extends Component {
    state = {
        massages: [],
        smsInput: "",
        loadSocket: false,
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
                })
            }
        })

        if (this.state.loadSocket == false) {
            this.setState({
                loadSocket: true
            })
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
                massages: []
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
                    })
                }
            })

        }


    }

    sendSms = () => {
        window.scrollTo(0, 0)
        if (this.state.smsInput) {
            let { id } = this.props.match.params
            let data = {
                content: this.state.smsInput,
                type: "text",
                room: id,
                created_at: new Date()
            }
            this.setState({
                smsInput: ""
            })
            chatApi.sendSms(data).then(res => {
                if (res.data.Error == false) {
                    this.setState({
                        massages: [...this.state.massages, res.data.data],
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

                <div className="main-content right-chat-active">
                    <div className="middle-sidebar-bottom">
                        <div className="middle-sidebar-left pe-0" style={{ maxWidth: "100%" }}>
                            <div className="row">
                                <div className="col-lg-12 position-relative">
                                    <div className="chat-wrapper pt-0 w-100 position-relative scroll-bar bg-white theme-dark-bg">
                                        <div className="chat-body p-3 overflow-hidden">

                                            <ScrollToBottom
                                                initialScrollBehavior={"auto"}
                                                className={ROOT_CSS} className='messages-contents   ' mode="bottom" >

                                                {this.state.massages.map((data, index) => {
                                                    return (
                                                        <div className={`message-items ${data.send_by == "me" ? "" : "out-messages"}`}>
                                                            <div className="message-users">
                                                                <div className="avatar-img">
                                                                    <img src={data.user && data.user.profile_photo} alt="avater" />
                                                                </div>
                                                                <div>
                                                                    <h5>{data.user && data.user.name}</h5>
                                                                    <div className="time">
                                                                        {moment(data.created_at).fromNow(true)} ago
                                                                        {/* <i className="ti-double-check text-info"></i> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='px-2'>
                                                                <div className="message-wraps py-0  d-inline  ">
                                                                    <div className='bgthwh p-3 py-2 rounded'>{data.content}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}

                                            </ScrollToBottom>

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

                <Popupchat />
                <Appfooter />

            </Fragment>
        );
    }
}

export default Chat;
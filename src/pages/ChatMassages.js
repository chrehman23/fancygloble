import React, { Component, Fragment } from "react";
import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Rightchat from '../components/Rightchat';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';
import chatApi from '../api/chat'

import ScrollToBottom from 'react-scroll-to-bottom';
import socketConnection from '../socketConnection' 

import ChatList from '../components/chatList'

class Chat extends Component {
    state = {
        massages: [],
        smsInput: "",
        loadSocket: false, 
        apiLoader:true,
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
                    apiLoader:false
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
                apiLoader:true
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

                <div className="main-content right-chat-active" style={{height:"100vh"}}>
                    <div className="middle-sidebar-bottom" style={{ padding:"130px 15px 0"}}>
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

            </Fragment>
        );
    }
}

export default Chat;
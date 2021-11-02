import React, { Component, Fragment } from "react";

import socketConnection from '../socketConnection'
import { connect } from 'react-redux';
import StreamApi from '../api/Streams'

  

class LiveChat extends Component {
    constructor(props) {
        super(props); 
        this.state = {
           
            massages: [],

            stream_chat_input: ""
        };
    }
    componentDidMount() {

        socketConnection.on('stream_massage', data => {
            if (data.stream_id == this.props.stream_id) {
                if (data.user._id == this.props.user_id) {
                    data.send_by = 'me'
                }
                this.setState({
                    massages: [...this.state.massages, data],

                })
            }

        })

    }


 

    streamChat = () => {
        let data = {
            stream_id: this.props.stream_id,
            massage: this.state.stream_chat_input,
        }
        StreamApi.streamChat(data).then(res => {
            if (res.data.Error == false) {
                let data = res.data.data
                if (res.data.data.user._id == this.props.user_id) {
                    data.send_by = 'me'
                }
                this.setState({
                    // massages: [...this.state.massages, data],
                    stream_chat_input: ""
                })
            }
        })
    }

    render() {
        let { data } = this.state
        return (
            <div className="card w-100 d-block chat-body p-0 border-0 shadow-xss rounded-3 mb-3 position-relative">
                <div className="messages-content chat-wrapper scroll-bar p-3">
                    {this.state.massages.map(data => {
                        return (
                            <div className={`message-item ${data.send_by == "me" ? "outgoing-message" : ""}`}>
                                <div className="message-user">
                                    <figure className="avatar">
                                        <img src="../assets/images/user.png" alt="avater" />
                                    </figure>
                                    <div>
                                        <h5 className="font-xssss mt-2">{data.user && data.user.name}</h5>
                                        {/* <div className="time">01:35 PM</div> */}
                                    </div>
                                </div>
                                <div className="message-wrap shadow-none">{data.massage}</div>
                            </div>

                        )
                    })}


                    <div className="message-item d-none outgoing-message">
                        <div className="message-user">
                            <figure className="avatar">
                                <img src="assets/images/user.png" alt="avater" />
                            </figure>
                            <div>
                                <h5>You</h5>
                                <div className="time">01:35 PM<i className="ti-double-check text-info"></i></div>
                            </div>
                        </div>
                        <div className="message-wrap">Hey mate! How are things going ?</div>
                    </div>



                </div>
                <div className="position-absolute bottom-0 w-100 left-0 bg-white z-index-1 p-3 shadow-xs theme-dark-bg ">
                    {/* <button className="bg-grey float-left"><i className="ti-microphone text-white"></i></button> */}
                    <div className='d-flex'>
                        <div className="  flex-grow-1"><input
                            value={this.state.stream_chat_input}
                            onChange={(e) => {
                                this.setState({
                                    stream_chat_input: e.target.value
                                })
                            }}
                            type="text" className='text-black form-control' placeholder="Start typing.." /></div>
                        <button
                            onClick={() => {
                                this.streamChat()
                            }}
                            className="btn btn-sm btn-round btn-primary"><i className="ti-arrow-right text-white"></i></button>
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        user_id: state.UserProfile.profile._id,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // removePosts: (data) => {
        //     dispatch(ACTIONS.removePosts(data))
        // },
        // loadProfile: (data) => {
        //     dispatch(ACTIONS.loadProfile(data))
        // },

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LiveChat)